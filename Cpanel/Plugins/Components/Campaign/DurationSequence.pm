#                                      Copyright 2024 WebPros International, LLC
#                                                           All rights reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited.

package Cpanel::Plugins::Components::Campaign::DurationSequence;

use strict;
use warnings;

use v5.20;
use experimental qw(signatures);

use constant DEFAULT_DURATION => 10;    # day/days

=head1 MODULE

C<Cpanel::Plugins::Components::Campign::DurationSequence>

=head1 DESCRIPTION

C<Cpanel::Plugins::Components::Campign::DurationSequence> provides a way to calculate a time based sequence of campaign
banners. Each item in the sequence will run for a given duration calculated from the start_date. This way the
same sequence can be run for different customer groups.

To make this as efficent as possible the most expensive parts of the calculation are saved to last.

=head1 SYNOPSIS

  package TheCampaign;

  use Cpanel::Plugins::Components::Campaign::DurationSequence ();
  use Moo;
  extends 'Cpanel::Plugins::Components::Whostmgr';
  with    'Cpanel::Plugins::Components::Role::CampaignV2';

  sub sequence($self) {
    return [ ... ];
  }

  sub get_step($self) {
    my $start_date = $self->find_start_date();
    return Cpanel::Plugins::Components::Campaign::DurationSequence::get_step($self->sequence, $start_date);
  }

  around render => sub ( $orig, $self, $args, $opts ) {
    my $step = $self->get_step();

    $args = {
        $args->%*,
        step          => $step,
        image_url     => $self->get_image_url($step->{cta}{image_url}),
        campaign_id   => $self->campaign_id . "." . $step->{id},
        dismissable   => $self->dismissable,
        show_again_in => $self->show_again_in,
    };
    return $self->$orig( $args, $opts );
};

=head1 FUNCTIONS

=head2 make_datetime(date)

Convert a m/d/y into a DateTime object.

=cut

sub make_datetime ($date) {
    my ( $month, $day, $year ) = split( m{-|/}, $date );

    require DateTime;
    return DateTime->new( year => $year, month => $month, day => $day );
}

=head2 get_step($campaign, $start_date)

Retrieve the step to show for the campaign with a C<start_date> string in the form C<m/d/y> used to
calculate which step based on durations. We use C<<DateTime->now>> to calculate the date deltas.

Returns undef if there is no step to show and a number of the 1 indexed step if there is a step to
show.

If the step calculated was already show, then the undef is returned.

This routine requires:

 * step_count - total number of steps
 * sequence   - array of steps
 * last_closed_step - retrieves the last step dismissed by the user or undef.

=head3 ARGUMENTS

=over

=item $campaign - a campaign to run

=item $start_date - a m/d/y formated date string.

=back

=head3 RETURNS

number | undef - the step number if there is one to show, undef othewise.

=cut

sub get_step ( $campaign, $start_date_mdy ) {
    return if !$campaign->step_count;
    my $start_date_dt = make_datetime($start_date_mdy);

    my $step = find_next_step( $campaign->sequence, $start_date_dt );
    return if !$step;

    # check if the user dismissed this step previously.
    my $last_closed_step = $campaign->last_closed_step();
    return if $last_closed_step && $step <= $last_closed_step;

    return $step;
}

=head2 is_allowed($rule)

=head3 ARGUMENTS

=over

=item $rule - a rule HASHREF|ARRAYREF

=back

=head3 RETURNS

true value if allowed, false value otherwise.

=cut

sub is_allowed ($rule) {
    require Cpanel::Plugins::Components::Rules;
    my $rules_obj = Cpanel::Plugins::Components::Rules->new( 'config' => $rule );
    return $rules_obj->is_allowed();
}

=head2 find_next_step($sequence, $start_date_dt)

=head3 ARGUMENTS

=over

=item $sequence - ARRAYREF of steps

=item $state_date_dt - DateTime used as a state date for the step duration calculations.

=back

=head3 RETURNS

number | undef - Step number if there is a step to show.

=cut

sub find_next_step ( $sequence, $start_date_dt ) {
    my $delta_duration = 0;
    my $step           = 1;
    my $now            = DateTime->now;

    foreach my $item (@$sequence) {
        my $duration = $item->{duration} || DEFAULT_DURATION;
        $delta_duration += $duration;
        my $delta_duration_d   = DateTime::Duration->new( days => $delta_duration );
        my $step_runs_until_dt = $start_date_dt->clone->add($delta_duration_d);
        my $may_should_show    = DateTime->compare( $now, $step_runs_until_dt ) == -1;
        if ($may_should_show) {
            my $step_details = $sequence->[ $step - 1 ];
            if ( $step_details->{rule} ) {

                # Only return if the prerequisites are met.
                return $step if is_allowed( $step_details->{rule} );
                return       if $step_details->{pause_on_failure};
            }
            else {
                return $step;
            }
        }
        $step++;
    }
    return;
}

1;
