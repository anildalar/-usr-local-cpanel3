#                                     Copyright 2024 WebPros International, LLC
#                                                           All rights Reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited
package Cpanel::Plugins::Components::Rules::DateRange;
use cPstrict;

use Moo;
extends 'Cpanel::Plugins::Components::Rules::Base';

=head1 MODULE

C<Cpanel::Plugins::Components::Rules::DateRange>

=head1 DESCRIPTION

This class gets implemented when the campaign config file has 'date-range' listed.

The parent class Cpanel::Plugins::Components::Rules implements is_allowed method.

C<Cpanel::Plugins::Components::Rules::DateRange> provides

=head1 SYNOPSIS

Show the campaign between a start and end date:

  use Cpanel::Plugins::Components::Rules::DateRange;
  my $date_range = {
      'start_date' => '04-24-2024',
      'end_date'   => '10-24-2024',
  };
  my $return = Cpanel::Plugins::Components::Rules::Company_Id->new($date_range)->is_allowed();

Show the campaign between forever after a start date:

  use Cpanel::Plugins::Components::Rules::DateRange;
  my $date_range = {
      'start_date' => '04-24-2024',
  };
  my $return = Cpanel::Plugins::Components::Rules::Company_Id->new($date_range)->is_allowed();

Show the campaign between a from the current day whatever it is to a specific end date:

  use Cpanel::Plugins::Components::Rules::DateRange;
  my $date_range = {
      'end_date'   => '10-24-2024',
  };
  my $return = Cpanel::Plugins::Components::Rules::Company_Id->new($date_range)->is_allowed();

=cut

=head1 METHODS

=over

=item * is_allowed -- Allow the campaign if the date is after the start date, before the end date or between the 2 dates.

    RETURNS
        0 - The date_range check failed.
        1 - The date_range check succeeded.

    ERRORS
        Fails if the date_range is not in right format.

=back

=cut

around BUILDARGS => sub {
    my ( $orig, $class, @args ) = @_;

    return { config => $args[0] }
      if @args == 1 && ref $args[0];

    return $class->$orig(@args);
};

sub is_allowed ($self) {
    my $date_range = $self->config();

    my %date_range = $date_range->@* if ref $date_range eq "ARRAY";
    %date_range = $date_range->%* if ref $date_range eq "HASH";
    die "The date range was unrecognized" if !keys %date_range;

    my $start_date = $date_range{start_date} || '';
    my $end_date   = $date_range{end_date}   || '';
    return !!1 if !$end_date && !$start_date;    # TODO: Probably should die here.

    my $current_date = time;
    if ($start_date) {
        my $start_date_epoch = _convert_date_to_epoch($start_date);
        return !!0 if $current_date < $start_date_epoch;
    }

    if ($end_date) {
        my $end_date_epoch = _convert_date_to_epoch($end_date);
        return !!0 if $current_date > $end_date_epoch;
    }

    return !!1;    # The date is in the range.

}

sub _convert_date_to_epoch ($date_mmddyyyy) {
    my ( $mm, $dd, $year );
    if ( ( $mm, $dd, $year ) = ( $date_mmddyyyy =~ /(\d+)-(\d+)-(\d+)/ ) ) {
        require Time::Local;
        my $epoch_seconds = Time::Local::timelocal( 0, 0, 0, $dd, $mm - 1, $year - 1900 );
        return $epoch_seconds;
    }
    else {
        die "Please have date in mm-dd-yyyy";
    }
}

1;
