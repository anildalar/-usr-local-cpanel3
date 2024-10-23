#!/usr/local/cpanel/3rdparty/bin/perl

#                                      Copyright 2024 WebPros International, LLC
#                                                           All rights reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited.

package Install::SetupCageFS;

use cPstrict;

use Cpanel::CloudLinux::CageFS ();
use Cpanel::MD5                ();
use Cpanel::OS                 ();

use File::Copy ();

use parent qw( Cpanel::Task );

use constant CAGEFS_CFG => q[/etc/cagefs/conf.d/cpanel.cfg];

our $VERSION = '1.0';

=head1 DESCRIPTION

    Update the CageFS configuration

=over 1

=item Type: Sanity

=item Frequency: always

=item EOL: never

=back

=cut

exit __PACKAGE__->runtask() unless caller;

sub new ($proto) {
    my $self = $proto->SUPER::new;

    $self->set_internal_name('setup_cagefs');

    return $self;
}

sub perform ($self) {

    # make sure when run as modulino we exit with a clean exit code
    return 1 unless Cpanel::OS::is_cloudlinux();
    return 1 unless Cpanel::CloudLinux::CageFS::is_enabled();

    $self->update_cagefs_conf();

    return 1;
}

sub update_cagefs_conf ($self) {

    my $src  = q[/usr/local/cpanel/etc/cagefs/cpanel.cfg];
    my $dest = CAGEFS_CFG;

    return unless -e $src && -e $dest;

    my ( $md5_src, $md5_dest ) = map { scalar Cpanel::MD5::getmd5sum($_) // '' } ( $src, $dest );

    return if $md5_src eq $md5_dest;

    say qq[Updating CageFS configuration file for cPanel: $dest];

    File::Copy::copy( $src, $dest );
    chmod( 0600, $dest );

    my $ok = Cpanel::CloudLinux::CageFS::cagefs_remount_all()    #
      && Cpanel::CloudLinux::CageFS::force_cagefs_update();
    if ( !$ok ) {
        say qq[ - failed to update CageFS configuration (check error log)];
        return;
    }

    if ( Cpanel::MD5::getmd5sum(CAGEFS_CFG) ne $md5_src ) {
        warn qq[ - Failed to update cagefs file: mismatch md5\n];
        return;
    }

    return 1;
}

1;
