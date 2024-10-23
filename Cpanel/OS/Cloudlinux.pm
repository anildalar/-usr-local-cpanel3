package Cpanel::OS::Cloudlinux;

#                                      Copyright 2024 WebPros International, LLC
#                                                           All rights reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited.

use cPstrict;

use parent 'Cpanel::OS::Rhel';

use Cpanel::Server::Type ();

use constant is_supported => 0;    # Base class for CL.

use constant is_cloudlinux => 1;

use constant pretty_distro            => 'CloudLinux';
use constant supports_kernelcare_free => 0;

sub ea4_yum_tooling {
    return [ qw{ yum-plugin-universal-hooks ea-cpanel-tools }, _ea_profiles() ];
}

sub ea4_dnf_tooling {
    return [ qw{ dnf-plugin-universal-hooks ea-cpanel-tools }, _ea_profiles() ];
}

sub _ea_profiles {

    if ( Cpanel::Server::Type::is_wp_squared() ) {
        return 'ea-profiles-cpanel';
    }

    return 'ea-profiles-cloudlinux';
}

1;

__END__

=encoding utf-8

=head1 NAME

Cpanel::OS::Cloudlinux - Cloudlinux base class

=head1 SYNOPSIS

    use parent 'Cpanel::OS::Cloudlinux';

=head1 DESCRIPTION

This package is an interface for all Cloudlinux distributions.
You should not use it directly.

=head1 ATTRIBUTES

=head2 supported()

No a supported distribution.

=head2 ea4_yum_tooling()

List of yum_tooling packages.

=head2 ea4_dnf_tooling()

List of dnf_tooling package.

=head2 supports_kernelcare_free()

By default kernelcare_free is not supported.
