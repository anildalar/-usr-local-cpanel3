#                                     Copyright 2024 WebPros International, LLC
#                                                           All rights Reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited
package Cpanel::Plugins::Components::Rules::CompanyId;
use cPstrict;
use Cpanel::License::CompanyID;

use Moo;
extends 'Cpanel::Plugins::Components::Rules::Base';

=head1 MODULE

C<Cpanel::Plugins::Components::Rules::CompanyId>

=head1 DESCRIPTION

Evaluates if the current server is licensed to one of the identified company id's.

This class is used if the campaign config file has 'company-id' listed.

C<Cpanel::Plugins::Components::Rules::CompanyId> provides

=head1 SYNOPSIS

Check if the server is licensed by company id 256:

  use Cpanel::Plugins::Components::Rules::CompanyId;
  my $return = Cpanel::Plugins::Components::Rules::CompanyId->new(256)->is_allowed();

Check if the server is licened to one of a select list of company ids:

  use Cpanel::Plugins::Components::Rules::CompanyId;
  my $return = Cpanel::Plugins::Components::Rules::CompanyId->new([7, 256, 1024, 555])->is_allowed();

When you are using the declaritive JSON syntax:

  {
    "company-id": 256
  }

or

  {
    "company-id": [ 256, 1024, 555 ]
  }

=cut

=head1 METHODS

=over

=item * is_allowed -- Allow the campaign if rules are met.

    RETURNS
        0 - The company_id check failed.
        1 - The company_id check succeeded.

    ERRORS
        Fails if no company ids are passed.
        Fails if unable to fetch the companyId.

=back

=cut

around BUILDARGS => sub {
    my ( $orig, $class, @args ) = @_;

    # ( 1 )
    return { config => [ $args[0] ] }
      if @args == 1 && !ref $args[0];

    # ( [ 1 ] )
    return { config => $args[0] }
      if @args == 1 && ref $args[0];

    # ( config => 1 ) ... ( config => [1] )
    my %args = @args;
    $args{config} = [ $args{config} ] if !ref $args{config};
    return $class->$orig(%args);
};

sub is_allowed ($self) {
    my $company_ids = $self->config;

    # Validate the config passed
    die "You must provide one or more company ids."
      if !defined $company_ids || ref $company_ids ne 'ARRAY';

    foreach my $company_id (@$company_ids) {
        die "$company_id is not a valid company id" if $company_id !~ m/^\d+$/;
    }

    # Run the rule
    my $current_company_id = Cpanel::License::CompanyID::get_company_id();
    foreach my $company_id ( $company_ids->@* ) {
        return !!1 if $company_id == $current_company_id;
    }
    return !!0;
}

1;
