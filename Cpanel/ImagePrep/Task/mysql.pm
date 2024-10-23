
#                                      Copyright 2024 WebPros International, LLC
#                                                           All rights reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited.

package Cpanel::ImagePrep::Task::mysql;

use cPstrict;

use parent 'Cpanel::ImagePrep::Task';

use Try::Tiny;

=head1 NAME

Cpanel::ImagePrep::Task::mysql - An implementation subclass of Cpanel::ImagePrep::Task. See parent class for interface.

=head1 WARNING

This is a semi-destructive action in that it moves /var/lib/mysql to
a backup location and then reinitializes the database from nothing.
This means it's extremely important for this to remain a 'non-repair only'
task. Although the original data is not deleted, it would be highly
disruptive if it were allowed to run on active servers.

=cut

sub _description {
    return <<EOF;
Prepare MySQL or MariaDB for snapshotting, and restore it when an instance
launches. This replaces the main configuration file and the entire data
directory.
EOF
}

sub _type { return 'non-repair only' }

sub _pre {
    my ($self) = @_;

    my $mysql_unit = $self->_get_real_mysql_unit_name();
    return $self->PRE_POST_NOT_APPLICABLE unless $mysql_unit;

    $self->common->disable_service( 'db_governor', { 'skip_if_missing' => 1 } );
    $self->common->disable_service($mysql_unit);

    for my $path (
        '/var/lib/mysql',
        '/root/.my.cnf',
        '/root/.mylogin.cnf',
        '/var/cpanel/mysql/remote_profiles/profiles.json',
    ) {
        $self->common->_rename_to_backup($path);
    }

    return $self->PRE_POST_OK;
}

sub _post {
    my ($self) = @_;

    my $mysql_unit = $self->_get_real_mysql_unit_name();
    return $self->PRE_POST_NOT_APPLICABLE unless $mysql_unit;
    $self->common->enable_service( $mysql_unit, { 'start_service' => 0 } );

    $self->common->quiet->run_command( '/usr/local/cpanel/bin/build_mysql_conf', '--skip-notification' );

    # mysqlconnectioncheck will restart the service
    $self->common->run_command( '/usr/local/cpanel/scripts/mysqlconnectioncheck', '--skip-notification' );

    $self->common->enable_service( 'db_governor', { 'skip_if_missing' => 1 } );

    return $self->PRE_POST_OK;
}

sub _get_real_mysql_unit_name ($self) {

    # Unit aliases (symlinks) may be installed for mysql and mysqld units, but
    # it's better if we interact with the "real" unit.
    return $self->{'_mysql_unit'} if length $self->{'_mysql_unit'};

    for my $unit (qw/ mariadb.service mysql.service mysqld.service /) {
        my $unit_id = $self->common->_get_unit_property( $unit, 'Id' );
        next if $unit_id ne $unit;
        return $self->{'_mysql_unit'} = $unit;
    }
    $self->loginfo('Unable to determine the MySQL service unit name, MySQL or MariaDB may not be installed.');
    return;
}

1;
