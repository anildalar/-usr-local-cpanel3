package Cpanel::Install::EA4;

#                                      Copyright 2024 WebPros International, LLC
#                                                           All rights reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited.

use cPstrict;

use File::Path                       ();
use Cpanel::Install::Utils::Command  ();
use Cpanel::Install::Utils::Logger   ();
use Cpanel::Install::Utils::Packaged ();
use Cpanel::EA4::Constants           ();
use Cpanel::EA4::Util                ();
use Cpanel::FileUtils::Copy          ();
use Cpanel::FileUtils::TouchFile     ();
use Cpanel::Mkdir                    ();
use Cpanel::Sysup                    ();
use Cpanel::OS                       ();
use Cpanel::Server::Type             ();

=encoding utf-8

=head1 NAME

Cpanel::Install:EA4 - Install EA4

=head1 SYNOPSIS

    use Cpanel::Install:EA4;

    Cpanel::Install::EA4::install_apache_repo();
    Cpanel::Install::EA4::setup_config_and_fs_for_ea4();
    Cpanel::Install::EA4::install_apache();

=head1 DESCRIPTION

Install EA4 for the first time.

=head2 install_apache_repo()

Install the EA4 yum repo.

=cut

sub install_apache_repo {

    return Cpanel::Sysup::ensure_ea4_repo_is_installed(
        log_info  => \&Cpanel::Install::Utils::Logger::INFO,
        log_error => \&Cpanel::Install::Utils::Logger::ERROR,
        runner    => \&Cpanel::Install::Utils::Command::ssystem_with_retry,
    );
}

sub _custom_profile {

    return Cpanel::EA4::Constants::CUSTOM_PROFILE;
}

sub _default_profile {

    if ( Cpanel::OS::is_cloudlinux() && !Cpanel::Server::Type::is_wp_squared() ) {
        return $Cpanel::EA4::Constants::ea4_dir . '/profiles/vendor/cloudlinux/default.json';
    }

    return Cpanel::EA4::Constants::DEFAULT_PROFILE;

}

=head2 setup_config_and_fs_for_ea4()

Prepare the filesystem and inital configuration for EA4.

=cut

sub setup_config_and_fs_for_ea4 {

    Cpanel::Install::Utils::Logger::INFO("ea4: setting up config data store");

    Cpanel::Mkdir::ensure_directory_existence_and_mode( $Cpanel::EA4::Constants::ea4_dir, $Cpanel::EA4::Constants::ea4_dir_perms );
    require Cpanel::EA4::Conf;
    Cpanel::EA4::Conf->new->save();    # create new one w/ defaults if its not there; preserve theirs if it is there
    return;
}

=head2 install_apache()

Install the EA4 packages.

=cut

sub install_apache {

    # enable fileprotect
    Cpanel::Install::Utils::Command::ssystem(qw{/usr/local/cpanel/scripts/enablefileprotect});

    my @profile_packages = Cpanel::Sysup::get_ea4_tooling_pkgs();

    return 0 if !Cpanel::Install::Utils::Packaged::install_needed_packages(@profile_packages);

    Cpanel::Install::Utils::Logger::INFO("ea4: enabling EasyApache 4 system-wide");
    Cpanel::Mkdir::ensure_directory_existence_and_mode( $Cpanel::EA4::Constants::ea4_dir, $Cpanel::EA4::Constants::ea4_dir_perms );
    Cpanel::FileUtils::TouchFile::touchfile($Cpanel::EA4::Constants::ea4_flag_file);

    Cpanel::Install::Utils::Logger::INFO("ea4: installation");
    my $default_profile    = _default_profile();
    my $ea4_custom_profile = _custom_profile();

    if ( Cpanel::EA4::Util::profile_appears_valid($ea4_custom_profile) ) {
        Cpanel::Install::Utils::Logger::INFO("  - ea4: installing local profile");

        local $@;
        if ( eval { _install_ea4_from_profile($ea4_custom_profile) } ) {
            Cpanel::FileUtils::Copy::safecopy( $ea4_custom_profile, $Cpanel::EA4::Constants::ea4_dir . '/profiles/custom/' );    # has output if there is an issue, creates path if it does not exist yet
            return 1;
        }
        Cpanel::Install::Utils::Logger::WARN($@) if $@;
        Cpanel::Install::Utils::Logger::WARN("  - ea4: local profile failed, falling back to default");
    }
    else {
        Cpanel::Install::Utils::Logger::INFO("  - ea4: $ea4_custom_profile exists but was not a valid profile") if -e $ea4_custom_profile;
    }
    Cpanel::Install::Utils::Logger::INFO("  - ea4: installing default profile");
    local $@;
    if ( eval { _install_ea4_from_profile($default_profile) } ) {
        if ( Cpanel::Server::Type::is_wp_squared() ) {
            Cpanel::Install::Utils::Command::ssystem(qw{/usr/local/cpanel/scripts/set_php_memory_limits --run});
        }
        return 1;
    }
    Cpanel::Install::Utils::Logger::WARN($@) if $@;
    Cpanel::Install::Utils::Logger::ERROR("Could not install default EA4 profile");
    return 0;
}

sub _install_ea4_from_profile {
    my ($profile) = @_;

    Cpanel::Install::Utils::Packaged::install_needed_packages( @{ Cpanel::OS::ea4tooling() } );

    # Work around wonky images (2021’s New OpenStack C8 hits this as well as Old OpenStack C8 and A8)
    # used in "build openstack images" pipelines, that cause
    #   mysql-community-server install to fail w/ low level yum library issue, usually a lock timeout,
    #   presumably because of the extra time ea_install_profile takes over just
    #   installing the profile’s `pkgs` list (it does more diligence so that extra time is expected).
    #   For gruesome details and debuggery see debug comments at ZC-9162.
    # To retest if we think openstack images are fixed: remove this comment and if statement and kick ff a branch build.
    # Note:
    #    - This is temporary until AWE-804 figures out image issue and this can be removed so don’t do this type of OS info based logic at home!
    #        - t/Cpanel-Install-EA4_install_ea4.t will also need the hack-skip removed
    #    - We could limit `almalinux` to old-openstack but there is no good way to tell if we are old or new openstack …
    #    - We could limit to pipeline builds ($ENV{PACKER_BUILD_NAME} eq "cpanel" && $ENV{PACKER_BUILDER_TYPE} eq "openstack") but it happens on manual installs on those images also
    if ( Cpanel::OS::ea4_install_from_profile_enforce_packages() ) {
        require Cpanel::JSON;

        local $@;
        my $data = eval { Cpanel::JSON::LoadFile($profile) };
        warn if $@;

        # If this really is a fresh install this is safe
        # If they already have EA4 installed:
        #   at best: they may be confused why there are more EA4 packages that do not come in w/ the default profile
        #   at worst: it will fail (e.g. changing MPMs, missing pkgs, etc)
        if ( !$@ && $data && Cpanel::Install::Utils::Packaged::install_needed_packages( @{ $data->{pkgs} } ) ) {
            return 1;
        }

        my $distname = Cpanel::OS::pretty_distro();
        die "AWE-804 mode failed ($distname v8)\n";
    }

    my $sys_exit_val = Cpanel::Install::Utils::Command::ssystem_with_retry( "/usr/local/bin/ea_install_profile", "--install", $profile );

    return 1 if $sys_exit_val == 0;
    return;
}

sub _rename {
    my ( $orig, $new ) = @_;
    return rename( $orig, $new );
}

1;

__END__
