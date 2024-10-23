//~~GENERATED~~
//-------------------------------------------------------------
// Source:    /usr/local/cpanel/base/sharedjs/sslinstall.js
// Generated: /usr/local/cpanel/base/sharedjs/sslinstall-uk.js
// Module:    legacy_shared/sslinstall-uk
// Locale:    uk
// This file is generated by the cpanel localization system
// using the bin/_build_translated_js_hash_files.pl script.
//-------------------------------------------------------------
// !!! Do not hand edit this file !!!
//-------------------------------------------------------------
(function() {
    // The raw lexicon.
    var newLex = {"A user-defined description for the certificate.":"Визначений користувачем опис для сертифіката.","Cancel":"Скасувати","Certificate":"Сертифікат","Certificate Authority Bundle":"Пакет Центру сертифікації","Certificates that do not have a domain associated with your account are not listed here.":"Сертифікати, які не мають домену, пов’язаного з обліковим записом, не зазначені в цьому переліку.","Choose a certificate to install.":"Виберіть сертифікат для встановлення.","Choose a domain.":"Виберіть домен.","Choose a service.":"Виберіть службу.","Choose the account or Apache domain that contains the desired certificate to install. Then, select the certificate.":"Виберіть домен облікового запису або Apache, який містить потрібний сертифікат для інсталяції. Потім виберіть сертифікат.","Description":"Опис","Domain":"Домен","Domain names on the certificate.":"Імена доменів для сертифіката.","Domains":"Домени","Enter a valid IP address.":"Введіть дійсну IP-адресу.","Expiration":"Закінчення дії","For more information, read our [output,url,_1,SSL Installation Workflow] documentation.":"For more information, read our [output,url,_1,SSL Installation Workflow] documentation.","Hide":"Приховати","IP":"IP-адреса","Installing …":"Інсталяція…","Issuer":"Постачальник","Issuer organization name.":"Назва організації-постачальника.","Key":"Ключ","Loading certificates for “[output,strong,_1]” …":"Завантаження сертифікатів для „[output,strong,_1]”…","Loading installed Apache certificates …":"Завантаження інстальованих сертифікатів Apache…","OK":"OK","Provide or retrieve a certificate.":"Укажіть або отримайте сертифікат.","Provide or retrieve a key.":"Укажіть або отримайте ключ.","SSL Certificate List":"Список сертифікатів SSL","SSL Certificate Successfully Updated":"Сертифікат SSL успішно оновлено","SSL Host Successfully Installed":"Хост із захистом SSL успішно інстальовано","SSL is installed; “[_1]” ([numerate,_2,alias,aliases] [list_and,_3]) is primary.":"Протокол SSL інстальовано; „[_1]” ([numerate,_2,псевдонім,псевдоніми] [list_and,_3]) є основним.","SSL is installed; “[_1]” is primary.":"SSL інстальовано; „[_1]” є основним.","Select a certificate below:":"Виберіть сертифікат нижче:","Self-Signed":"Самопідписаний","Service":"Служба","Show":"Показати","The CA bundle does not match the certificate.":"Пакет ЦС не відповідає сертифікату.","The CA bundle is invalid.":"Неприпустимий пакет ЦС.","The IP address “[_1]” is not available, or you do not have permission to use it.":"IP-адреса „[_1]” недоступна, або ви не маєте дозволу на її використання.","The SSL certificate also supports [numerate,_1,this domain,these domains], but [numerate,_1,this domain does,these domains do] not refer to the SSL website mentioned above:":"The SSL certificate also supports [numerate,_1,this domain,these domains], but [numerate,_1,this domain does,these domains do] not refer to the SSL website mentioned above:","The SSL website is also accessible via [numerate,_1,this domain,these domains], but the certificate does not support [numerate,_1,it,them]. Web browsers will show a warning when accessing [numerate,_1,this domain,these domains] via HTTPS:":"The SSL website is also accessible via [numerate,_1,this domain,these domains], but the certificate does not support [numerate,_1,it,them]. Web browsers will show a warning when accessing [numerate,_1,this domain,these domains] via HTTPS:","The SSL website is now active and accessible via HTTPS on [numerate,_1,this domain,these domains]:":"Наразі веб-сайт із захистом SSL активний і доступний через HTTPS на [numerate,_1,цього домену,цих доменів]:","The certificate does not match your selected domain.":"Сертифікат не відповідає вибраному домену.","The certificate information could not be retrieved because of an error: [_1]":"Відомості про сертифікат не вдалося отримати через помилку: [_1]","The certificate is not valid.":"Недійсний сертифікат.","The certificate list could not be retrieved because of an error: [_1]":"Не вдалося отримати список сертифікатів через помилку: [_1]","The certificate’s expiration date":"Термін дії сертифіката","The key does not match the certificate.":"Ключ не відповідає сертифікату.","The key is invalid.":"Неприпустимий ключ.","The lookup failed because of an error: [_1]":"Не вдалося виконати пошук через помилку: [_1]","This SSL certificate was already installed.":"Сертифікат SSL уже інстальовано.","This account does not have any installable certificates.":"Цей обліковий запис не має сертифікатів, які можна інсталювати.","This is not a valid domain.":"Це не є припустимим доменом.","To give website clients the best experience, ensure that each [asis,SSL] website’s certificate matches every domain on the website.":"To give website clients the best experience, ensure that each [asis,SSL] website’s certificate matches every domain on the website.","Use Certificate":"Використання сертифіката","We recommend that users manage individual subdomains (e.g., “[_1]”, “[_2]”) instead of a single wildcard subdomain (e.g., “[_3]”).":"Користувачам рекомендовано керувати окремими дочірніми доменами (наприклад, „[_1]”, „[_2]”), а не одним дочірнім узагальненим доменом (наприклад, „[_3]”).","When you install a valid certificate onto a website, the system also configures email, calendar, web disk, and [asis,cPanel]-related services to use that certificate for all of the website’s domains that match the certificate. Requests to these services from [asis,SNI]-enabled clients via the matching domains will receive the installed certificate.":"When you install a valid certificate onto a website, the system also configures email, calendar, web disk, and [asis,cPanel]-related services to use that certificate for all of the website’s domains that match the certificate. Requests to these services from [asis,SNI]-enabled clients via the matching domains will receive the installed certificate.","You can manage all of your saved certificates on the [output,url,_1,“Certificates” page].":"Ви можете керувати всіма своїми збереженими сертифікатами на [output,url,_1,сторінці „Сертифікати”].","You have successfully configured SSL.":"Ви успішно створили настроїли SSL.","You have successfully updated the SSL website’s certificate.":"Сертифікат веб-сайту із захистом SSL успішно оновлено."};

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
