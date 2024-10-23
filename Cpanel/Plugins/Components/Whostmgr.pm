#                                                  Copyright 2024 cPanel, L.L.C.
#                                                           All rights Reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited

package Cpanel::Plugins::Components::Whostmgr;

use cPstrict;

use Moo;

extends 'Cpanel::Plugins::Components::Base';
with 'Cpanel::Plugins::Components::Role::Cpanel::Template';

=head1 MODULE

C<Cpanel::Plugins::Components::Whostmgr>

=head1 DESCRIPTION

C<Cpanel::Plugins::Components::Whostmgr> provides

=head1 SYNOPSIS

  use Moo;
  extend 'Cpanel::Plugins::Components::Whostmgr';

=cut

has '+application' => ( default => 'whostmgr' );

1;

