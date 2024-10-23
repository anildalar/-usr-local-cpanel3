//~~GENERATED~~
//-------------------------------------------------------------
// Source:    /usr/local/cpanel/base/frontend/jupiter/security/tls_status/services/DomainsService.js
// Generated: /usr/local/cpanel/base/frontend/jupiter/security/tls_status/services/DomainsService-ru.js
// Module:    /jupiter/security/tls_status/services/DomainsService-ru
// Locale:    ru
// This file is generated by the cpanel localization system
// using the bin/_build_translated_js_hash_files.pl script.
//-------------------------------------------------------------
// !!! Do not hand edit this file !!!
//-------------------------------------------------------------
(function() {
    // The raw lexicon.
    var newLex = {"Active":"Активен","Addon Domains":"Дополнительные домены","An error occurred during the last [asis,AutoSSL] run for this domain.":"An error occurred during the last [asis,AutoSSL] run for this domain.","DV Certificate":"Сертификат DV","Domain Types:":"Типы доменов:","Domain Validated":"Домен проверен","EV Certificate":"Сертификат EV","Exclude “[_1]” from [asis,AutoSSL].":"Exclude “[_1]” from [asis,AutoSSL].","Excluded":"Исключен","Expired":"Срок действия истек","Expired on [datetime,_1].":"Expired on [datetime,_1].","Expires on [datetime,_1].":"Expires on [datetime,_1].","Expiring Soon":"Срок действия скоро истечет","Extended Validation":"Расширенная проверка","Has [asis,AutoSSL] Problems":"Has [asis,AutoSSL] Problems","Include “[_1]” during [asis,AutoSSL].":"Include “[_1]” during [asis,AutoSSL].","Included":"Включен","Main":"Основной","No certificate available.":"Доступных сертификатов нет.","OV Certificate":"Сертификат OV","Only list Addon domains.":"Показывать только дополнительные домены.","Only list Dynamic [asis,DNS] ([asis,DDNS]) Domains.":"Only list Dynamic [asis,DNS] ([asis,DDNS]) Domains.","Only list Main domains.":"Показывать только основные домены.","Only list Parked domains.":"Показывать только припаркованные домены.","Only list Service Subdomains.":"Показывать только служебные субдомены.","Only list Subdomains.":"Показывать только субдомены.","Only list [asis,www] and [asis,mail] domains.":"Only list [asis,www] and [asis,mail] domains.","Only list domains that are not explicitly excluded during [asis,AutoSSL].":"Only list domains that are not explicitly excluded during [asis,AutoSSL].","Only list domains that will be explicitly excluded from [asis,AutoSSL].":"Only list domains that will be explicitly excluded from [asis,AutoSSL].","Only list domains whose certificate is expiring soon.":"Показывать только домены с истекающим сроком действия сертификата.","Only list domains with [asis,AutoSSL DV] Certificates.":"Only list domains with [asis,AutoSSL DV] Certificates.","Only list domains with [asis,DV] Certificates.":"Only list domains with [asis,DV] Certificates.","Only list domains with [asis,EV] Certificates.":"Only list domains with [asis,EV] Certificates.","Only list domains with [asis,OV] Certificates.":"Only list domains with [asis,OV] Certificates.","Only list self-signed domains.":"Показывать только домены с самозаверенными сертификатами.","Only list the domains with [asis,AutoSSL] problems.":"Only list the domains with [asis,AutoSSL] problems.","Only list the domains with active certificates.":"Показывать только домены с активными сертификатами.","Only list unsecured domains.":"Показывать только незащищенные домены.","Organization Validated":"Организация проверена","Parked Domains":"Припаркованные домены","Purchase Certificate":"Купить сертификат","Purchase certificate for “[_1]”.":"Purchase certificate for “[_1]”.","Renew Certificate":"Обновить сертификат","Renew certificate for “[_1]”.":"Renew certificate for “[_1]”.","Self-signed":"Самозаверенный","Service Subdomains":"Служебные субдомены","Subdomain":"Субдомен","The certificate will not renew via [asis,AutoSSL] because it was not issued via [asis,AutoSSL].":"The certificate will not renew via [asis,AutoSSL] because it was not issued via [asis,AutoSSL].","The certificate will renew via [asis,AutoSSL] when the parent domain “[_1]” renews, but this domain will be excluded.":"The certificate will renew via [asis,AutoSSL] when the parent domain “[_1]” renews, but this domain will be excluded.","The certificate will renew via [asis,AutoSSL] when the parent domain “[_1]” renews.":"The certificate will renew via [asis,AutoSSL] when the parent domain “[_1]” renews.","The certificate will renew via [asis,AutoSSL], but this domain will be excluded.":"The certificate will renew via [asis,AutoSSL], but this domain will be excluded.","The certificate will renew via [asis,AutoSSL].":"The certificate will renew via [asis,AutoSSL].","The configured [asis,AutoSSL] provider does not support explicit wildcard domains.":"The configured [asis,AutoSSL] provider does not support explicit wildcard domains.","The installed certificate does not cover this domain.":"Установленный сертификат не защищает этот домен.","This server cannot provision [asis,AutoSSL] certificates that secure wildcard domains.":"This server cannot provision [asis,AutoSSL] certificates that secure wildcard domains.","Unknown":"Неизвестно","Unknown Certificate Type":"Неизвестный тип сертификата","Unsecured":"Незащищенный","Upgrade Certificate":"Обновить сертификат","Upgrade certificate for “[_1]”.":"Upgrade certificate for “[_1]”.","View certificate for the website “[_1]”.":"View certificate for the website “[_1]”.","You must purchase a certificate to secure this domain.":"Необходимо купить сертификат для защиты этого домена.","[asis,AutoSSL DV] Certificate":"[asis,AutoSSL DV] Certificate","[asis,AutoSSL] Domain Validated":"[asis,AutoSSL] Domain Validated","[asis,AutoSSL] Statuses:":"[asis,AutoSSL] Statuses:","[asis,AutoSSL] will attempt to secure the domain the next time it runs.":"[asis,AutoSSL] will attempt to secure the domain the next time it runs.","[asis,AutoSSL] will attempt to secure the domain when the parent domain “[_1]” renews.":"[asis,AutoSSL] will attempt to secure the domain when the parent domain “[_1]” renews.","[asis,AutoSSL] will attempt to secure this website, but the domain will be excluded.":"[asis,AutoSSL] will attempt to secure this website, but the domain will be excluded.","[asis,DDNS] Domains":"[asis,DDNS] Domains","[asis,SSL] Statuses:":"[asis,SSL] Statuses:","[asis,SSL] Types:":"[asis,SSL] Types:","[asis,www] and [asis,mail] Domains":"[asis,www] and [asis,mail] Domains"};

    if (!this.LEXICON) {
        this.LEXICON = {};
    }

    for(var item in newLex) {
        if(newLex.hasOwnProperty(item)) {
            var value = newLex[item];
            if (typeof(value) === "string" && value !== "") {
                // Only add it if there is a value.
                this.LEXICON[item] = value;
            }
        }
    }
})();
//~~END-GENERATED~~
