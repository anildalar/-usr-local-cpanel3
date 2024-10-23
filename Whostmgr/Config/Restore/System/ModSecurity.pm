package Whostmgr::Config::Restore::System::ModSecurity;

# cpanel - Whostmgr/Config/Restore/System/ModSecurity.pm
#                                      Copyright 2024 WebPros International, LLC
#                                                           All rights reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited.

use cPstrict;

=encoding utf-8

=head1 NAME

Whostmgr::Config::Restore::System::ModSecurity

=head1 DESCRIPTION

This module implements ModSecurity configuration restoration
for the transfer system.

This module subclasses L<Whostmgr::Config::Restore::Base>.

=cut

#----------------------------------------------------------------------

use parent qw( Whostmgr::Config::Restore::Base::JSON );

use Cpanel::CommandQueue ();
use Cpanel::SafeStorable ();

use Whostmgr::ModSecurity             ();
use Whostmgr::ModSecurity::Settings   ();
use Whostmgr::ModSecurity::VendorList ();
use Whostmgr::API::1::Utils::Execute  ();

#----------------------------------------------------------------------

sub _restore ( $self, $parent ) {

    local $self->{'_parent'} = $parent;

    # This die()s on a failure, so there should be no need to inspect
    # the return value. We just collect it to pass it on to the caller.
    my @ret = $self->SUPER::_restore($parent);

    return @ret;
}

sub _restore_from_structure ( $self, $conf ) {

    $self->{'__vendors'} = $conf->{'vendors'};

    # There’s no functional benefit to using C::CQ as this module stands
    # because there’s no rollback implemented. It’ll be useful, though,
    # to have the function divided up this way in the event we do implement
    # rollback, though.
    my $queue = Cpanel::CommandQueue->new();

    _enqueue_settings_changes( $conf, $queue );

    _enqueue_vendor_installs_uninstalls( $conf, $queue );

    $queue->add(
        sub {
            $self->_restore_modsec_files( $self->{'_parent'} );
        }
    );

    _enqueue_disabled_rules( $conf, $queue );

    _enqueue_ensure_configs( $conf, $queue );

    $queue->run();

    return;
}

sub _restore_modsec_files ( $self, $parent ) {

    my $vendors_ar = $self->{'__vendors'} or die 'Need vendors set in object!';

    my $vendor_dir = Whostmgr::ModSecurity::config_prefix() . '/' . Whostmgr::ModSecurity::vendor_configs_dir();

    for my $vendor_hr (@$vendors_ar) {
        my $id = $vendor_hr->{'vendor_id'};

        $parent->{'dirs_to_copy'}{"$vendor_dir/$id"} = { archive_dir => "cpanel/system/modsecurity/vendor_$id" };
    }

    return;
}

sub _enqueue_ensure_configs ( $conf, $queue ) {

    # ZC-11700, error shows in the Transfer Log because it deactivates a config, but it is already deactivated
    # Get a list of the active configs, and use that to limit calls to modsec_make_config_inactive

    require Whostmgr::ModSecurity::ModsecCpanelConf;
    my $modsec         = Whostmgr::ModSecurity::ModsecCpanelConf->new();
    my $active_configs = $modsec->active_configs();

    for my $vendor_hr ( @{ $conf->{'vendors'} } ) {
        for my $config_hr ( @{ $vendor_hr->{'configs'} } ) {
            if ( $config_hr->{'active'} ) {
                next if ( exists $active_configs->{ $config_hr->{config} } );    # It is already active, so skip

                # Rule is active on source server, but inactive on target, activate it.
                $queue->add(
                    sub {
                        _execute_or_die(
                            'modsec_make_config_active',
                            { config => $config_hr->{'config'} },
                        );
                    }
                );
            }
            else {
                next if ( !exists $active_configs->{ $config_hr->{config} } );    # It is already inactive, so skip

                # Rule is inactive on source server, but active on target, de-activate it.
                $queue->add(
                    sub {
                        _execute_or_die(
                            'modsec_make_config_inactive',
                            { config => $config_hr->{'config'} },
                        );
                    }
                );
            }
        }
    }

    return;
}

sub _enqueue_disabled_rules ( $conf, $queue ) {
    my %vendor_rule_config;

    for my $rule_id ( keys %{ $conf->{'disabled_rules'} } ) {
        my $vendor_id = $conf->{'disabled_rules'}{$rule_id};

        $queue->add(
            sub {
                $vendor_rule_config{$vendor_id} ||= do {
                    my $result = _execute_or_die(
                        'modsec_get_rules',
                        { vendor_id => $vendor_id },
                    );

                    my $chunks = $result->get_data()->{'chunks'};

                    my %lookup = map { @{$_}{ 'id', 'config' } } @$chunks;

                    \%lookup;
                };

                my $config = $vendor_rule_config{$vendor_id}{$rule_id};

                # Since we’ll be dealing with the very .conf files that
                # were active in the backed-up configuration, all disabled
                # rules should actually exist. Still, we needn’t consider
                # a failure here to be fatal, so let’s trap errors here.

                local $@;
                warn if !eval {
                    _execute_or_die(
                        'modsec_disable_rule',
                        { config => $config, id => $rule_id },
                    );
                };
            },
        );
    }

    return;
}

sub _install_pkg {
    my ( $queue, $pkg, $enabled, $vendor_id ) = @_;

    require Cpanel::SysPkgs;

    # Install the package, should be ok if it is already installed
    my $syspkgs = Cpanel::SysPkgs->new;
    $syspkgs->install( packages => [$pkg] );

    # Disable the vendor if disabled on the source machine
    if ( $enabled == 0 ) {
        $queue->add(
            sub {
                _execute_or_die(
                    'modsec_disable_vendor',
                    {
                        vendor_id => $vendor_id,
                    }
                );
            },
        );
    }

    return;
}

