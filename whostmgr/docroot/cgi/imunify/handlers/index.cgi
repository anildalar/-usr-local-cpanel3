#!/usr/bin/sh
eval 'if [ -x /usr/local/cpanel/3rdparty/bin/perl ]; then exec /usr/local/cpanel/3rdparty/bin/perl -x -- $0 ${1+"$@"}; else exec /usr/bin/perl -x -- $0 ${1+"$@"};fi'
    if 0;
#!/usr/bin/perl

# Plugin: CloudLinux Imunify360 VERSION:0.1
#
# Location: whostmgr/docroot/cgi/imunify
# Copyright(c) 2010 CloudLinux, Inc.
# All rights Reserved.
# http://www.cloudlinux.com
#
#   This program is free software: you can redistribute it and/or modify
#   it under the terms of the GNU General Public License as published by
#   the Free Software Foundation, either version 3 of the License, or
#   (at your option) any later version.
#
#   This program is distributed in the hope that it will be useful,
#   but WITHOUT ANY WARRANTY; without even the implied warranty of
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#   GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
#WHMADDON:imunify360:Imunify360

#Title: cPanel Imunify360 plugin.
#Version: 1.0
#Site: http://cloudLinux.com

BEGIN { unshift @INC, '/usr/local/cpanel', '/usr/local/cpanel/whostmgr/cgi/imunify/handlers'}

use strict;
use warnings;
use JSON;
use Whostmgr::ACLS          ();
use Whostmgr::HTMLInterface ();
use Imunify::Utils;
use Imunify::Render;
use Imunify::Config;
use Imunify::Acls

Whostmgr::ACLS::init_acls();

#use CGI::Carp qw(fatalsToBrowser); # uncomment to debug 500 error

print "Content-type: text/html; charset=utf-8\n\n";
Cpanel::Template::process_template('whostmgr', {
    'print' => 1,
    'template_file' => '_defheader.tmpl',
    'theme' => "yui",
    'skipheader' => 1,
    'breadcrumbdata' => {
        'name' =>  Imunify::Utils->getPluginName(),
        'url' => Imunify::Config->PLUGIN_PATH . '/handlers/index.cgi',
        'previous' => [{
            'name' => 'Home',
            'url' => "/scripts/command?PFILE=main",
        }, {
            'name' => "Plugins",
            'url' => "/scripts/command?PFILE=Plugins",
        }],
    },
});

my $i360ieExist = 0;
if (-e '/var/run/imunifyemail/quarantine.sock') {
    $i360ieExist = 1;
}

if ( !Imunify::Acls::checkPermission() ) {
    print qq{<div align="center"><h1>Permission denied</h1></div>};
    exit 0;
}

my $plugin_path = $ENV{'cp_security_token'} . Imunify::Config->PLUGIN_PATH . '/assets/';

print qq{<script>var i360role = "admin"; var i360userName = "$ENV{REMOTE_USER}"; var i360ieExist = "$i360ieExist" </script>};
print qq{
<meta name="importmap-type" content="systemjs-importmap">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" type="text/css" href="${plugin_path}static/container.css" />

<script type="text/javascript">
    var I360_PATH_TO_STATIC = "${plugin_path}";
</script>
<script src="${plugin_path}static/shared-dependencies/system.min.js"></script>
<script src="${plugin_path}static/shared-dependencies/amd.min.js"></script>
<script src="${plugin_path}static/shared-dependencies/named-exports.min.js"></script>
<script src="${plugin_path}static/shared-dependencies/named-register.min.js"></script>

<script src="${plugin_path}static/shared-dependencies/zone.min.js"></script>
<script src="${plugin_path}static/load-scripts-after-zone.js?v2"></script>
};
print '
<div id="spa_wrapper" class="display-flex-column"><div></div></div>
<template id="single-spa-layout">
    <single-spa-router mode="hash" containerEl="#spa_wrapper">
        <div class="i360-app i360-app-outer i360-cpanel i360-app__container">
            <application name="@imunify/nav-root"></application>
            <div class="main-content">
                <route path="360/:role/email">
                    <application name="@imunify/email-root" loader="loader"></application>
                </route>
                <route default>
                    <application name="@imunify/other-root" loader="loader"></application>
                </route>
            </div>
        </div>
        <div class="i360-app__loader">
            <div class="i360-app__loader-icon"></div>
        </div>
    </single-spa-router>
</template>
';
