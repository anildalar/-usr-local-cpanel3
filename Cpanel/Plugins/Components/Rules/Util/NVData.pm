#                                     Copyright 2024 WebPros International, LLC
#                                                           All rights Reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited
package Cpanel::Plugins::Components::Rules::Util::NVData;

use cPstrict;
use Cpanel::Imports;
use Whostmgr::API::1::Personalization;

=head1 MODULE

C<Cpanel::Plugins::Components::Rules::Util::NVData>

=head1 DESCRIPTION

C<Cpanel::Plugins::Components::Rules::Util::NVData> is the utility class to use the API wrapper to set and get NVData.

=cut

=head1 METHODS

=over

=item * set_nv_data -- Sets NVData for the provided key/value pair.

    This method sets NVData for whm and it is stored in /var/cpanel/whm/nvdata.

    ARGUMENTS
        $store (string) -- The name of the file used to store NVData.
        $key   (string) -- The name of the field that is set.
        $value (string) -- The value for the key that is set.

    RETURNS
        1 if it is successfully set.
        0 if it error's out.

    ERRORS
        All failures are fatal.

    EXAMPLE
        my $status = Cpanel::Plugins::Components::Rules::Util::NVData::set_nv_data ( $campaign_id, $start_date , '10/24/2024');

=back

=cut

sub set_nv_data ( $store, $key, $value ) {
    my ( $args, $metadata ) = ( {}, {} );
    $args->{store} = $store,
      $args->{personalization} = {
        $key => $value,
      };
    my $response = Whostmgr::API::1::Personalization::personalization_set( $args, $metadata );

    return $response->{personalization}{$key}{success};
}

=head1 METHODS

=over

=item * get_nv_data -- Fetches NVData value for the provided key and store.

    ARGUMENTS
        $store (string) -- The name of the file used to store NVData.
        $name  (string) -- The name of the field.

    RETURNS
        $value (string) -- The value of the requested field.

    ERRORS
        All failures are fatal.

    EXAMPLE
        my $start_date = Cpanel::Plugins::Components::Rules::Util::NVData::get_nv_data ( $campaign_id, 'start_date' );

=back

=cut

sub get_nv_data ( $store, $name ) {
    my ( $args, $metadata ) = ( {}, {} );
    $args->{store} = $store;
    $args->{names} = [$name];
    my $response = Whostmgr::API::1::Personalization::personalization_get( $args, $metadata );

    return $response->{personalization}{$name}{value};
}

1;
