{"delimiters":{"quotation_start":"‘","quotation_end":"’","alternate_quotation_start":"„","alternate_quotation_end":"”"},"orientation":{"lines":"top-to-bottom","characters":"left-to-right"},"posix":{"nostr":"nie:n","yesstr":"tak:t"},"plural_forms":{"category_list":["one","few","many","other"],"category_rules_function":null,"category_rules":{"one":"n is 1","few":"n mod 10 in 2..4 and n mod 100 not in 12..14","many":"n is not 1 and n mod 10 in 0..1 or n mod 10 in 5..9 or n mod 100 in 12..14"},"category_rules_compiled":{"one":function (n) {if ( (( n == 1))) { return 'one'; } return;},"few":function (n) {if ( (( parseInt(n) == n && (n % 10) >= 2 && (n % 10) <= 4 ) && ( parseInt(n) != n || (n % 100) < 12 || (n % 100) > 14 ))) { return 'few'; } return;},"many":function (n) {if ( (( n != 1) && ( parseInt(n) == n && (n % 10) >= 0 && (n % 10) <= 1 )) ||  (( parseInt(n) == n && (n % 10) >= 5 && (n % 10) <= 9 )) ||  (( parseInt(n) == n && (n % 100) >= 12 && (n % 100) <= 14 ))) { return 'many'; } return;}}},"cldr_formats":{"territory":"Region: {0}","_decimal_format_decimal":",","language":"Język: {0}","percent":"#,##0%","locale":"{0} ({1})","_decimal_format_group":" ","_percent_format_percent":"%","decimal":"#,##0.###","ellipsis":{"medial":"{0}…{1}","final":"{0}…","initial":"…{0}"},"list_or":{"2":"{0} lub {1}","start":"{0}, {1}","end":"{0} lub {1}","middle":"{0}, {1}"},"list":{"middle":"{0}; {1}","2":"{0} i {1}","start":"{0}; {1}","end":"{0} i {1}"}},"fallback":[],"characters":{"more_information":"?"}}