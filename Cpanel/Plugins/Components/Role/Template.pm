#                                                  Copyright 2024 cPanel, L.L.C.
#                                                           All rights Reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited

package Cpanel::Plugins::Components::Role::Template;

use cPstrict;
use Moo::Role;

=head1 MODULE

C<Cpanel::Plugins::Components::Role::Template>

=head1 DESCRIPTION

C<Cpanel::Plugins::Components::Role::Template> provides tools for processing very basic Template Toolkit files. If you need any Cpanel
custom plugins or path mapping, please use Cpanel::Plugins::Components::Role::Cpanel::Template instead.

=head1 SYNOPSIS

  package Blah;

  use Moo;

  extends 'Cpanel::Plugins::Components::Base';
  with 'Cpanel::Plugins::Components::Role::Template';

  has "+markup" => (
    default => "<div>[% user %]</div>"
  );

  has "+process" => (
    default => 1
  );

  1;

  package main;

  use Blah;

  print Blah->render({ user => 'tom' });

=cut

# optional, named slot on the page.
has 'process' => (
    is      => 'ro',
    default => sub { 0 },    # defaults to not tt processed
);

my $_template;

sub get_template ( $self, $options ) {
    if ( !$_template ) {
        require Template;
        $_template = Template->new($options);
    }
    return $_template;
}

sub render ( $self, $args, $options ) {
    if ( $self->process ) {
        my $output;
        $self->get_template($options)->process( \$self->markup, $args, \$output );
        return $output;
    }
    else {
        return $self->markup;
    }
}

1;
