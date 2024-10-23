#                                     Copyright 2024 WebPros International, LLC
#                                                           All rights Reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited
package Cpanel::Plugins::Components::Rules::Not;

use cPstrict;

use Moo;
extends 'Cpanel::Plugins::Components::Rules::Operator';

=head1 MODULE

C<Cpanel::Plugins::Components::Rules::Not>

=head1 DESCRIPTION

This rule inverts the rules passed to it.

The rule works like a boolean 'NOT' operator and returns 'false' when the underlying condition evalutes to 'true'.

=head1 SYNOPSIS

When there is just a simple rule to check:

  use Cpanel::Plugins::Components::Rules::Not;
  my $feature_check = {
    'feature-flag' => 'cpanel-360Monitoring-prerelease-disabled',
  };
  return 1 if Cpanel::Plugins::Components::Rules::Not->new($feature_check)->is_allowed();

When there is a complex rule to check:

  use Cpanel::Plugins::Components::Rules::Not;
  my $and_rules_to_invert = [
    'feature-flag' => 'cpanel-360Monitoring-prerelease-disabled',
    'feature-flag' => 'cpanel-360Monitoring-disabled',
    'date-range'   => {
        'start-date' => '01/01/2025',
        'end-date'   => '01/10/2025'
    },
  ];
  return 1 if Cpanel::Plugins::Components::Rules::Not->new($and_rules_to_invert)->is_allowed();

When the rules are defined in JSON:

  "not": {
      "feature-flag"; "cpanel-360Monitoring-prerelease-disabled",
  }

or using JSON file ~/prerequsites.json:

  {
    "not": [
        "feature-flag", "cpanel-360Monitoring-prerelease-disabled",
        "feature-flag", "cpanel-360Monitoring-disabled",
        "date-range", {
            "start-date" => "01/01/2025",
            "end-date"   => "01/10/2025"
        },
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
        $data_ref (hash_reference)
         -- Contains the list of the rules and its data.

    RETURNS
        0 - When any of the rules returns True.
        1 - When any of the rules returns False.

    ERRORS
        Fails if any of the nested rules fail.

=back

=cut

sub is_allowed ($self) {
    my @operands = $self->config->@*;

    my $got;
    my %processed_rule;
    if ( @operands == 2 && !ref $operands[0] ) {
        $got            = $self->process_rule(@operands);
        %processed_rule = @operands if !$got;
    }
    else {
        $got            = $self->process_rule( 'or', \@operands );
        %processed_rule = @operands if !$got;
    }
    my $status      = $got ? !!0 : !!1;             # invert
    my $campaign_id = $self->{campaign_id} // '';

    # And/Or would have added start_date in nvdata for success.
    # Since Not is an invert , we should cleanup start_date on 0.
    if ( !$status && $campaign_id ) {
        require Cpanel::Plugins::Components::Rules::Util::NVData;
        if ( Cpanel::Plugins::Components::Rules::Util::NVData::get_nv_data( $campaign_id, 'start_date' ) ) {
            Cpanel::Plugins::Components::Rules::Util::NVData::set_nv_data( $campaign_id, 'start_date', '' );
        }

    }
    return $status;
}

1;
