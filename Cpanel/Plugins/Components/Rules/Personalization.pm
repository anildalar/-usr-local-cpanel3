package Cpanel::Plugins::Components::Rules::Personalization;
use cPstrict;

use Moo;
extends 'Cpanel::Plugins::Components::Rules::Base';

=head1 MODULE

C<Cpanel::Plugins::Components::Rules::Personalization>

=head1 DESCRIPTION

Use this rule to test if a specific personalization setting is true or false.

If not set, defaults to false.

=head1 SYNOPSIS

Using perl code:

  use Cpanel::Plugins::Components::Rules::Personalization;
  my $return = Cpanel::Plugins::Components::Rules::Personalization->new(
    store => "cpanel.360-monitoring.plugin",
    name => "homepage-app-enabled",
    app => "whostmgr",
    operator => "boolean",
    default => !!1,
  )->is_allowed();

Using the declaritive syntax:

  [
    "personalization": {
        "store": "cpanel.360-monitoring.plugin",
        "name": homepage-app-enabled",
        "app": "whostmgr",
        "operator": "boolean",
        "default": false
    }
  ]

=cut

around BUILDARGS => sub {
    my ( $orig, $class, @args ) = @_;

    return { config => $args[0] }
      if @args == 1 && ref $args[0] eq 'HASH';

    return $class->$orig(@args);
};

=head1 METHODS

=over

=item * is_allowed -- Allow the campaign if rules are met.

    Check if the campaign should run based on the presense of one specific cPanel feature flag.

    RETURNS
        0 - The personalization flag is present and enabled.
        1 - The personalization flag is not present or disabled.

=back

=cut

sub is_allowed ($self) {
    my $config   = $self->config();
    my $store    = delete $config->{store}    || '';
    my $app      = delete $config->{app}      || 'whostmgr';
    my $operator = delete $config->{operator} || 'boolean';

    if ( $app eq 'whostmgr' ) {
        my ( $args, $metadata ) = ( {}, {} );
        $args->{store} = $store;
        $args->{names} = [ $config->{name} ];

        require Whostmgr::API::1::Personalization;
        my $response = Whostmgr::API::1::Personalization::personalization_get( $args, $metadata );
        my $value    = $response->{personalization}{ $config->{name} }{value};

        if ( $operator eq 'boolean' ) {
            return $self->to_boolean($value);
        }
        else {
            require Cpanel::Exception;
            die Cpanel::Exception::create( 'InvalidParameter', 'Invalid operator passed: [_1]', [$operator] );
        }

        # TODO: There could be other operators we support later like:
        # * exists
        # * defined
        # * undefined
        # * >, >=, <, <=, == fixed value
    }

    # TODO: add cpanel/webmail support
    require Cpanel::Exception;
    die Cpanel::Exception::create( 'InvalidParameter', 'Invalid app passed: [_1]', [$app] );
}

sub to_boolean ( $self, $value ) {
    if ( !defined $value ) {
        return $self->config->{default} || !!0;
    }
    return $value ? !!1 : !!0;
}

1;
