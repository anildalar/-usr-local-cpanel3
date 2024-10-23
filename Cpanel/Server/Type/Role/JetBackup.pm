package Cpanel::Server::Type::Role::JetBackup;

#                                      Copyright 2024 WebPros International, LLC
#                                                           All rights reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited.

=encoding utf-8

=head1 NAME

Cpanel::Server::Type::Role::JetBackup - JetBackup role for server profiles

=head1 SYNOPSIS

    use Cpanel::Server::Type::Role::JetBackup;

    my $role = Cpanel::Server::Type::Role::JetBackup->new();
    my $is_enabled = $role->is_enabled();

=head1 DESCRIPTION

Subclass of C<Cpanel::Server::Type::Role> that controls JetBackup feature.

=head1 SUBROUTINES

=cut

use cPstrict;

use parent qw(
  Cpanel::Server::Type::Role::TouchFileRole
);

our $TOUCHFILE = $Cpanel::Server::Type::Role::TouchFileRole::ROLES_TOUCHFILE_BASE_PATH . "/jetbackup";

sub _NAME {
    require 'Cpanel/LocaleString.pm';    ## no critic qw(Bareword) - hide from perlpkg
    state $NAME = Cpanel::LocaleString->new("JetBackup");
    return $NAME;
}

sub _DESCRIPTION {
    require 'Cpanel/LocaleString.pm';    ## no critic qw(Bareword) - hide from perlpkg
    state $DESCRIPTION = Cpanel::LocaleString->new("JetBackup Powerful Cross Platform Backup and Recovery Solution.");
    return $DESCRIPTION;
}

sub _TOUCHFILE { return $TOUCHFILE; }

1;
