# cpanel - Cpanel/TaskQueue/FastSpawnOverRides.pm
#                                      Copyright 2024 WebPros International, LLC
#                                                           All rights reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited.

package Cpanel::TaskQueue::FastSpawnOverRides;

use strict;
use warnings;
use parent qw(
  Cpanel::TaskQueue::StandardOverRides
  Cpanel::TaskQueue::FastSpawn
);

1;

__END__

=head1  NAME

Cpanel::TaskQueue::FastSpawnOverRides

=head1 DESCRIPTION

Subclass of L<Cpanel::TaskQueue::StandardOverRides> and L<Cpanel::TaskQueue::FastSpawn>

Provides for a standard C<overrides> method to avoid duplicates.

=cut
