package Cpanel::Mysql::Version::Default;

# cpanel - Cpanel/Mysql/Version/Default.pm         Copyright 2024 cPanel, L.L.C.
#                                                           All rights reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited

use cPstrict;

use Cpanel::OS ();
use Cpanel::Config::LoadCpConf;

=encoding utf-8

=head1 NAME

Cpanel::Mysql::Version::Default - Default MySQL Version

=head1 SYNOPSIS

    use Cpanel::Mysql::Version::Default;

    Cpanel::Mysql::Version::Default::get_configured_mysql_version();

=head1 DESCRIPTION

Helper to get the default MySQL version to use.

=head2 get_configured_mysql_version()

Returns the default MySQL version configured.
Either the customer choice from cpanel.config
or when unset the default MySQL version to use
for the distro.

=cut

sub get_configured_mysql_version() {

    my $default_version = Cpanel::OS::mysql_default_version();
    my $cpconf          = Cpanel::Config::LoadCpConf::loadcpconf();

    return $default_version unless ref $cpconf;

    my $cpconf_version = $cpconf->{'mysql-version'};

    return $default_version unless $cpconf_version;

    return $cpconf_version;
}

1;
