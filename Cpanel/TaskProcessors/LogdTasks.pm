package Cpanel::TaskProcessors::LogdTasks;

# cpanel - Cpanel/TaskProcessors/LogdTasks.pm      Copyright 2022 cPanel, L.L.C.
#                                                           All rights reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited

use strict;
use warnings;

{

    package Cpanel::TaskProcessors::Scripts::runweblogs;
    use parent 'Cpanel::TaskQueue::FastSpawnOverRides';

    sub is_valid_args {
        my ( $self, $task ) = @_;
        my $numargs  = scalar $task->args();
        my $is_valid = ( $numargs == 1 );
        return $is_valid;
    }

    sub _do_child_task {
        my ( $self, $task, $logger ) = @_;
        my ($user) = $task->args();
        $self->checked_system(
            {
                'logger' => $logger,
                'name'   => 'runweblogs script',
                'cmd'    => '/usr/local/cpanel/scripts/runweblogs',
                'args'   => [$user],
            }
        );

        return;
    }

    sub deferral_tags {
        my ($self) = @_;
        return qw/weblogs/;
    }
}

sub to_register {
    return (
        [ 'runweblogs', Cpanel::TaskProcessors::Scripts::runweblogs->new() ],
    );
}

1;
