# cpanel - Cpanel/TaskQueue/StandardOverRides.pm
#                                      Copyright 2024 WebPros International, LLC
#                                                           All rights reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited.

package Cpanel::TaskQueue::StandardOverRides;

use strict;
use warnings;
use parent 'Cpanel::TaskQueue::ChildProcessor';

*overrides = __PACKAGE__->can('is_dupe');

1;

__END__

=head1  NAME

Cpanel::TaskQueue::StandardOverRides

=head1 DESCRIPTION

Subclass of L<Cpanel::TaskQueue::ChildProcessor>.

Provides for a standard C<overrides> method to avoid duplicates.

=cut
