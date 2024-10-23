//-------------------------------------------------------------
// CLDR Data for ms
//-------------------------------------------------------------
(function(context) {
    var locale = "ms",
        functions = {'get_plural_form':function(n){var category;var category_values=Array.prototype.slice.call(arguments,1);var has_extra_for_zero=0;var abs_n=Math.abs(n);var category_process_order=["zero","one","two","few","many","other"];var category_rules_lookup={};for(i=0;i<category_process_order.length;i++){if(category_rules_lookup[category_process_order[i]]){category=category_rules_lookup[category_process_order[i]](abs_n);if(category)break;}}
var categories=["other"];if(category_values.length===0){category_values=categories;}
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
        datetime_info = {"territory":null,"quarter_stand_alone_narrow":["1","2","3","4"],"time_formats":{"short":"h:mm","medium":"h:mm:ss a","long":"h:mm:ss a z","full":"h:mm:ss a zzzz"},"era_narrow":["S.M.","T.M."],"datetime_format_full":"EEEE dd MMM y h:mm:ss a zzzz","glibc_date_1_format":"%a %b %e %H:%M:%S %Z %Y","datetime_format_long":"dd MMMM y h:mm:ss a z","date_format_short":"dd/MM/yyyy","native_variant":null,"name":"Malay","language_id":"ms","era_wide":["BCE","CE"],"variant_id":null,"date_format_medium":"dd MMM y","time_format_default":"h:mm:ss a","era_abbreviated":["S.M.","T.M."],"datetime_format":"{1} {0}","month_format_wide":["Januari","Februari","Mac","April","Mei","Jun","Julai","Ogos","September","Oktober","November","Disember"],"quarter_format_abbreviated":["S1","S2","S3","S4"],"datetime_format_short":"dd/MM/yyyy h:mm","glibc_datetime_format":"%a %b %e %H:%M:%S %Y","quarter_stand_alone_abbreviated":["S1","S2","S3","S4"],"script_id":null,"prefers_24_hour_time":0,"cldr_version":"1.7.1","day_format_wide":["Isnin","Selasa","Rabu","Khamis","Jumaat","Sabtu","Ahad"],"language":"Malay","month_format_narrow":["1","2","3","4","5","6","7","8","9","10","11","12"],"time_format_full":"h:mm:ss a zzzz","date_format_default":"dd MMM y","am_pm_abbreviated":["AM","PM"],"native_territory":null,"glibc_time_12_format":"%I:%M:%S %p","month_stand_alone_wide":["Januari","Februari","Mac","April","Mei","Jun","Julai","Ogos","September","Oktober","November","Disember"],"time_format_long":"h:mm:ss a z","day_stand_alone_wide":["Isnin","Selasa","Rabu","Khamis","Jumaat","Sabtu","Ahad"],"variant":null,"id":"ms","available_formats":null,"quarter_stand_alone_wide":["suku pertama","suku kedua","suku ketiga","suku keempat"],"time_format_medium":"h:mm:ss a","time_format_short":"h:mm","date_format_full":"EEEE dd MMM y","territory_id":null,"first_day_of_week":"1","glibc_date_format":"%m/%d/%y","quarter_format_wide":["suku pertama","suku kedua","suku ketiga","suku keempat"],"day_stand_alone_abbreviated":["Isn","Sel","Rab","Kha","Jum","Sab","Ahd"],"month_stand_alone_narrow":["1","2","3","4","5","6","7","8","9","10","11","12"],"format_for":{"yQQQ":"y QQQ","yMMMEd":"EEE, y MMM d","d":"d","y":"y","hms":"h:mm:ss a","MMMMd":"MMMM d","yMMMM":"y MMMM","ms":"mm:ss","M":"L","yM":"y-M","MEd":"E, M-d","MMM":"LLL","Md":"M-d","yQ":"y Q","yMEd":"EEE, y-M-d","Hm":"H:mm","EEEd":"d EEE","Hms":"H:mm:ss","hm":"h:mm a","MMMEd":"E MMM d","MMMMEd":"E MMMM d","MMMd":"MMM d","yMMM":"y MMM"},"quarter_format_narrow":["1","2","3","4"],"date_formats":{"short":"dd/MM/yyyy","medium":"dd MMM y","long":"dd MMMM y","full":"EEEE dd MMM y"},"date_format_long":"dd MMMM y","month_stand_alone_abbreviated":["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ogos","Sep","Okt","Nov","Dis"],"native_language":"Bahasa Melayu","datetime_format_default":"dd MMM y h:mm:ss a","native_name":"Bahasa Melayu","day_format_narrow":["2","3","4","5","6","7","1"],"script":null,"default_time_format_length":"medium","glibc_time_format":"%H:%M:%S","native_script":null,"month_format_abbreviated":["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ogos","Sep","Okt","Nov","Dis"],"default_date_format_length":"medium","day_stand_alone_narrow":["2","3","4","5","6","7","1"],"day_format_abbreviated":["Isn","Sel","Rab","Kha","Jum","Sab","Ahd"],"datetime_format_medium":"dd MMM y h:mm:ss a"},
        misc_info = {"delimiters":{"quotation_start":"“","quotation_end":"”","alternate_quotation_start":"‘","alternate_quotation_end":"’"},"orientation":{"lines":"top-to-bottom","characters":"left-to-right"},"posix":{"nostr":"tidak:t","yesstr":"ya:y"},"plural_forms":{"category_list":["other"],"category_rules_function":null,"category_rules":{},"category_rules_compiled":{}},"cldr_formats":{"territory":"Region: {0}","_decimal_format_decimal":".","language":"Language: {0}","percent":"#,##0%","locale":"{0} ({1})","_decimal_format_group":",","_percent_format_percent":"%","decimal":"#,##0.###","ellipsis":{"medial":"{0}…{1}","final":"{0}…","initial":"…{0}"},"list_or":{"start":"{0}, {1}","middle":"{0}, {1}","end":"{0}, atau {1}","2":"{0} atau {1}"},"list":{"middle":"{0}, {1}","2":"{0} dan {1}","start":"{0}, {1}","end":"{0}, dan {1}"}},"fallback":[],"characters":{"more_information":"?"}};

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