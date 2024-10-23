#                                     Copyright 2024 WebPros International, LLC
#                                                           All rights Reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited
package Cpanel::Plugins::Components::Rules::Util::FindStartDate;

use cPstrict;
use Cpanel::Imports;
use Cpanel::Plugins::Components::Rules::Util::NVData;

=head1 MODULE

C<Cpanel::Plugins::Components::Rules::Util::FindStartDate>

=head1 DESCRIPTION

C<Cpanel::Plugins::Components::Rules::Util::FindStartDate> is the utility class to find the start date for the campaign. This start_date is critical in determining the exact sequence a banner has to process.

=cut

=head1 METHODS

=over

=item * get_start_date -- Fetches NVData value for the campaign_id.

    ARGUMENTS
        $campaign_id (string) -- The name of the campaign.

    RETURNS
        $start_date (string) -- The start_date from 'date-range' of campaign.
        undef -- If tehre is no campaign_id.

    ERRORS
        All failures are fatal.

    EXAMPLE
        my $start_date = Cpanel::Plugins::Components::Rules::Util::NVData::get_nv_data( $campaign_id, 'start_date' );

=back

=cut

sub get_start_date ($campaign_id) {
    return if !$campaign_id;
    return Cpanel::Plugins::Components::Rules::Util::NVData::get_nv_data( $campaign_id, 'start_date' );
}

=head1 METHODS

=over

=item * process_start_date -- Find start_date from processed_rule and set it in NVData.

    The education banner depends on the start_date to fetch the right sequence.
    This is a challenge since our rules component can accept complicated rule set.
    Since we can control in setting up the rules, we can stream line to make this functional
    for reasonable real time usages and not handle all complexity.

    ARGUMENTS
        $campaign_id (string) -- The name of the campaign.
        $processed_rule (hash_ref) -- The processed_rule data set that returned true.

        For ex:

        $processed_rule = {
            'date-range' => [
                'end_date',
                '10-15-2024',
                'start_date',
                '08-10-2024'
            ],
            'company-id' => [7]
        };


    RETURNS
        none

    ERRORS
        All failures are fatal.

    EXAMPLE
        require Cpanel::Plugins::Components::Rules::Util::NVData::FindStartDate;
        Cpanel::Plugins::Components::Rules::Util::NVData::FindStartDate::process_start_date($campaign_id, $processed_rule);

=back

=cut

sub process_start_date ( $campaign_id, $processed_rule ) {
    return if !$campaign_id;
    my $rule_start_date;
    if ( exists $processed_rule->{'date-range'} && $processed_rule->{'date-range'} ) {
        $rule_start_date = _process_rule_ref( @{ $processed_rule->{'date-range'} } );
        Cpanel::Plugins::Components::Rules::Util::NVData::set_nv_data( $campaign_id, 'start_date', $rule_start_date );
    }
    return;
}

=head1 METHODS

=over

=item * compare_start_date

    Compare with current start_date from rule's date-range
    and nvdata's start_date and return 1 if it is a match.
    This is currently not used by any method yet, but this can be used in future

    ARGUMENTS
        $nv_date (string) -- The start_date in NVData for campaign_id.
        $rule_date (string) -- The start_date in date-range for processed_rule

    RETURNS
        1 -- If it is a match.
        0 -- If it is not a match.

    ERRORS
        All failures are fatal.

    EXAMPLE
        my $status = Cpanel::Plugins::Components::Rules::Util::NVData::get_nv_data( $campaign_id, 'start_date' );

=back

=cut

sub compare_start_date ( $nv_date, $rule_date ) {
    return 0 if !$nv_date || !$rule_date;
    return $nv_date eq $rule_date ? 1 : 0;
}

sub _process_rule_ref (@processed_rule) {
    my $rule_start_date;
    for ( my $i = 0; $i < @processed_rule; $i++ ) {
        next if $processed_rule[$i] ne 'start_date';
        $rule_start_date = $processed_rule[ $i + 1 ];
        return $rule_start_date;
    }
    return '';
}

1;
