package Cpanel::Server::Type::Role::JetBackup::Change;

#                                      Copyright 2024 WebPros International, LLC
#                                                           All rights reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited.

=encoding utf-8

=head1 NAME

Cpanel::Server::Type::Role::JetBackup::Change - Enable and disable logic for JetBackup role.

=head1 SYNOPSIS

    use Cpanel::Server::Type::Role::JetBackup::Change;

    my $role = Cpanel::Server::Type::Role::JetBackup::Change->new();
    $role->enable();
    $role->disable();

=head1 DESCRIPTION

Subclass of C<Cpanel::Server::Type::Role::Change> that controls JetBackup features.

=head1 SUBROUTINES

=cut

use cPstrict;

use Cpanel::Server::Type::Role::JetBackup ();

use parent qw(
  Cpanel::Server::Type::Role::TouchFileRole::Change
);

BEGIN {
    *_NAME      = *Cpanel::Server::Type::Role::JetBackup::_NAME;
    *_TOUCHFILE = *Cpanel::Server::Type::Role::JetBackup::_TOUCHFILE;
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
