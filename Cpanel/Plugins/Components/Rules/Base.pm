#                                     Copyright 2024 WebPros International, LLC
#                                                           All rights Reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited
package Cpanel::Plugins::Components::Rules::Base;

use cPstrict;

use Cpanel::Plugins::Components::Rules::Util::Normalize ();
use Cpanel::Imports;
use Moo;

around BUILDARGS => sub {
    my ( $orig, $class, @args ) = @_;

    return { config => $args[0] }
      if @args == 1 && ref $args[0];

    return $class->$orig(@args);
};

has config => (
    is       => 'ro',
    required => 1,
);

has campaign_id => (
    is       => 'ro',
);

sub normalize ( $self, $config ) {
    return Cpanel::Plugins::Components::Rules::Util::Normalize::normalize($config);
}

sub get_module_name ($rule) {
    my $class = 'Cpanel::Plugins::Components::Rules::';

    my $module = $class . join "", map { ucfirst() } ( split /-/, $rule );
    return $module;
}

sub process_rule ( $self, $rule_name, $rule_arg ) {

    # { ... } [ ... ]
    if ( ( ref $rule_name ) =~ /^HASH|ARRAY$/ ) {
        $rule_arg  = $rule_name;
        $rule_name = "and";
    }

    my $module = get_module_name($rule_name);
    return if !$self->load_module( $module, $rule_name );

    my @args = ( config => $rule_arg );
    push @args, campaign_id => $self->{campaign_id} if defined $self->{campaign_id};
    my $rule    = $module->new( @args );
    my $results = $rule->is_allowed();
    return $results;
}

sub load_module ( $self, $module, $rule ) {
    eval "require $module;";    ## no critic qw(BuiltinFunctions::ProhibitStringyEval)
    if ( my $exception = $@ ) {
        logger()->warn("Could not locate the rule module '$module' for rule '$rule'. Maybe its not installed.");
        return 0;
    }
    return 1;
}

1;
