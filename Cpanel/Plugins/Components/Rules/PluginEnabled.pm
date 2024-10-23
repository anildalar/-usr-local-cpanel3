package Cpanel::Plugins::Components::Rules::PluginEnabled;
use cPstrict;

use Cpanel::Plugins::State ();

use Moo;
extends 'Cpanel::Plugins::Components::Rules::Base';

=head1 MODULE

C<Cpanel::Plugins::Components::Rules::PluginEnabled>

=head1 DESCRIPTION

Use this rule to test if a specific plugin or list of plugins are enabled.

Defaults to false.

=head1 SYNOPSIS

Using perl code:

  use Cpanel::Plugins::Components::Rules::PluginEnabled;
  my $return = Cpanel::Plugins::Components::Rules::PluginEnabled->new(
    'cpanel.360-monitoring.plugin'
  )->is_allowed();

Using the declaritive syntax:

  [
    "plugin-enabled": "cpanel.360-monitoring.plugin"
  ]

=cut

around BUILDARGS => sub {
    my ( $orig, $class, @args ) = @_;

    # Check if its a string
    return { config => [ $args[0] ] }
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
    my $id         = $self->config();
    my $is_enabled = Cpanel::Plugins::State::is_enabled($id);
    if ( $is_enabled eq '?' ) {

        # Assume 1, but it may not be true
        return !!1;
    }
    return $is_enabled;
}

1;
