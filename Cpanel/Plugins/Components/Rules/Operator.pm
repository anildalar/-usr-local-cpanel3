#                                     Copyright 2024 WebPros International, LLC
#                                                           All rights Reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited
package Cpanel::Plugins::Components::Rules::Operator;

use cPstrict;

use Cpanel::Plugins::Components::Rules::Util::Normalize ();
use Moo;
extends 'Cpanel::Plugins::Components::Rules::Base';

around BUILDARGS => sub {
    my ( $orig, $class, @args ) = @_;

    return { config => Cpanel::Plugins::Components::Rules::Util::Normalize::normalize( $args[0] ) }
      if @args == 1 && ref $args[0];

    my %args = @args;
    $args{config} = Cpanel::Plugins::Components::Rules::Util::Normalize::normalize( $args{config} );
    return $class->$orig(%args);
};

1;
