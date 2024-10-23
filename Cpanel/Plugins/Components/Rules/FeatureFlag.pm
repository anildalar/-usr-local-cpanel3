#                                     Copyright 2024 WebPros International, LLC
#                                                           All rights Reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited
package Cpanel::Plugins::Components::Rules::FeatureFlag;
use cPstrict;

use Cpanel::FeatureFlags;

use Moo;
extends 'Cpanel::Plugins::Components::Rules::Base';

=head1 MODULE

C<Cpanel::Plugins::Components::Rules::FeatureFlag>

=head1 DESCRIPTION

This class gets implemented when the campaign config file has 'feature-flag' listed.

The parent class Cpanel::Plugins::Components::Rules implements is_allowed method.

C<Cpanel::Plugins::Components::Rules::FeatureFlag> provides

=head1 SYNOPSIS

Using perl code:

  use Cpanel::Plugins::Components::Rules::FeatureFlag;
  my $return = Cpanel::Plugins::Components::Rules::FeatureFlag->new('cpanel-monitoring-plugin.enabled')->is_allowed();

Using the declaritive syntax:

  [
    "feature-flag": "cpanel-monitoring-plugin.enabled"
  ]

=cut

around BUILDARGS => sub {
    my ( $orig, $class, @args ) = @_;

    return { config => $args[0] }
      if @args == 1 && !ref $args[0];

    return $class->$orig(@args);
};

=head1 METHODS

=over

=item * is_allowed -- Allow the campaign if rules are met.

    Check if the campaign should run based on the presense of one specific cPanel feature flag.

    RETURNS
        0 - The feature_flag not present.
        1 - The feature_flag present.

    ERRORS
        Fails if the is_feature_enabled method fails.

=back

=cut

sub is_allowed ($self) {
    my $feature_flag = $self->config();

    return !!1 if !$feature_flag;
    return Cpanel::FeatureFlags::is_feature_enabled($feature_flag) ? !!1 : !!0;
}

1;
