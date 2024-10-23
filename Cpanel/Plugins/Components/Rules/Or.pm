#                                     Copyright 2024 WebPros International, LLC
#                                                           All rights Reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited
package Cpanel::Plugins::Components::Rules::Or;
use cPstrict;

use Moo;
extends 'Cpanel::Plugins::Components::Rules::Operator';

=head1 MODULE

C<Cpanel::Plugins::Components::Rules::Or>

=head1 DESCRIPTION

This class processes an OR operation on the passed in list of rules.

The rules are an array or hash that defines pairs of:

  rule-name => rule-data

where rulename is a string and rule-data is a string, arrayref or hashref that depends on what the
specific rule requires.

The OR operator will process each rule until one returns true. If none of the items return true the
whole rule returns false.

=head1 SYNOPSIS

Using Perl:

  use Cpanel::Plugins::Components::Rules::Or;
  my $or_phrase = [
      'feature-flag' => 'cpanel-360Monitoring-prerelease-disabled',
      'feature-flag' => 'cpanel-360Monitoring-disabled',
  ];
  return Cpanel::Plugins::Components::Rules::Or->new($or_phrase)->is_allowed();

Using JSON file ~/prerequsites.json:

  {
    or: [
        "feature-flag", "cpanel-360Monitoring-prerelease-disabled",
        "feature-flag", "cpanel-360Monitoring-disabled",
    ]
  }

Then in your perl module:

  use Cpanel::Plugins::Components::Rules ();
  my $rules = Cpanel::Plugins::Components::Rules->new(config_file => '~/prerequsites.json' );
  return $rules->is_allowed();

=head1 METHODS

=over

=item * is_allowed -- Allow the campaign if rules are met.

    ARGUMENTS
        $or_phrase (HASHREF|ARRAYREF)
         -- Contains the list of the rules to process

    RETURNS
        1 - When any of the rules returns True.
        0 - When any of the rules returns False.

    ERRORS
        Fails if the is_feature_enabled method fails.

=back

=cut

sub is_allowed ($self) {
    my @config = $self->config->@*;

    my $length       = scalar @config;
    my $start        = 0;
    my $is_key_value = ref $config[0] ? 0 : 1;
    my $inc          = $is_key_value  ? 2 : 1;
    my %processed_rule;
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
        if ( $return && defined $self->{campaign_id} && $self->{campaign_id} ) {

            # filter the processed_rule to get date_range
            require Cpanel::Plugins::Components::Rules::Util::Filter;
            my $new_processed_rule = Cpanel::Plugins::Components::Rules::Util::Filter::find_date_range( \%processed_rule, 'or' );

            # find start_date and update NVData
            require Cpanel::Plugins::Components::Rules::Util::FindStartDate;
            Cpanel::Plugins::Components::Rules::Util::FindStartDate::process_start_date( $self->{campaign_id}, $new_processed_rule );
        }
        return !!1 if $return;    # short-circuit if a rule returns true value.
        $start += $inc;
    }
    return !!0;
}

1;
