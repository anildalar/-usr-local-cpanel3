# cpanel - Cpanel/Pkgacct/Components/PackageVersion.pm
#                                                  Copyright 2024 cPanel, L.L.C.
#                                                           All rights reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited
package Cpanel::Pkgacct::Components::PackageVersion;

use cPstrict;

use parent 'Cpanel::Pkgacct::Component';

use Cpanel::Autodie       ();
use Cpanel::Version::Tiny ();

=encoding utf-8

=head1 NAME

Cpanel::Pkgacct::Components::PackageVersion

=head1 DESCRIPTION

A pkgacct component module to include the version of the product the archive
was packaged in

=cut

our $OUTPUT_FILENAME = 'packaged_in_version';

=head1 METHODS

=head2 I<OBJ>->perform()

See base class

=cut

sub perform ($self) {

    my $work_dir    = $self->get_work_dir();
    my $output_file = join '/', $work_dir, $OUTPUT_FILENAME;

    Cpanel::Autodie::open( my $fh, '>', $output_file );
    print $fh "$Cpanel::Version::Tiny::VERSION_BUILD";
    close($fh);

    return;
}

1;
