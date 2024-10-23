# cpanel - plugins/shared/components/perl/usr/local/cpanel/Cpanel/Plugins/State.pm             Copyright 2024 cPanel, L.L.C.
#                                                           All rights Reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited

package Cpanel::Plugins::State;

use cPstrict;
use Cpanel::FeatureFlags ();

=head1 MODULE

C<Cpanel::Plugins::State>

=head1 DESCRIPTION

C<Cpanel::Plugins::State> provides plugin state registration helpers. Use these functions to
check and set the install state of the plugin and the enabled/disable state of the plugin.

These are meant to be quick checks that require low system resources to perform the check.

=head2 DEV NOTES

There were several options considered where to store this state data. These include:

=head3 Feature Flags

This is the option selected for now. Checking for the plugin being installed by looking for
a touch file that the installer drops allows us to avoid looking in into the package installer
system which can be very expensive to load. Feature flags are already backed up and restored
at the server level.

The disadvantage is if the package is uninstalled in a weird way that the postinst scriptlet is
skipped, will result in incorrect responses from this query.

=head3 cpanel.config

Checking for the plugin being installed by looking for in the config could be fast since the
config is already loaded. But adding stuff here can be quite a bit more complex. Its still an
option, just not the first option. The cpanel.config is already backed up and restored
at the server level.

=head3 a custom file

This could be more flexible for storage internal formats, but would require backup and restore
changes.

=head2 KNOWN ISSUES

The is_enabled can not return a defenitive answer for plugins that whitelist or blacklist company
ids in their SaaS backends. We don't yet have a standard api to call on all plugins to fetch the
enabled/disabled status for the plugin for a specific company id. We eventually need all plugins
to expose a simple REST API where we can ask if the plugin is enabled/disabled this way.

Presently this method will return "?" if the server does not explicity enable or disable the
plugin locally.

=head1 SYNOPSIS

During plugin install:

  use Cpanel::Plugins::State ();
  Cpanel::Plugins::State::install("cpanel-helloworld-plugin");

When a customer wants to explicitly override a rule for the company and
enable the plugin on this server.

  use Cpanel::Plugins::State ();
  Cpanel::Plugins::State::enable("cpanel-helloworld-plugin");

When a program need to check if the plugin is installed:

  use Cpanel::Plugins::State ();
  if (Cpanel::Plugins::State::is_installed("cpanel-helloworld-plugin")) {
    say "Plugin is installed";
  }

When a program need to check if the plugin is enabled on a server:

  use Cpanel::Plugins::State ();
  if (Cpanel::Plugins::State::is_enabled("cpanel-helloworld-plugin")) {
    say "Plugin is enabled on the current server";
  }

When a customer wants to explicitly override a rule for the company and
disable the plugin on this server.

  use Cpanel::Plugins::State ();
  Cpanel::Plugins::State::disable("cpanel-helloworld-plugin");

During plugin uninstall:

  use Cpanel::Plugins::State ();
  Cpanel::Plugins::State::uninstall("cpanel-helloworld-plugin");

=head1 FUNCTIONS

=head2 _get_install_id($id)

Return the unique id for the installer flag.

=cut

sub _get_install_id ($id) {
    return $id . ".installed";
}

=head2 install($id)

Setup the installed flag for a plugin.

=cut

sub install ($id) {
    return Cpanel::FeatureFlags::enable( _get_install_id($id) );
}

=head2 uninstall($id)

Remove the installed flag for a plugin.

=cut

sub uninstall ($id) {
    return Cpanel::FeatureFlags::disable( _get_install_id($id) );
}

=head2 is_installed($id)

Check if the plugin is installed by looking for its side effect.

=cut

sub is_installed ($id) {
    my $is_installed = Cpanel::FeatureFlags::is_feature_enabled( _get_install_id($id) ) ? !!1 : !!0;
}

=head2 _get_explicitly_enabled_id($id)

Get the uniqe id for the explicitly enabled flag

=cut

sub _get_explicitly_enabled_id ($id) {
    return $id . ".enabled";
}

=head2 _get_explicitly_disabed_id($id)

Get the uniqe id for the explicitly disabled flag

=cut

sub _get_explicitly_disabled_id ($id) {
    return $id . ".disabled";
}

=head2 enable($id)

Explicitly enable the plugin on the server.

=cut

sub enable ($id) {
    return Cpanel::FeatureFlags::enable( _get_explicitly_enabled_id($id) );
}

=head2 is_explicitly_enabled($id)

Check if the plugin is explicitly enabled on the server. This does not check for implicitly enabled state in the SaaS app such as by company id.

=cut

sub is_explicitly_enabled ($id) {
    return Cpanel::FeatureFlags::is_feature_enabled( _get_explicitly_enabled_id($id) ) ? !!1 : !!0;
}

=head2 disable($id)

Explicitly disable the plugin on the server.

=cut

sub disable ($id) {
    return Cpanel::FeatureFlags::enable( _get_explicitly_disabled_id($id) );
}

=head2 is_explicitly_disabled($id)

Check if the plugin is explicitly disabled on the server. This does not check for implicitly disabled state in the SaaS app such as by company id.

=cut

sub is_explicitly_disabled ($id) {
    return Cpanel::FeatureFlags::is_feature_enabled( _get_explicitly_disabled_id($id) ) ? !!1 : !!0;
}

=head2 is_enabled($id)

Check all the properties to see if the plugin is enabled on the server. This checks:

1) If the plugin is installed on the server
2) If the plugin has been explicitly disabled on the server, overriding any implicit enablement in the SaaS.
3) If the plugin has been explicitly enabled on the server, overriding any implicit enablemnet in the SaaS.

Note: If it cannot be determined from explicit settings on the server, the function returns "?" to indicate
we don't know on the server, that the rules are defined in the SaaS app.

=cut

sub is_enabled ($id) {
    my $is_installed = is_installed($id);
    if ($is_installed) {

        my $is_disabled_explicitly = is_explicitly_disabled($id);
        if ($is_disabled_explicitly) {
            return !!0;
        }

        my $is_enabled_explicitly = is_explicitly_enabled($id);
        if ($is_enabled_explicitly) {
            return !!1;
        }

        # defaults to ? since both the plugin is installed and the campaign is installed.
        # Assumes there is a rule that keep us from getting here that is already evaluated if
        # we should not show this. (company id, date range, etc)
        return "?";
    }

    return !!0;
}

1;
