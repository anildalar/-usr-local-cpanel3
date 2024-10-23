package Whostmgr::Transfers::Session::Items::GreyListRemoteRoot;

# cpanel - Whostmgr/Transfers/Session/Items/GreyListRemoteRoot.pm
#                                                  Copyright 2022 cPanel, L.L.C.
#                                                           All rights reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited

use strict;
use warnings;

=encoding utf-8

=head1 NAME

Whostmgr::Transfers::Session::Items::GreyListRemoteRoot

=head1 DESCRIPTION

This module describes to the transfer system how to store
backup data for GreyList configuration.

=cut

use parent (
    'Whostmgr::Transfers::Session::Items::ConfigBackupBase',
    'Whostmgr::Transfers::Session::Items::Schema::GreyListRemoteRoot',
);

use constant module_info => {
    'item_name'            => 'GreyList',
    'config_module'        => 'cpanel::system::greylist',
    'config_restore_flags' => { 'dry_run' => 1 },
};

1;
