#                                                  Copyright 2024 cPanel, L.L.C.
#                                                           All rights Reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited

package Cpanel::Plugins::Components::Role::CampaignV1;

use cPstrict;
use Moo::Role;

=head1 MODULE

C<Cpanel::Plugins::Components::Role::CampaignV1>

=head1 DESCRIPTION

C<Cpanel::Plugins::Components::Role::CampaignV1> provides tools for handling various kinds of banner education
campaigns.

=head1 SYNOPSIS

  package Blah;
  use strict;
  use warnings;
  use experimental qw(signatures);

  use Moo;

  extends 'Cpanel::Plugins::Components::Base';
  with 'Cpanel::Plugins::Components::Role::CampaignV1';

  around render => sub ( $orig, $self, $args, $opts ) {
    # do stuff
    # customize the args, etc.
    return $self->$orig( $args, $opts );
  };

  1;

  package main;
  use strict;
  use warnings;
  use experimental qw(signatures);
  use feature qw(say);

  use Blah;
  my $component = Blah->new();
  say "Version: " . $component->version;
  say $component->render({ user => 'tom' });

=cut

has 'config_file' => (
    is => 'rw',
    default => undef,
);

has 'version' => (
    is => 'ro',
    default => sub ($self) {
        return 1;
    },
);

1;
