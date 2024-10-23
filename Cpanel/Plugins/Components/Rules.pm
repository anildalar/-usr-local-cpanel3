#                                     Copyright 2024 WebPros International, LLC
#                                                           All rights Reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited

package Cpanel::Plugins::Components::Rules;
use cPstrict;

use Cpanel::Plugins::Components::Rules::And             ();
use Cpanel::Plugins::Components::Rules::Util::Normalize ();

use Moo;
use Cpanel::Imports;

=head1 MODULE

C<Cpanel::Plugins::Components::Rules>

=head1 DESCRIPTION

C<Cpanel::Plugins::Components::Rules> is the utility class to run the rules either from JSON or
by passing in a perl reference to the rule.

The rules can be applied for any components using a JSON file.

All the rules must be satisfied if specified to decide when to render the component or campign.

Place any additional rules in the following folder:

- Add a new field in /var/cpanel/plugins/{plugin_name}/campaigns/{component_name}.json

- The new field should have a two part name with hyphen-separated.

  For ex : version-check

- The new class should have two part name with hyphen removed and ucfirst on both the parts.

  For ex: ./Cpanel/Plugins/Components/Rules/VersionCheck.pm

=head1 SYNOPSIS

A minimal implementation to add new rule say For ex: 'version-check' is:

- Create a class for new rule Cpanel/Plugins/Components/Rules/VersionCheck.pm

- Implement a is_allowed method in version_check.pm

    package Cpanel::Plugins::Components::Rules::VersionCheck;
    use Moo;
    extends 'Cpanel::Plugins::Components::Rules::Base';

    sub is_allowed($self){
        my $version_ar = $self->config();
        die if !$version_ar || ref $version_ar ne 'ARRAY';
        my $current_version = get_cp_version();
        return !!1 if grep { $_ eq $current_version } @$version_ar;
        return !!0;
    }

- Optionally, if you want the rule to accept a simplified argument to new:

    around BUILDARGS => sub {
        my ( $orig, $class, @args ) = @_;

        return { config => $args[0] }
        if @args == 1 && !ref $args[0];

        return $class->$orig(@args);
    };

Normally you would have to pass:

    Cpanel::Plugins::Components::Rules::VersionCheck->new(config => '11.124');

But with the above adjustment you can now call the rule as:

    Cpanel::Plugins::Components::Rules::VersionCheck->new('11.124');

- The example code to execute this module is given below.

    use Cpanel::Plugins::Components::Rules;
    my $rules_obj = Cpanel::Plugins::Components::Rules->new('config_file'=> '/var/cpanel/plugins/{plugin_name}/campaigns/{component_name}.json');
    $rules_obj->is_allowed();

- This can get executed with out json file as well by just providing a array of hash like below.

    my $campaign = [
        "date-range" : {
            "start_date" : "05-10-2024",
            "end_date"   : "08-15-2024"
        },
        "company-id" : [
            7,
            256
        ],
        "version-check": "11.24"
    ];

    use Cpanel::Plugins::Components::Rules;
    my $rules_obj = Cpanel::Plugins::Components::Rules->new('config' => $campaign);
    return $rules_obj->is_allowed();

=cut

sub BUILD {
    my ( $self, $args ) = @_;
    die "You must provide either a config_file or a config in the constructor"
      if !defined $args->{config_file} & !defined $args->{config};

    die "When providing a config, it must be either a HASHREF or ARRAYREF"
      if defined $args->{config}
      && !( ref $args->{config} eq 'HASH' || ref $args->{config} eq 'ARRAY' );

    $self->{config}      = $self->load_config($args) if $args->{config_file};
    $self->{config}      = $args->{config}           if $args->{config};
    $self->{campaign_id} = $args->{campaign_id}      if $args->{campaign_id};
}

sub is_allowed ($self) {
    my $results = Cpanel::Plugins::Components::Rules::Base->new( config => $self->{config}, campaign_id => $self->{campaign_id} )->process_rule( $self->{config}, "" );
    return $results;
}

sub load_config ( $self, $args ) {
    require Cpanel::JSON;
    return Cpanel::JSON::LoadFile( $args->{config_file} );
}

1;
