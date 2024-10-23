#                                     Copyright 2024 WebPros International, LLC
#                                                           All rights Reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited
package Cpanel::Plugins::Components::Rules::Util::Filter;

use cPstrict;
use Cpanel::Imports;
use Cpanel::Plugins::Components::Rules::Util::NVData;

=head1 MODULE

C<Cpanel::Plugins::Components::Rules::Util::Filter>

=head1 DESCRIPTION

C<Cpanel::Plugins::Components::Rules::Util::Filter> is the utility class to filter the date-range section from the rules

This module gets called up on from 'AND' (or) 'OR' operators, whenever a rule is satisfied. We track the rule_name and dataset of the rule in a processed_rule hash whenever a rule is satisfied.

The challenge here is any rule with 'OR' operator has to go through 'AND' operator, so if 'OR' clause is satisfied and has already filtered/processed the start_date, 'AND' should not redo it.

There is an another issue with 'NOT' operator where if we have 'NOT' in outer rule with complex block underneath with date-range in multiple blocks, it just randomly picks the 'date-range' from first block. Please avoid using 'NOT' in the outer block that involves complex rule set.

The reasonable real time usages for the rules that are tested and encounterd are given below. This is from campaigns json file located in '/var/cpanel/plugins/monitoring-campaigns'

A simple rule which goes through default 'AND' and returns this array ref as is.

    "rules" : [
        "date-range",
        [
            "start_date", "08-29-2024",
            "end_date",   "10-30-2024"
        ],
        "company-id",
        [ 7, 265 ]
      ],

A real-time usage of campaigns with different company_id's having different date-range. We have to pick the exact block of data that returned true to capture the right start_date.

      "rules" : [
        "or",
        [
            "or",
            [
                "date-range",
                {
                    "start_date" : "05-10-2024",
                    "end_date"   : "07-15-2024"
                },
                "company-id",
                [
                    17,
                    256
                ]
            ],
            "or",
            {
                "date-range" : {
                    "start_date" : "08-10-2024",
                    "end_date"   : "10-15-2024"
                },
                "company-id" : [7]
            }
        ]
      ],

If you run this rule on company id 7, find_date_range will return the matching date-range
      {
        "date-range" : {
            "start_date" : "08-10-2024",
            "end_date"   : "10-15-2024"
          },
          "company-id" : [7]
       }

=cut

=head1 METHODS

=over

=item * find_date_range -- Finds the date-range from the successfully processed_rule

    ARGUMENTS
        $processed_rule (hashref) -- The successfully processed rule
        $operator   (string) -- The name of the operator like 'or' , 'and'

    RETURNS
        $processed_rule (hashref) -- The expected date-range key value mapping.

    ERRORS
        All failures are fatal.

    EXAMPLE
        my $processed_rule = {
            'or' => {
                'date-range' : {
                    'start_date' : '08-10-2024',
                    'end_date'   : '10-15-2024'
                },
                'company-id' : [7]
            }
        };
        my $new_processed_rule = Cpanel::Plugins::Components::Rules::Util::Filter::find_date_range( $processed_rule, 'or');

=back

=cut

sub find_date_range ( $processed_rule, $operator ) {
    foreach my $rule ( keys %{$processed_rule} ) {
        if ( $rule =~ /^(or|and|not)$/i ) {

            # and operation just gives the whole complex rule data set
            # which also includes already processed 'or' rule dataset
            # skip 'or' dataset when processing an operator 'and'
            return if $rule eq 'or' && $operator eq 'and';
            if ( ref $processed_rule->{$rule} eq 'ARRAY' ) {
                my %inner_rule = @{ $processed_rule->{$rule} };
                return find_date_range( \%inner_rule, $operator );
                for ( my $i = 0; $i < @{ $processed_rule->{$rule} }; $i++ ) {
                    if ( $processed_rule->{$rule}->[$i] eq "date-range" ) {
                        my %date_range_rule = @{ $processed_rule->{$rule} }[ $i, $i + 1 ];
                        return \%date_range_rule;
                    }
                }
            }
        }
        else {
            return $processed_rule;
        }
    }
    return;
}
1;
