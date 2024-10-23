#                                     Copyright 2024 WebPros International, LLC
#                                                           All rights Reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited
package Cpanel::Plugins::Components::Rules::And;
use cPstrict;

use Moo;
extends 'Cpanel::Plugins::Components::Rules::Operator';

=head1 MODULE

C<Cpanel::Plugins::Components::Rules::And>

=head1 DESCRIPTION

This rule processes the pairs using AND logic and short-circuits on the first failure.

=head1 SYNOPSIS

When there is just a simple rule to check:

  use Cpanel::Plugins::Components::Rules::And;
  my $and_rules = {
    'feature-flag' => 'cpanel-monitoring-plugin.enabled',
    'feature-flag' => 'cpanel-monitoring-plugin.commerce-enabled',
  };
  return 1 if Cpanel::Plugins::Components::Rules::And->new($and_rules)->is_allowed($and_rules);

When there is a complex rule to check:

  use Cpanel::Plugins::Components::Rules::And;
  my $and_rules = [
    'feature-flag' => 'cpanel-monitoring-plugin.enabled',
    'feature-flag' => 'cpanel-monitoring-plugin.commerce-enabled',
    'date-range'   => {
        'start-date' => '01/01/2025',
        'end-date'   => '01/10/2025'
    },
  ];
  return 1 if Cpanel::Plugins::Components::Rules::And->new($and_phrase)->is_allowed();

When the rules are defined in the JSON file ~/campaign2.json

  {
    "and": [
        "feature-flag", "cpanel-monitoring-plugin.enabled",
        "feature-flag", "cpanel-monitoring-plugin.commerce-enabled",
        "date-range", {
            "start-date": "01/01/2025",
            "end-date"  : "01/10/2025"
        },
    ]
 }

Then in your perl module:

  use Cpanel::Plugins::Components::Rules ();
  my $rules = Cpanel::Plugins::Components::Rules->new(config_file => '~/campaign2.json' );
  return $rules->is_allowed();

=head1 METHODS

=over

=item * is_allowed -- Allow the campaign if rules are met.

    ARGUMENTS
        $rules (HASHREF|ARRAYREF)
         -- Contains the list of the rules to process.

    RETURNS
        0 - When any of the rules returns False.
        1 - When all of the rules returns True.

    ERRORS
        Fails if any of the rules can't be loaded
        Fails if any of the rules dont implement the is_allowed method.
        Fails if any of the rules arguments are misformatted.

=back

=cut

sub is_allowed ($self) {

    # Rules in an array or hash are treated as an AND
    # operation with short circuiting on the first false
    # value.

    # Rules in an array are always executed in the array
    # order in pairs. Use array syntax to have fine grain
    # control of the order of execution.

    # Rules in a hash are executed in the sorted key
    # order so they are at least consistently processed.
    my @config = $self->config->@*;

    my $length       = scalar @config;
    my $start        = 0;
    my $is_key_value = ref $config[0] ? 0 : 1;
    my $inc          = $is_key_value  ? 2 : 1;
    my %processed_rule;
    my $campaign_id = $self->{campaign_id} // '';
    while ( $start < $length ) {
        my ( $rule, $rule_arg );
        if ($is_key_value) {

            # Handle name/value pairs
            ( $rule, $rule_arg ) = @config[ $start, $start + 1 ];
        }
        else {
            # Handle list of arrays
            ( $rule, $rule_arg ) = ( 'and', $config[$start] );
        }

        my $return = $self->process_rule( $rule, $rule_arg );
        $processed_rule{$rule} = $rule_arg if $return;
        return !!0 if !$return;    # short-circuit if a rule returns 0.
        $start += $inc;
    }
    if ($campaign_id) {

        # processed_rule has to be normalized to get
        # the exact date-range key-value mapping
        # especially for complex data structures
        # filter the processed_rule to get date_range
        require Cpanel::Plugins::Components::Rules::Util::Filter;
        my $new_processed_rule = Cpanel::Plugins::Components::Rules::Util::Filter::find_date_range( \%processed_rule, 'and' );

        # find start_date and update NVData
        require Cpanel::Plugins::Components::Rules::Util::FindStartDate;
        Cpanel::Plugins::Components::Rules::Util::FindStartDate::process_start_date( $campaign_id, $new_processed_rule );
    }
    return !!1;    # everything returned true.
}

1;
