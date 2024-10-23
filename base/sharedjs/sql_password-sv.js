//~~GENERATED~~
//-------------------------------------------------------------
// Source:    /usr/local/cpanel/base/sharedjs/sql_password.js
// Generated: /usr/local/cpanel/base/sharedjs/sql_password-sv.js
// Module:    legacy_shared/sql_password-sv
// Locale:    sv
// This file is generated by the cpanel localization system
// using the bin/_build_translated_js_hash_files.pl script.
//-------------------------------------------------------------
// !!! Do not hand edit this file !!!
//-------------------------------------------------------------
(function() {
    // The raw lexicon.
    var newLex = {"Close":"Stäng","OK":"OK","Setting password …":"Anger lösenord …","Success":"Klart","The system is asking you to set this PostgreSQL user’s password because you have renamed the user. This user will not be able to log in until you set its password (you may use the user’s previous password here).":"Konfigurera den här PostgreSQL-användarens lösenord eftersom du har ändrat namnet på användaren. Användaren kommer inte att kunna logga in förrän du har konfigurerat lösenordet (du kan använda användarens tidigare lösenord här).","You have successfully set this user’s password.":"Du har ställt in lösenordet för den här användaren."};

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
