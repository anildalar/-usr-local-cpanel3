
#                                      Copyright 2024 WebPros International, LLC
#                                                           All rights reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited.

package Cpanel::Plugins::Components::whostmgr::home::360_homebanner;

use cPstrict;

use constant SECONDS_IN_A_DAY => 60 * 60 * 24;

use Moo;
use Cpanel::MagicRevision ();
extends 'Cpanel::Plugins::Components::Whostmgr';
with    'Cpanel::Plugins::Components::Role::CampaignV1';

our $campaign_config_file = '/var/cpanel/plugins/monitoring-campaigns/360_homebanner.json';
our $bundle_file          = 'templates/monitoring-campaigns/company7-first/campaign-banner-360.min.js';

# the imageurl which we need to render
has 'image_url' => (
    is      => 'rw',
    default => Cpanel::MagicRevision::calculate_magic_url('images/360_monitoring.svg'),
);

has '+js_url' => (
    is      => 'ro',
    default => Cpanel::MagicRevision::calculate_magic_url($bundle_file),
);

has '+template_file' => (
    default => 'monitoring-campaigns/company7-first/banner.tmpl',
);

has 'campaign_id' => (
    is      => 'ro',
    default => 'campaign.360-monitoring.5.23.24',
);

has 'dismissable' => (
    is      => 'ro',
    default => 1,
);

has 'show_again_in' => (
    is      => 'ro',
    default => 30 * SECONDS_IN_A_DAY,    # 30 days
);

has '+config_file' => (
    default => $campaign_config_file,
);

around render => sub ( $orig, $self, $args, $opts ) {
    $args = {
        $args->%*,
        image_url     => $self->image_url,
        campaign_id   => $self->campaign_id,
        dismissable   => $self->dismissable,
        show_again_in => $self->show_again_in,
    };
    return $self->$orig( $args, $opts );
};

has "+slot" => ( default => 'menu-top' );

has "+priority" => ( default => 0 );

has "+is_enabled" => (
    default => sub ($self) {
        require Cpanel::Plugins::Components::Rules;
        my $rules_obj = Cpanel::Plugins::Components::Rules->new( config_file => $self->config_file );
        return $rules_obj->is_allowed;
    }
);

1;
