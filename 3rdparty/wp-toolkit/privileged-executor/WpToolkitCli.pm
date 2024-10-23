#  Copyright 1999-2021. Plesk International GmbH. All rights reserved.

package Cpanel::Admin::Modules::Cpanel::WpToolkitCli;

use strict;

use parent ('Cpanel::Admin::Base');

use constant _actions => (
    'execute_command',
);
use IPC::Run;

sub remove_command_argument {
    my @args = @{$_[0]};
    my $name = $_[1];
    my $index;
    do {
        ($index) = grep { $args[$_] eq $name } (0 .. @args-1);
        if (defined $index) {
            do {
                splice(@args, $index, 1);
            } while (defined $args[$index] && substr($args[$index], 0, 1) ne '-');
        }
    } while (defined $index);
    return @args;
}

sub execute_command {
    my ($self, @args) = @_;

    my @commandArgs = ('/usr/local/bin/wp-toolkit', '--not-root-gate');
    (@args) = remove_command_argument(\@args, '-account-name');

    push(@commandArgs, '-account-name');
    push(@commandArgs, $self->get_caller_username());

    push(@commandArgs, '-command-code');
    push(@commandArgs, shift(@args));

    push(@commandArgs, '-format');
    push(@commandArgs, 'json');

    @commandArgs = (@commandArgs, @args);

    IPC::Run::run \@commandArgs, \undef, \my $stdout, \my $stderr;

    return ($stdout, $stderr, $?);
}

1;
