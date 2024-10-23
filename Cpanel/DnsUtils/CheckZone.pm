package Cpanel::DnsUtils::CheckZone;

#                                      Copyright 2024 WebPros International, LLC
#                                                           All rights reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited.

use cPstrict;
use Path::Tiny ();

=encoding utf-8

=head1 NAME

Cpanel::DnsUtils::CheckZone

=head1 SYNOPSIS

    my $errs_ar = Cpanel::DnsUtils::CheckZone::check_zone(
        'beagle.com',
        $beagle_com_zone_text,
    );

    for my $err_ar (@$errs_ar) {
        print "Line $err_ar->[0]: $err_ar->[1]\n";
    }

… or, if you want an exception on invalidity:

    Cpanel::DnsUtils::CheckZone::assert_validity(
        'beagle.com',
        $beagle_com_zone_text,
    );

=head1 DESCRIPTION

This module looks for errors in a BIND zone file and reports them.

=cut

#----------------------------------------------------------------------

use Cpanel::Binaries            ();
use Cpanel::SafeRun::Object     ();
use Cpanel::IOCallbackWriteLine ();

# stubbed in tests
our $_NAMED_CHECKZONE_PATH;
our $_PDNS_ZONE2JSON_PATH;

#----------------------------------------------------------------------

=head2 $zone_errors_hr = check_zone( $ZONE_NAME, $ZONE_TEXT )

B<IMPORTANT:> This can output non-UTF-8 sequences. If you’ll be serializing
this response as JSON, you B<MUST> encode it such that it’ll be valid UTF-8.
(e.g., base64, an extra UTF-8 encode, etc.)

Checks given zones for errors.

$ZONE_NAME is a DNS zone name; $ZONE_TEXT is that zone’s content as
an RFC-1035 zone master file.

Returns an arrayref, one item per error. Each error is represented as
another arrayref:

=over

=item * The line number (1-indexed) of the reported error in $ZONE_TEXT.

=item * A text description of the error. (Can include arbitrary,
non-UTF-8 octet sequences!)

=back

See L<Cpanel::DNSLib::Zone> for an older implementation of similar logic.

=cut

sub check_zone ( $zone_name, $zone_text ) {
    my ( @errs, %SRO_ARGS, $zone_file );

    if ( !$_PDNS_ZONE2JSON_PATH ) {
        $_PDNS_ZONE2JSON_PATH = Cpanel::Binaries::path('pdnsutil');
        $_PDNS_ZONE2JSON_PATH =~ s{/pdnsutil$}{/zone2json};    # this is
    }

    $_NAMED_CHECKZONE_PATH ||= Cpanel::Binaries::path('named-checkzone');

    if ( -x $_PDNS_ZONE2JSON_PATH ) {                          # use pdnsutil if we have it (e.g. it understands ALIAS)

        # pdns has no mechanism to check arbitrary zone files/zone text
        # it can take a zone file and dump it as JSON which fails if there are problems
        $zone_file = Path::Tiny->tempfile;
        $zone_file->spew($zone_text);

        %SRO_ARGS = (
            program => $_PDNS_ZONE2JSON_PATH,
            args    => ["--zone=$zone_file"],              # --on-error-resume-next[=…] seems to still barf after the first error in a file
            stderr  => Cpanel::IOCallbackWriteLine->new(
                sub ($line) {

                    # Example STDERR lines: first one is on success after the JSON in STDOUT
                    # 1 domains were fully parsed, containing 96 records
                    # died because of STL error: Parsing zone content on line 21 of file '/var/named/dan.test.db': 'ANAME' doesn't look like a qtype, stopping loop
                    # died because of STL error: Line with too little parts on line 17 of file '/var/named/dan.test.db'
                    if ( $line =~ m/line ([0-9]+)/ ) {
                        my $linenum = $1;
                        $line =~ s/^died because of STL error:\s+//;

                        push @errs, [ $linenum => $line ];
                        $errs[-1][1] =~ s/^\s+|\s+$//g;
                    }
                },
            ),
            stdout => undef,
        );
    }
    else {
        %SRO_ARGS = (
            program => $_NAMED_CHECKZONE_PATH,
            args    => [ '--', $zone_name, '/dev/stdin' ],
            stdin   => $zone_text,
            stderr  => Cpanel::IOCallbackWriteLine->new(
                sub ($line) {
                    warn "$_NAMED_CHECKZONE_PATH: $line";
                },
            ),
            stdout => Cpanel::IOCallbackWriteLine->new(
                sub ($line) {
                    if ( $line =~ /:([0-9]+):(.*)/ ) {
                        return if ( $1 eq '' );

                        push @errs, [ $1 => $2 ];

                        $errs[-1][1] =~ s/^\s*//g;
                    }
                },
            ),
        );
    }

    my $run = Cpanel::SafeRun::Object->new(%SRO_ARGS);
    $run->die_if_error() if $run->signal_code();

    return \@errs;
}

=head2 assert_validity( $ZONE_NAME, $ZONE_TEXT )

Like C<check_zone()> but throws a L<Cpanel::Exception::DNS::InvalidZoneFile>
instance if there are any validity errors.

Returns nothing on success.

=cut

sub assert_validity ( $zone_name, $zone_text ) {
    my $errs_ar = check_zone( $zone_name, $zone_text );

    if (@$errs_ar) {
        $_->[0]-- for @$errs_ar;

        require Cpanel::Exception;
        die Cpanel::Exception::create( 'DNS::InvalidZoneFile', [ by_line => $errs_ar ] );
    }

    return;
}

1;
