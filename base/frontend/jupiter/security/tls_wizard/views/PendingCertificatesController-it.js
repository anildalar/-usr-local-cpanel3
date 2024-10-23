//~~GENERATED~~
//-------------------------------------------------------------
// Source:    /usr/local/cpanel/base/frontend/jupiter/security/tls_wizard/views/PendingCertificatesController.js
// Generated: /usr/local/cpanel/base/frontend/jupiter/security/tls_wizard/views/PendingCertificatesController-it.js
// Module:    /jupiter/security/tls_wizard/views/PendingCertificatesController-it
// Locale:    it
// This file is generated by the cpanel localization system
// using the bin/_build_translated_js_hash_files.pl script.
//-------------------------------------------------------------
// !!! Do not hand edit this file !!!
//-------------------------------------------------------------
(function() {
    // The raw lexicon.
    var newLex = {"Awaiting Branding …":"Awaiting Branding …","Awaiting Validation …":"Awaiting Validation …","Multiple validation items pending …":"Multiple validation items pending …","Not Validated":"Not Validated","Payment Completed.":"Payment Completed.","Pending Completion of Payment":"Completamento del pagamento in sospeso","Status Unknown":"Stato sconosciuto","The [output,abbr,CA,Certificate Authority] received the request and must now process the brand verification approval.":"The [output,abbr,CA,Certificate Authority] received the request and must now process the brand verification approval.","The [output,abbr,CA,Certificate Authority] received the request but has not yet performed a [output,abbr,DCV,Domain Control Validation] check.":"The [output,abbr,CA,Certificate Authority] received the request but has not yet performed a [output,abbr,DCV,Domain Control Validation] check.","The [output,abbr,CA,Certificate Authority] validated the certificate.":"The [output,abbr,CA,Certificate Authority] validated the certificate.","The system encountered an error as it attempted to cancel your transaction: [_1]":"Il sistema ha rilevato un errore durante il tentativo di annullare la transazione dell’utente: [_1]","The system encountered an error as it attempted to refresh your pending certificates: [_1]":"Il sistema ha rilevato un errore durante il tentativo di aggiornare il certificati in sospeso dell’utente: [_1]","The system failed to install the new [asis,SSL] certificate because of an error: [_1]":"Il sistema non è riuscito a installare il nuovo certificato [asis,SSL] a causa di un errore: [_1]","The system has canceled the request for this certificate; however, “[_1]” was already waiting on approval before processing your order. To ensure that this certificate order is canceled, you must [output,url,_2,contact support directly].":"Il sistema ha annullato la richiesta di questo certificato, tuttavia “[_1]” era già in attesa di approvazione prima dell’elaborazione dell’ordine. Per assicurarsi che questo ordine di certificato venga annullato, è necessario [output,url,_2,contattare direttamente l’assistenza].","The system has canceled this certificate. Your credit card should not be charged for this order.":"Il sistema ha annullato questo certificato. Per questo ordine non deve essere addebitato alcun costo sulla carta di credito.","The system has installed the new [asis,SSL] certificate on to the [numerate,_1,website,websites] [list_and_quoted,_2].":"Il sistema ha installato il nuovo certificato [asis,SSL] sul/i [numerate,_1,siti Web,siti Web] [list_and_quoted,_2].","The system processed the pending certificate queue successfully, but [numerate,_1,your pending certificate was not,none of your pending certificates were] available.":"Il sistema ha completato l’elaborazione della coda di certificati in sospeso, ma [numerate,_1,il certificato in sospeso dell’utente non,nessun certificato in sospeso] è disponibile.","This certificate (order item ID “[_1]”) was already canceled directly via “[_2]”.":"Questo certificato (ID elemento ordine “[_1]”) è già stato annullato direttamente tramite “[_2]”.","This certificate’s order (ID “[_1]”) was already canceled directly via “[_2]”.":"Questo ordine di certificato (ID “[_1]”) è già stato annullato direttamente tramite “[_2]”.","Unknown":"Sconosciuto","Unknown.":"Unknown.","Validated":"Validated","Waiting for the provider to issue the certificate …":"Waiting for the provider to issue the certificate …","Waiting for “[_1]” to approve your order …":"Ordine in attesa di approvazione da parte di “[_1]”…","You have canceled this order, but “[_1]” already issued the certificate. The system will now install it. ([output,url,_2,Do you need help with this order?])":"Questo ordine è stato annullato, tuttavia “[_1]” ha già emesso un certificato. Il sistema ora lo installerà. ([output,url,_2,Occorre assistenza con questo ordine?])","You have no more pending [asis,SSL] certificates.":"Non sono presenti altri certificati [asis,SSL] in sospeso.","You will now return to the beginning of the wizard.":"Adesso si tornerà all’inizio della procedura guidata.","[numerate,_2,A certificate,Certificates] for the following [numerate,_2,website was,websites were] available, and the system has installed [numerate,_2,it,them]: [list_and_quoted,_1]":"[numerate,_2,Un certificato,Certificati] per il/i seguente/i [numerate,_2,sito Web era,siti Web erano] disponibile/i e il sistema [numerate,_2,lo,li] ha installato/i: [list_and_quoted,_1]","“[_1]” and [quant,_2,other domain,other domains]":"“[_1]” and [quant,_2,other domain,other domains]","“[_1]” reports that the certificate authority issued but then revoked the certificate for “[_2]” and [quant,_3,other domain,other domains].":"“[_1]” reports that the certificate authority issued but then revoked the certificate for “[_2]” and [quant,_3,other domain,other domains].","“[_1]” reports that the certificate authority issued but then revoked “[_2]”’s certificate.":"“[_1]” reports that the certificate authority issued but then revoked “[_2]”’s certificate.","“[_1]” reports that the certificate authority rejected the request for a certificate for “[_2]” and [quant,_3,other domain,other domains].":"“[_1]” reports that the certificate authority rejected the request for a certificate for “[_2]” and [quant,_3,other domain,other domains].","“[_1]” reports that the certificate authority rejected the request for a certificate for “[_2]”.":"“[_1]” reports that the certificate authority rejected the request for a certificate for “[_2]”.","“[_1]” reports that the certificate for “[_2]” and [quant,_3,other domain,other domains] has been canceled.":"“[_1]” indica che il certificato per “[_2]” e [quant,_3,altro dominio,altri domini] è stato annullato.","“[_1]” reports that the certificate for “[_2]” has been canceled.":"“[_1]” indica che il certificato per “[_2]” è stato annullato."};

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
