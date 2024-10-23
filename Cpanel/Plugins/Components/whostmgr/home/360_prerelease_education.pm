
#                                      Copyright 2024 WebPros International, LLC
#                                                           All rights reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited.

package Cpanel::Plugins::Components::whostmgr::home::360_prerelease_education;

use cPstrict;

use constant SECONDS_IN_A_DAY => 60 * 60 * 24;

use Cpanel::MagicRevision             ();
use Whostmgr::API::1::Personalization ();

use Moo;
extends 'Cpanel::Plugins::Components::Whostmgr';
with 'Cpanel::Plugins::Components::Role::CampaignV2';


has '+js_url' => (
    is      => 'ro',
    default => Cpanel::MagicRevision::calculate_magic_url(
        'templates/monitoring-campaigns/sequence/campaign-banner.min.js'
    )
);

has '+template_file' => (
    default => 'monitoring-campaigns/sequence/campaign-banner.tmpl'
);

has 'campaign_id' => (
    is      => 'ro',
    default => 'campaign.360-monitoring.prerelease'
);

has '+css' => (
    is      => 'ro',
    default => 'campaign-banner { margin-bottom: var(--cp-spacer-6); display: block; }',
);

has 'dismissible' => (
    is      => 'ro',
    default => !!1,
);

has 'show_again_in' => (
    is      => 'ro',
    default => 0,      # never
);

has '+config_file' => (
    default => '/var/cpanel/plugins/monitoring-campaigns/360_prerelease_education.json'
);

# This can't be a lazy/default. You're retreiving a value from a store. What if
# the store changes...
sub last_seen_step ($self) {
    my $name = 'last_seen_step';
    my $args = {
        store => $self->campaign_id,
        names => [$name],
    };

    require Whostmgr::API::1::Personalization;
    my $response = Whostmgr::API::1::Personalization::personalization_get( $args, {} );
    return $response->{personalization}{$name}{value};
}

sub last_closed_step ($self) {
    my $name = 'last_closed_step';
    my $args = {
        store => $self->campaign_id,
        names => [$name],
    };

    require Whostmgr::API::1::Personalization;
    my $response = Whostmgr::API::1::Personalization::personalization_get( $args, {} );
    return $response->{personalization}{$name}{value};
}

sub update_last_seen_step ( $self, $value ) {
    my $name = 'last_seen_step';
    my $args = {
        store           => $self->campaign_id,
        personalization => { $name, $value },
    };

    my $response = Whostmgr::API::1::Personalization::personalization_set( $args, {} );
    return $response->{personalization}{$name}{success};
}

sub find_start_date ($self) {
    require Cpanel::Plugins::Components::Rules::Util::NVData;
    return Cpanel::Plugins::Components::Rules::Util::NVData::get_nv_data( $self->campaign_id, 'start_date' );
}

sub step_count ($self) {
    return scalar $self->sequence()->@*;
}

sub get_step ($self) {

    my $start_date = $self->find_start_date();
    require Cpanel::Plugins::Components::Campaign::DurationSequence;
    my $step = Cpanel::Plugins::Components::Campaign::DurationSequence::get_step( $self, $start_date );

    return if !$step || $step <= 0 || $step > $self->step_count;

    $self->update_last_seen_step($step);

    return $self->sequence()->[ $step - 1 ];
}

around render => sub ( $orig, $self, $args, $opts ) {
    my $step = $self->get_step();
    return if !$step;

    # Prepare the step details for rendering
    $args = {
        $args->%*,
        step          => $step,
        image_url     => $self->get_image_url( $step->{cta}{image_url} ),
        campaign_id   => $self->campaign_id,
        dismissible   => $self->dismissible,
        show_again_in => $self->show_again_in,
    };

    # Render the component
    return $self->$orig( $args, $opts );
};

has "+slot" => ( default => 'menu-top' );

has "+priority" => ( default => 1 );

has "+is_enabled" => (
    default => sub ($self) {
        require Cpanel::Plugins::Components::Rules;
        my $rules_obj = Cpanel::Plugins::Components::Rules->new( config => $self->config->{rules}, campaign_id => $self->campaign_id );
        return $rules_obj->is_allowed;
    }
);

1;