# This function does not have POD as it is an internal only function, but needs heavy documentation
#
# The purpose of this function is as follows.
#
# * Remove modsec vendors that are on the target machine if they are not on the source machine
# * Make the Disabled/Enabled statuses of vendors the same on both machines
# * Add vendor on the target machine that are on the source machine (including enabled status)
# * For each target machine vendor, copy over the enable updates status from the source machine
#
# We are in the process of transferring the Mod Security configuration from the source machine to the target
# machine.  BTW this machine is the target machine.
#

sub _enqueue_vendor_installs_uninstalls ( $conf, $queue ) {

    # Reworked the changes from case CPANEL-39059
    # Original notes here:
    # The 'is_rpm' key is the old key and was added in version 92 via CPANEL-33703
    # The 'is_pkg' key deprecates the 'is_rpm' key.  This change was made in version 102
    # via CPANEL-39059
    # We need to account for both keys here since the target server may not yet have this change

    # New approach
    # I will pre-process/normalize this to move the is_rpm flag over to the is_pkg flag so we can depend on
    # the is_pkg flag only.

    # I am going to change the contents of the passed in config, I am going to make a copy so as to not pollute
    # the parent code

    my $conf_copy = Cpanel::SafeStorable::dclone($conf);
    foreach my $xhr ( @{ $conf_copy->{vendors} } ) {
        $xhr->{is_pkg} = $xhr->{is_rpm} if ( exists $xhr->{is_rpm} && defined $xhr->{is_rpm} );
    }

    my %vendors_on_source_machine = map { ( $_->{vendor_id}, $_->{installed_from} ) } @{ $conf_copy->{vendors} };
    my %vendors_on_target_machine = map { $_ => 1 } @{ Whostmgr::ModSecurity::VendorList::list_vendor_ids() };

    # Remove modsec vendors on the target machine that are not on the source machine.
    for my $vid ( keys %vendors_on_target_machine ) {
        if ( !exists $vendors_on_source_machine{$vid} ) {
            $queue->add(
                sub { _execute_or_die( 'modsec_remove_vendor', { vendor_id => $vid } ) },
            );
        }
    }

    for my $vendor_hr ( @{ $conf_copy->{vendors} } ) {
        my $vid = $vendor_hr->{vendor_id};
        if ( exists $vendors_on_target_machine{$vid} ) {

            # install the package whether it is needed or not
            if ( $vendor_hr->{is_pkg} ) {
                _install_pkg( $queue, $vendor_hr->{is_pkg}, $vendor_hr->{enabled}, $vendor_hr->{vendor_id} );
            }
            else {
                # Make the Disabled/Enabled statuses of vendors the same on both machines
                if ( $vendor_hr->{enabled} ) {
                    $queue->add(
                        sub {
                            _execute_or_die(
                                'modsec_enable_vendor',
                                {
                                    vendor_id => $vendor_hr->{'vendor_id'},
                                }
                            );
                        },
                    );
                }
                else {
                    $queue->add(
                        sub {
                            _execute_or_die(
                                'modsec_disable_vendor',
                                {
                                    vendor_id => $vendor_hr->{'vendor_id'},
                                }
                            );
                        },
                    );
                }
            }
        }
        else {
            # Add vendor on the target machine that are on the source machine (including enabled status)
            if ( $vendor_hr->{is_pkg} ) {
                _install_pkg( $queue, $vendor_hr->{is_pkg}, $vendor_hr->{enabled}, $vendor_hr->{vendor_id} );
            }
            else {
                $queue->add(
                    sub {
                        _execute_or_die(
                            'modsec_add_vendor',
                            {
                                url     => $vendor_hr->{'installed_from'},
                                enabled => $vendor_hr->{'enabled'},
                            }
                        );
                    },
                );
            }
        }

        # For each target machine vendor, copy over the enable updates status from the source machine
        my $update_fn = $vendor_hr->{'update'} ? 'modsec_enable_vendor_updates' : 'modsec_disable_vendor_updates';

        if ( !$vendor_hr->{'update'} ) {
            $queue->add(
                sub {
                    _execute_or_die(
                        $update_fn,
                        {
                            vendor_id => $vendor_hr->{'vendor_id'},
                        }
                    );
                },
            );
        }
    }

    return;
}

sub _enqueue_settings_changes ( $conf, $queue ) {
    my %new_settings = map { @{$_}{ 'setting_id', 'state' } } @{ $conf->{'settings'} };

    my %batch;

    my $current_ar = Whostmgr::ModSecurity::Settings::get_settings();

    for my $setting_hr (@$current_ar) {
        my $sid      = $setting_hr->{'setting_id'};
        my $batchnum = keys %batch;

        if ( exists $new_settings{$sid} ) {
            $batch{"state$batchnum"} = $new_settings{$sid};
        }
        elsif ( !$setting_hr->{'missing'} ) {
            $batch{"remove$batchnum"} = 1;
        }
        else {
            next;
        }

        $batch{"setting_id$batchnum"} = $sid;
    }

    if (%batch) {
        $batch{'commit'} = 1;

        $queue->add(
            sub {
                _execute_or_die( 'modsec_batch_settings', \%batch );
            }
        );
    }

    return;
}

sub _execute_or_die ( $fn, $args_hr ) {

    return Whostmgr::API::1::Utils::Execute::execute_or_die(
        'ModSecurity', $fn,
        $args_hr,
    );
}

1;
