//~~GENERATED~~
//-------------------------------------------------------------
// Source:    /usr/local/cpanel/base/sharedjs/sql_password.js
// Generated: /usr/local/cpanel/base/sharedjs/sql_password-da.js
// Module:    legacy_shared/sql_password-da
// Locale:    da
// This file is generated by the cpanel localization system
// using the bin/_build_translated_js_hash_files.pl script.
//-------------------------------------------------------------
// !!! Do not hand edit this file !!!
//-------------------------------------------------------------
(function() {
    // The raw lexicon.
    var newLex = {"Close":"Luk","OK":"OK","Setting password …":"Angiver adgangskode …","Success":"Udført","The system is asking you to set this PostgreSQL user’s password because you have renamed the user. This user will not be able to log in until you set its password (you may use the user’s previous password here).":"Systemet beder dig om at konfigurere denne PostgreSQL-brugers adgangskode, da du har omdøbt brugeren. Brugeren vil ikke vil være i stand til at logge på, før adgangskoden er konfigureret (du kan bruge brugerens forrige adgangskode her).","You have successfully set this user’s password.":"Du har indstillet denne brugers adgangskode."};

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
