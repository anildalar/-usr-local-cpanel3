#                                                  Copyright 2024 cPanel, L.L.C.
#                                                           All rights Reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited

package Cpanel::Plugins::Components::Role::CampaignV2;

use cPstrict;
use Moo::Role;

=head1 MODULE

C<Cpanel::Plugins::Components::Role::CampaignV2>

=head1 DESCRIPTION

C<Cpanel::Plugins::Components::Role::CampaignV2> provides tools for handling various kinds of banner education
campaigns.

=head1 SYNOPSIS

  package Blah;
  use strict;
  use warnings;
  use experimental qw(signatures);

  use Moo;

  extends "Cpanel::Plugins::Components::Base";
  with "Cpanel::Plugins::Components::Role::CampaignV2";

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
  say "Renders:" . $component->render({ user => "tom" }, {});

=cut

has 'config_file' => ( is => 'rw', default => undef );

has 'version' => (
    is => 'ro',
    default => sub ($self) {
        return 2;
    }
);

has 'config' => (
    is => 'rw',
    lazy => 1, # have to wait for config_file to be set in a default call.
    isa => sub($config) {
        return if !$config;
        return ref $config eq 'HASH' && defined $config->{version} >= 2;
        die "Configuration format not recognized";
    },
    builder => sub($self) {
        _load_config($self->config_file) || {};
    },
);

has 'sequence' => (
    is => 'rw',
    builder => sub($self) {
        $self->config->{sequence} || [];
    }
);

has 'rules' => (
    is => 'rw',
    builder => sub($self) {
        $self->config->{rules} || [];
    }
);

sub _load_config($config_file) {
    return {} if !$config_file || !-e $config_file;

    require Cpanel::JSON;
    return Cpanel::JSON::LoadFile( $config_file );
}

sub get_image_url($self, $image) {
    require Cpanel::MagicRevision;
    return Cpanel::MagicRevision::calculate_magic_url("images/$image");
}

1;