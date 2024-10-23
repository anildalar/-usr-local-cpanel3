package Cpanel::EA4::Constants;

#                                      Copyright 2024 WebPros International, LLC
#                                                           All rights reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited.

# Test::Cpanel::Policy - constants

use cPstrict;

use Cpanel::OS ();

# please do not bring other dependencies there, it should stay light

# we should consider converting them as constants
#   but it
our ( $ea4_dir, $ea4_dir_perms, $ea4_flag_file );

BEGIN {
    $ea4_dir       = '/etc/cpanel/ea4';
    $ea4_dir_perms = 0755;
    $ea4_flag_file = $ea4_dir . '/is_ea4';
}

use constant nginx_pkg             => "ea-nginx";
use constant nginx_domain_logs_dir => "/var/log/nginx/domains";
use constant DEFAULT_PROFILE       => $ea4_dir . "/profiles/cpanel/default.json";
use constant CUSTOM_PROFILE        => '/etc/cpanel_initial_install_ea4_profile.json';

# URL to public signing key for RPM signing verification
our $public_key_url  = 'https://securedownloads.cpanel.net/cPanelPublicPkgKey.asc';
our $public_key_path = '/etc/cpanel/ea4/cPanelPublicPkgKey.asc';

sub repo_file_url {
    return Cpanel::OS::ea4_from_bare_repo_url();
}

sub repo_file_path {
    return Cpanel::OS::ea4_from_bare_repo_path();
}

1;

=pod

=head1 NAME

Cpanel::EA4::Constants

=head1 DESCRIPTION

This package provides shared configuration variables and should not bring
any extra dependencies.

=head1 FUNCTIONS

none

=cut
