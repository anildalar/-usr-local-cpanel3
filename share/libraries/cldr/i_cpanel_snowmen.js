//-------------------------------------------------------------
// CLDR Data for i_cpanel_snowmen
//-------------------------------------------------------------
(function(context) {
    var locale = "i_cpanel_snowmen",
        functions = {'get_plural_form':function(n){var category;var category_values=Array.prototype.slice.call(arguments,1);var has_extra_for_zero=0;var abs_n=Math.abs(n);var category_process_order=["zero","one","two","few","many","other"];var category_rules_lookup={"one":function(n){if(((n==1))){return'one';}return;}};for(i=0;i<category_process_order.length;i++){if(category_rules_lookup[category_process_order[i]]){category=category_rules_lookup[category_process_order[i]](abs_n);if(category)break;}}
var categories=["one","other"];if(category_values.length===0){category_values=categories;}
else{var cat_len=categories.length;var val_len=category_values.length;var cat_len_plus_one=cat_len+1;if(val_len===cat_len_plus_one){has_extra_for_zero++;}
else if(cat_len!==val_len){if(window.console)console.warn('The number of given values ('+val_len+') does not match the number of categories ('+cat_len+').');}}
if(category===undefined){var cat_idx=has_extra_for_zero&&abs_n!==0?-2:-1;var sliced=category_values.slice(cat_idx);return[sliced[0],has_extra_for_zero&&abs_n===0?1:0];}
else{var return_value;GET_POSITION:while(1){var cat_pos_in_list;var index=-1;CATEGORY:for(i=0;i<categories.length;i++){index++;if(categories[i]===category){cat_pos_in_list=index;break CATEGORY;}}
if(cat_pos_in_list===undefined&&category!=='other'){if(window.console)console.warn('The category ('+category+') is not used by this locale.');category='other';continue GET_POSITION;}
else if(cat_pos_in_list===undefined){var cat_idx=has_extra_for_zero&&abs_n!==0?-2:-1;var sliced=category_values.slice(cat_idx);return_value=[sliced[0],has_extra_for_zero&&abs_n===0?1:0]
break GET_POSITION;}
else{if(has_extra_for_zero&&category==='other'){var cat_idx=has_extra_for_zero&&abs_n===0?-1:cat_pos_in_list;var sliced=category_values.slice(cat_idx);return_value=[sliced[0],has_extra_for_zero&&abs_n===0?1:0];break GET_POSITION;}
else{return_value=[category_values[cat_pos_in_list],0];break GET_POSITION;}}
break GET_POSITION;}
return return_value;}}},
        datetime_info = {"territory":null,"quarter_stand_alone_narrow":["1","2","3","4"],"time_formats":{"short":"h:mm a","medium":"h:mm:ss a","long":"h:mm:ss a z","full":"h:mm:ss a zzzz"},"era_narrow":["B","A"],"datetime_format_full":"EEEE, MMMM d, y h:mm:ss a zzzz","glibc_date_1_format":"%a %b %e %H:%M:%S %Z %Y","datetime_format_long":"MMMM d, y h:mm:ss a z","date_format_short":"M/d/yy","native_variant":null,"name":"English","language_id":"en","era_wide":["Before Christ","Anno Domini"],"variant_id":null,"date_format_medium":"MMM d, y","time_format_default":"h:mm:ss a","era_abbreviated":["BC","AD"],"datetime_format":"{1} {0}","month_format_wide":["January","February","March","April","May","June","July","August","September","October","November","December"],"quarter_format_abbreviated":["Q1","Q2","Q3","Q4"],"datetime_format_short":"M/d/yy h:mm a","glibc_datetime_format":"%a %b %e %H:%M:%S %Y","quarter_stand_alone_abbreviated":["Q1","Q2","Q3","Q4"],"script_id":null,"prefers_24_hour_time":0,"cldr_version":"1.7.1","day_format_wide":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"language":"English","month_format_narrow":["J","F","M","A","M","J","J","A","S","O","N","D"],"time_format_full":"h:mm:ss a zzzz","date_format_default":"MMM d, y","am_pm_abbreviated":["AM","PM"],"native_territory":null,"glibc_time_12_format":"%I:%M:%S %p","month_stand_alone_wide":["January","February","March","April","May","June","July","August","September","October","November","December"],"time_format_long":"h:mm:ss a z","day_stand_alone_wide":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"variant":null,"id":"en","available_formats":null,"quarter_stand_alone_wide":["1st quarter","2nd quarter","3rd quarter","4th quarter"],"time_format_medium":"h:mm:ss a","time_format_short":"h:mm a","date_format_full":"EEEE, MMMM d, y","territory_id":null,"first_day_of_week":"1","glibc_date_format":"%m/%d/%y","quarter_format_wide":["1st quarter","2nd quarter","3rd quarter","4th quarter"],"day_stand_alone_abbreviated":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],"month_stand_alone_narrow":["J","F","M","A","M","J","J","A","S","O","N","D"],"format_for":{"yQQQ":"QQQ y","yMMMEd":"EEE, MMM d, y","d":"d","y":"y","hms":"h:mm:ss a","MMMMd":"MMMM d","yMMMM":"MMMM y","ms":"mm:ss","M":"L","yM":"M/yyyy","MEd":"E, M/d","MMM":"LLL","Md":"M/d","yQ":"Q yyyy","yMEd":"EEE, M/d/yyyy","Hm":"H:mm","EEEd":"d EEE","Hms":"H:mm:ss","hm":"h:mm a","MMMEd":"E, MMM d","MMMMEd":"E, MMMM d","MMMd":"MMM d","yMMM":"MMM y"},"quarter_format_narrow":["1","2","3","4"],"date_formats":{"short":"M/d/yy","medium":"MMM d, y","long":"MMMM d, y","full":"EEEE, MMMM d, y"},"date_format_long":"MMMM d, y","month_stand_alone_abbreviated":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"native_language":"English","datetime_format_default":"MMM d, y h:mm:ss a","native_name":"English","day_format_narrow":["M","T","W","T","F","S","S"],"script":null,"default_time_format_length":"medium","glibc_time_format":"%H:%M:%S","native_script":null,"month_format_abbreviated":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"default_date_format_length":"medium","day_stand_alone_narrow":["M","T","W","T","F","S","S"],"day_format_abbreviated":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],"datetime_format_medium":"MMM d, y h:mm:ss a"},
        misc_info = {"delimiters":{"quotation_start":"“","quotation_end":"”","alternate_quotation_start":"‘","alternate_quotation_end":"’"},"orientation":{"lines":"top-to-bottom","characters":"left-to-right"},"posix":{"nostr":"no:n","yesstr":"yes:y"},"plural_forms":{"category_list":["one","other"],"category_rules_function":null,"category_rules":{"one":"n is 1"},"category_rules_compiled":{"one":function (n) {if ( (( n == 1))) { return 'one'; } return;}}},"cldr_formats":{"territory":"Region: {0}","_decimal_format_decimal":".","language":"Language: {0}","percent":"#,##0%","locale":"{0} ({1})","_decimal_format_group":",","_percent_format_percent":"%","decimal":"#,##0.###","ellipsis":{"medial":"{0}…{1}","final":"{0}…","initial":"…{0}"},"list_or":{"end":"{0}, or {1}","middle":"{0}, {1}","start":"{0}, {1}","2":"{0} or {1}"},"list":{"middle":"{0}, {1}","2":"{0} and {1}","start":"{0}, {1}","end":"{0}, and {1}"}},"fallback":[],"characters":{"more_information":"?"}};

    // Legacy cjt 1.0 support
    if ( context.YAHOO ) {
        context.YAHOO.util.Event.onDOMReady(function() {
            var Locale = CPANEL.Locale.generateClassFromCldr(locale, functions, datetime_info, misc_info);
            context.LOCALE = new Locale();
        });
    }

    // Modern cjt 2.0 support
    context.CJT2_loader = {
        current_locale: locale,
        CLDR: {}
    };

    var CLDR = {
        locale: locale,
        functions: functions,
        datetime_info: datetime_info,
        misc_info: misc_info
    };

    context.CJT2_loader.CLDR[locale] = CLDR;
    context.CLDR = CLDR;

})(window);
//~~END-GENERATED~~