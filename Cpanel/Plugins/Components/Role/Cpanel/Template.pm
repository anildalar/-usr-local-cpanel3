#                                                  Copyright 2024 cPanel, L.L.C.
#                                                           All rights Reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited

package Cpanel::Plugins::Components::Role::Cpanel::Template;

use cPstrict;
use Moo::Role;

=head1 MODULE

C<Cpanel::Plugins::Components::Role::Cpanel::Template>

=head1 DESCRIPTION

C<Cpanel::Plugins::Components::Role::Cpanel::Template> provides tools for processing complex Template Toolkit files. If you dont need any Cpanel
custom plugins or path mapping, please use Cpanel::Plugins::Components::Role::Template instead.

=head1 SYNOPSIS

  package Blah;

  use Moo;

  extends 'Cpanel::Plugins::Components::Base';
  with 'Cpanel::Plugins::Components::Role::Cpanel::Template';

  has "+template" => (
    default => "blah.tt"
  );

  1;

  package main;

  use Blah;

  print Blah->render({ user => 'tom' });

=head1 FUNCTIONS

=cut

# the appname that the component is used in cpanel|whostmgr|webmail
has 'application' => (
    is      => 'rw',
    default => 'cpanel'
);

# the template name to process
has 'template_file' => (
    is      => 'rw',
    default => sub {
        die "You must override the template_file property";
    }
);

sub render ( $self, $args, $options ) {
    my $template_file;
    if ( $template_file = $self->template_file ) {
        my $appname = $self->application;
        require Cpanel::Template;
        my ( $status, $output ) = Cpanel::Template::process_template(
            $appname,
            {
                'print'         => 0,
                'template_file' => $template_file,
                ( $args && ref $args eq 'HASH' ? ( $args->%* ) : () ),
            },
        );

        if ( !$status ) {
            print STDERR "template failed to process : $output \n";
            return;
        }
        return $$output;
    }

    return $self->markup;
}

sub has_markup( $self ){
    return !! $self->template_file;
}

1;
