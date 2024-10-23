package Cpanel::Exception::DomainDoesNotExist;

# cpanel - Cpanel/Exception/DomainDoesNotExist.pm  Copyright 2022 cPanel, L.L.C.
#                                                           All rights reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited

use strict;
use warnings;

use parent qw( Cpanel::Exception );

use Cpanel::LocaleString ();

#Parameters:
#   name
#
sub _default_phrase {
    my ($self) = @_;

    return Cpanel::LocaleString->new(
        'This system does not have a domain named “[_1]”.',
        $self->get('name'),
    );
}

1;

1;
