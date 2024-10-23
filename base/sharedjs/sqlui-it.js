//~~GENERATED~~
//-------------------------------------------------------------
// Source:    /usr/local/cpanel/base/sharedjs/sqlui.js
// Generated: /usr/local/cpanel/base/sharedjs/sqlui-it.js
// Module:    legacy_shared/sqlui-it
// Locale:    it
// This file is generated by the cpanel localization system
// using the bin/_build_translated_js_hash_files.pl script.
//-------------------------------------------------------------
// !!! Do not hand edit this file !!!
//-------------------------------------------------------------
(function() {
    // The raw lexicon.
    var newLex = {"Close":"Chiudi","If you change this database’s name, you will be unable to rename it back to “[_1]”. This is because the old name lacks the username prefix ([_2]) that this system requires on the names of all new databases and database users. If you require a name without the prefix, you must contact your server administrator.":"Se si modifica il nome di questo database, non sarà possibile rinominarlo di nuovo “[_1]”, poiché nel nome precedente non è presente il prefisso del nome utente ([_2]) richiesto dal sistema corrente per i nomi di tutti i nuovi database e utenti di database. Se è necessario un nome senza il prefisso, è necessario contattare l’amministratore di sistema.","If you change this user’s name, you will be unable to rename it back to “[_1]”. This is because the old name lacks the username prefix ([_2]) that this system requires on the names of all new databases and database users. If you require a name without the prefix, you must contact your server administrator.":"Se si modifica il nome di questo utente, non sarà possibile rinominarlo di nuovo “[_1]”, poiché nel nome precedente non è presente il prefisso del nome utente ([_2]) richiesto dal sistema corrente per i nomi di tutti i nuovi database e utenti di database. Se è necessario un nome senza il prefisso, è necessario contattare l’amministratore di sistema.","It is a potentially dangerous operation to rename a database. You may want to [output,url,_1,back up this database] before renaming it.":"It is a potentially dangerous operation to rename a database. You may want to [output,url,_1,back up this database] before renaming it.","Rename Database":"Rinomina database","Rename Database User":"Rinomina utente database","Renaming database user …":"Ridenominazione utente database in corso…","Renaming database …":"Ridenominazione database in corso…","Success! The browser is now redirecting …":"Operazione completata Reindirizzamento del browser in corso…","Success! This page will now reload.":"Operazione completata Questa pagina verrà ora ricaricata.","The new name must be different from the old name.":"Il nuovo nome deve essere diverso da quello precedente."};

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
