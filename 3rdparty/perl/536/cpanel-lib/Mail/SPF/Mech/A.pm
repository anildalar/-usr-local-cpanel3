#
# Mail::SPF::Mech::A
# SPF record "a" mechanism class.
#
# (C) 2005-2012 Julian Mehnle <julian@mehnle.net>
#     2005      Shevek <cpan@anarres.org>
# $Id: A.pm 57 2012-01-30 08:15:31Z julian $
#
##############################################################################

package Mail::SPF::Mech::A;

=head1 NAME

Mail::SPF::Mech::A - SPF record C<a> mechanism class

=cut

use warnings;
use strict;

use base 'Mail::SPF::SenderIPAddrMech';

use constant TRUE   => (0 == 0);
use constant FALSE  => not TRUE;

use constant name           => 'a';
use constant name_pattern   => qr/${\name}/i;

=head1 DESCRIPTION

An object of class B<Mail::SPF::Mech::A> represents an SPF record mechanism of
type C<a>.

=head2 Constructors

The following constructors are provided:

=over

=item B<new(%options)>: returns I<Mail::SPF::Mech::A>

Creates a new SPF record C<a> mechanism object.

%options is a list of key/value pairs representing any of the following
options:

=over

=item B<qualifier>

=item B<domain_spec>

=item B<ipv4_prefix_length>

=item B<ipv6_prefix_length>

See L<Mail::SPF::Mech/new>.

=back

=item B<new_from_string($text, %options)>: returns I<Mail::SPF::Mech::A>;
throws I<Mail::SPF::ENothingToParse>, I<Mail::SPF::EInvalidMech>

Creates a new SPF record C<a> mechanism object by parsing the string and
any options given.

=back

=head2 Class methods

The following class methods are provided:

=over

=item B<default_qualifier>

=item B<default_ipv4_prefix_length>

=item B<default_ipv6_prefix_length>

=item B<qualifier_pattern>

See L<Mail::SPF::Mech/Class methods>.

=item B<name>: returns I<string>

Returns B<'a'>.

=item B<name_pattern>: returns I<Regexp>

Returns a regular expression that matches a mechanism name of B<'a'>.

=back

=head2 Instance methods

The following instance methods are provided:

=over

=cut

sub parse_params {
    my ($self) = @_;
    $self->parse_domain_spec();
    $self->parse_ipv4_ipv6_prefix_lengths();
    return;
}

=item B<text>

=item B<qualifier>

=item B<params>

=cut

sub params {
    my ($self) = @_;
    my $params;
    $params .= ':' . $self->{domain_spec}
        if  defined($self->{domain_spec});
    $params .= '/' . $self->{ipv4_prefix_length}
        if  defined($self->{ipv4_prefix_length})
        and $self->{ipv4_prefix_length} != $self->default_ipv4_prefix_length;
    $params .= '//' . $self->{ipv6_prefix_length}
        if  defined($self->{ipv6_prefix_length})
        and $self->{ipv6_prefix_length} != $self->default_ipv6_prefix_length;
    return $params;
}

=item B<stringify>

=item B<domain>

=item B<match_in_domain>

See L<Mail::SPF::Mech/Instance methods>.

=item B<domain_spec>: returns I<Mail::SPF::MacroString>

Returns the C<domain-spec> parameter of the mechanism.

=item B<ipv4_prefix_length>: returns I<integer>

Returns the IPv4 network prefix length of the mechanism.

=item B<ipv6_prefix_length>: returns I<integer>

Returns the IPv6 network prefix length of the mechanism.

=cut

# Make read-only accessors:
__PACKAGE__->make_accessor($_, TRUE)
    foreach qw(domain_spec ipv4_prefix_length ipv6_prefix_length);

=item B<match($server, $request)>: returns I<boolean>

Checks whether the mechanism's target domain name (that is, any of its DNS C<A>
or C<AAAA> host addresses) matches the given request's IP address (see
L<Mail::SPF::Request/ip_address>), and returns B<true> if it does, or B<false>
otherwise.  The mechanism's IP network prefix lengths are respected when
matching address records against the request's IP address.  See RFC 4408, 5,
for the exact algorithm used.

=cut

sub match {
    my ($self, $server, $request) = @_;
    $server->count_dns_interactive_term($request);
    return $self->match_in_domain($server, $request);
}

=back

=head1 SEE ALSO

L<Mail::SPF>, L<Mail::SPF::Record>, L<Mail::SPF::Term>, L<Mail::SPF::Mech>

L<http://tools.ietf.org/html/rfc4408>

For availability, support, and license information, see the README file
included with Mail::SPF.

=head1 AUTHORS

Julian Mehnle <julian@mehnle.net>, Shevek <cpan@anarres.org>

=cut

TRUE;
