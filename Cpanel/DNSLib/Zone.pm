
#                                      Copyright 2024 WebPros International, LLC
#                                                           All rights reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited.

package Cpanel::DNSLib::Zone;

use strict;
## no critic qw(TestingAndDebugging::RequireUseWarnings)

use Cpanel::Autowarn        qw( unlink );
use Cpanel::SafeRun::Errors ();
use Cpanel::Binaries        ();

# NB: Consider Cpanel::DnsUtils::CheckZone instead, which accepts a
# buffer rather than a filesystem path.
sub checkzone {
    my $zone     = shift;
    my $zonefile = shift;

    if ( !$zone ) {
        return wantarray ? ( 0, 'No zone specified' ) : 0;
    }
    elsif ( $zone !~ m/[\w\.]+/ ) {
        return wantarray ? ( 0, "Invalid zone $zone specified" ) : 0;
    }
    elsif ( !$zonefile ) {
        return wantarray ? ( 0, 'No zone file specified' ) : 0;
    }
    elsif ( !-e $zonefile || -z _ ) {
        return wantarray ? ( 0, "No zone file located at $zonefile" ) : 0;
    }

    my $checkbin = Cpanel::Binaries::path("pdnsutil");    # use pdnsutil if we have it (e.g. it understands ALIAS)
    my @cmd      = ( $checkbin, "check-zone", $zone );
    if ( !-x $checkbin ) {
        $checkbin = Cpanel::Binaries::path("named-checkzone");
        @cmd      = ( $checkbin, $zone, $zonefile );
    }

    my $output = Cpanel::SafeRun::Errors::saferunallerrors(@cmd);
    $output = '' if !defined $output;
    chomp $output;

    if ( $output && ( $output =~ m/^OK$/m || $output =~ m/0 errors/m ) ) {
        return wantarray ? ( 1, $output ) : 1;
    }
    else {
        return wantarray ? ( 0, $output ) : 0;
    }
}

sub removezone {
    my ( $domain, $zonedir, $chrootdir ) = @_;
    my $resultscount = 0;
    my @removed;
    my @to_remove;
    push @to_remove, $zonedir . '/cache/' . $domain . '.db';
    push @to_remove, $zonedir . '/parse_cache/' . $domain . '.db';
    push @to_remove, $zonedir . '/ns_parse_cache/' . $domain . '.db';
    push @to_remove, $zonedir . '/' . $domain . '.db';
    push @to_remove, $zonedir . '/' . $domain;

    if ($chrootdir) {
        push @to_remove, map { $chrootdir . $_ } @to_remove;
    }

    foreach my $file (@to_remove) {
        if ( Cpanel::Autowarn::unlink($file) ) {
            push @removed, $file;
            $resultscount++;
        }
    }
    return wantarray ? ( $resultscount, \@removed ) : $resultscount;
}

1;
