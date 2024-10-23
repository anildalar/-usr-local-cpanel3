#                                     Copyright 2024 WebPros International, LLC
#                                                           All rights Reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited
package Cpanel::Plugins::Components::Rules::Util::Normalize;

use cPstrict;
use Cpanel::Imports;

sub normalize ($config) {
    if ( !$config ) {
        logger->warn("The campaign data is not valid and rules will not be processed.");
        return;
    }
    elsif ( ref $config eq 'HASH' ) {

        # Converts hash data ref in to sorted array ref.
        my %hash = $config->%*;
        $config = [ %hash{ sort keys %hash } ];
        return $config;
    }
    elsif ( ref $config eq 'ARRAY' ) {

        # Dig one level deeper and fix things up there.
        # This has side effect on things like DateRange that exected a hashref
        # but now gets an arrayref of key/value pairs.
        normalize_children($config);

        return $config;
    }

    return $config;
}

sub normalize_children ($config) {
    if ( ref $config eq 'ARRAY' ) {
        my $length = scalar @$config;
        my $start  = 0;
        while ( $start < $length ) {
            if ( ref $config->[$start] eq 'HASH' ) {
                my %h = $config->[$start]->%*;
                $config->[$start] = [ %h{ sort keys %h } ];
            }
            $start++;
        }
    }
}

1;
