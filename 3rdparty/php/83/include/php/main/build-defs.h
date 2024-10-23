/*
   +----------------------------------------------------------------------+
   | Copyright (c) The PHP Group                                          |
   +----------------------------------------------------------------------+
   | This source file is subject to version 3.01 of the PHP license,      |
   | that is bundled with this package in the file LICENSE, and is        |
   | available through the world-wide-web at the following url:           |
   | https://www.php.net/license/3_01.txt                                 |
   | If you did not receive a copy of the PHP license and are unable to   |
   | obtain it through the world-wide-web, please send a note to          |
   | license@php.net so we can mail you a copy immediately.               |
   +----------------------------------------------------------------------+
   | Author: Stig Sæther Bakken <ssb@php.net>                             |
   +----------------------------------------------------------------------+
*/

#define CONFIGURE_COMMAND " './configure'  '--prefix=/usr/local/cpanel/3rdparty/php/83' '--with-libdir=lib64' '--verbose' '--enable-static' '--with-iconv' '--enable-mbstring' '--enable-gd' '--enable-mbregex' '--with-imap-ssl' '--with-imap=/usr/local/cpanel/3rdparty/lib64/imap/' '--enable-ftp' '--with-gettext' '--enable-sockets' '--enable-cgi' '--enable-fpm' '--with-pdo-mysql=mysqlnd' '--with-mysql-sock=/var/lib/mysql/mysql.sock' '--with-mysqli=mysqlnd' '--with-pgsql=/usr/local/cpanel/3rdparty' '--with-pdo-pgsql=/usr/local/cpanel/3rdparty' '--with-openssl=/usr' '--with-kerberos' '--with-curl=/usr' '--with-tidy=/usr/local/cpanel/3rdparty' '--with-config-file-path=/usr/local/cpanel/3rdparty/php/83/etc' '--with-jpeg=/usr' '--enable-intl' '--with-xpm=/usr' '--with-external-pcre=/usr' '--with-freetype=/usr' '--with-bz2=/usr' '--with-zip' '--with-zlib=/usr' '--enable-soap' '--with-pear' '--enable-bcmath' '--with-xsl' '--enable-pcntl' '--with-ldap=/usr' '--with-ldap-sasl' '--enable-sysvsem' '--enable-sysvshm' 'PKG_CONFIG_PATH=/opt/rh/gcc-toolset-13/root/usr/lib64/pkgconfig:/opt/alt/libxml2/usr/lib64/pkgconfig:/opt/alt/curlssl/usr/lib64/pkgconfig:/opt/alt/openssl/lib64/pkgconfig:/usr/local/cpanel/3rdparty/lib64/pkgconfig' 'CFLAGS=-O2 -fexceptions -g -grecord-gcc-switches -pipe -Wall -Werror=format-security -Wp,-D_FORTIFY_SOURCE=2 -Wp,-D_GLIBCXX_ASSERTIONS -specs=/usr/lib/rpm/redhat/redhat-hardened-cc1 -fstack-protector-strong -specs=/usr/lib/rpm/redhat/redhat-annobin-cc1 -m64 -march=x86-64-v2 -mtune=generic -fasynchronous-unwind-tables -fstack-clash-protection -fcf-protection -I/usr/local/cpanel/3rdparty/php/83/include' 'KERBEROS_CFLAGS=-I/usr/include' 'KERBEROS_LIBS=-L/usr/lib64' 'JPEG_CFLAGS=-I/usr/include' 'JPEG_LIBS=-L/usr/lib64 -ljpeg' 'SASL_CFLAGS=-I/usr/local/cpanel/3rdparty/include' 'SASL_LIBS=-L/usr/local/cpanel/3rdparty/lib64'"
#define PHP_ODBC_CFLAGS	""
#define PHP_ODBC_LFLAGS		""
#define PHP_ODBC_LIBS		""
#define PHP_ODBC_TYPE		""
#define PHP_OCI8_DIR			""
#define PHP_OCI8_ORACLE_VERSION		""
#define PHP_PROG_SENDMAIL	"/usr/sbin/sendmail"
#define PEAR_INSTALLDIR         "/usr/local/cpanel/3rdparty/php/83/lib/php"
#define PHP_INCLUDE_PATH	".:/usr/local/cpanel/3rdparty/php/83/lib/php"
#define PHP_EXTENSION_DIR       "/usr/local/cpanel/3rdparty/php/83/lib/php/extensions/no-debug-non-zts-20230831"
#define PHP_PREFIX              "/usr/local/cpanel/3rdparty/php/83"
#define PHP_BINDIR              "/usr/local/cpanel/3rdparty/php/83/bin"
#define PHP_SBINDIR             "/usr/local/cpanel/3rdparty/php/83/sbin"
#define PHP_MANDIR              "/usr/local/cpanel/3rdparty/php/83/php/man"
#define PHP_LIBDIR              "/usr/local/cpanel/3rdparty/php/83/lib/php"
#define PHP_DATADIR             "/usr/local/cpanel/3rdparty/php/83/share/php"
#define PHP_SYSCONFDIR          "/usr/local/cpanel/3rdparty/php/83/etc"
#define PHP_LOCALSTATEDIR       "/usr/local/cpanel/3rdparty/php/83/var"
#define PHP_CONFIG_FILE_PATH    "/usr/local/cpanel/3rdparty/php/83/etc"
#define PHP_CONFIG_FILE_SCAN_DIR    ""
#define PHP_SHLIB_SUFFIX        "so"
#define PHP_SHLIB_EXT_PREFIX    ""
