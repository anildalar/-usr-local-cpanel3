package Cpanel::SysPkgs::DNF;

#                                      Copyright 2024 WebPros International, LLC
#                                                           All rights reserved.
# copyright@cpanel.net                                         http://cpanel.net
# This code is subject to the cPanel license. Unauthorized copying is prohibited.

use cPstrict;

use parent 'Cpanel::SysPkgs::YUM';

use Cpanel::Binaries::Dnf ();

=head1 NAME

Cpanel::SysPkgs::DNF

=head1 SYNOPSIS

    # you want to use Cpanel::SysPkgs instead
    my $pkg = Cpanel::SysPkgs->new;

See Cpanel::SysPkgs

=head1 DESCRIPTION

Provides DNF logic in addition to the YUM one.

=head1 CONSTRUCTORS

=head2 new(ARGS)

Creates a Cpanel::SysPkgs::DNF object used access the system
'yum' command

Notes:

We delete the 'yum_errorlevel' value because this is
deprecated in DNF.

=head3 ARGUMENTS

Required HASHREF with the following properties:

=over

=item  output_obj

Optional: A Cpanel::Output object
If passed, all output will be sent to this object.

=item logger

Optional: A Cpanel::Update::Logger object
If passed and no output_obj has been passed,
all output will be sent to this object.

=item exclude_options

Optional: A hashref of yum excludes to enable:
Example:
 {
    'kernel'      => 1,
    'ruby'        => 1,
    'bind-chroot' => 1,
 }

=back

=head3 RETURNS

A Cpanel::SysPkgs::YUM object

=cut

sub new {
    my $class = shift;
    my $self  = shift or die;

    $self = $class->SUPER::new($self);
    bless $self, $class;

    # This is deprecated for DNF
    delete $self->{'yum_errorlevel'};

    return $self;
}

=head1 METHODS

=cut

sub _dnf ($self) {
    return $self->{_dnf} //= Cpanel::Binaries::Dnf->new();
}

=head2 enable_module_stream ( $self, $module, $version )

Enable a DNF module; e.g. postgresql:9.6
Note: this enables a single stream.

=cut

sub enable_module_stream ( $self, $module, $version ) {

    die "enable_module_stream needs a module and a version" unless defined $module && defined $version;

    my $name = qq[${module}:${version}];

    $self->out("Enabling dnf module '$name'");
    my $run = $self->_dnf->cmd( qw(module enable -y), $name );

    if ( $run->{status} != 0 ) {
        die "Failed to enable module '$name': " . ( $run->{output} // '' );
    }

    return 1;
}

=head2 disable_module ( $self, $module )

Disable a DNF module. All related module streams will become unavailable.
Note: this disables all streams in a module as opposed to enable_module_stream which is one stream.

=cut

sub disable_module ( $self, $module ) {
    die "disable_module needs a module name" unless defined $module;

    $self->out("Disabling package module $module");

    my $run = $self->_dnf->cmd( qw(module disable -y --quiet), $module );

    return $run->{status} ? 0 : 1;
}

1;
