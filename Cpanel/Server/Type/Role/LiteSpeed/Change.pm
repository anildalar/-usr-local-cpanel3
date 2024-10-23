package Cpanel::Server::Type::Role::LiteSpeed::Change;

#                                      Copyright 2024 WebPros International, LLC
#                                                           All rights reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited.

=encoding utf-8

=head1 NAME

Cpanel::Server::Type::Role::LiteSpeed::Change - Enable and disable logic for LiteSpeed role.

=head1 SYNOPSIS

    use Cpanel::Server::Type::Role::LiteSpeed::Change;

    my $role = Cpanel::Server::Type::Role::LiteSpeed::Change->new();
    $role->enable();
    $role->disable();

=head1 DESCRIPTION

Subclass of C<Cpanel::Server::Type::Role::Change> that controls LiteSpeed features.

=head1 SUBROUTINES

=cut

use cPstrict;

use Cpanel::Server::Type::Role::LiteSpeed ();

use parent qw(
  Cpanel::Server::Type::Role::TouchFileRole::Change
);

BEGIN {
    *_NAME      = *Cpanel::Server::Type::Role::LiteSpeed::_NAME;
    *_TOUCHFILE = *Cpanel::Server::Type::Role::LiteSpeed::_TOUCHFILE;
}

sub _enable {

    # nothing special to do
    return;
}

sub _disable {

    # nothing special to do
    return;
}

1;
