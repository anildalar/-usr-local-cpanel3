//-------------------------------------------------------------
// CLDR Data for vi
//-------------------------------------------------------------
(function(context) {
    var locale = "vi",
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
        datetime_info = {"territory":null,"quarter_stand_alone_narrow":["1","2","3","4"],"time_formats":{"short":"HH:mm","medium":"HH:mm:ss","long":"HH:mm:ss z","full":"HH:mm:ss zzzz"},"era_narrow":["tr. CN","sau CN"],"datetime_format_full":"HH:mm:ss zzzz EEEE, 'ngày' dd MMMM 'năm' y","glibc_date_1_format":"%a %b %e %H:%M:%S %Z %Y","datetime_format_long":"HH:mm:ss z 'Ngày' dd 'tháng' M 'năm' y","date_format_short":"dd/MM/yyyy","native_variant":null,"name":"Vietnamese","language_id":"vi","era_wide":["BCE","CE"],"variant_id":null,"date_format_medium":"dd-MM-yyyy","time_format_default":"HH:mm:ss","era_abbreviated":["tr. CN","sau CN"],"datetime_format":"{0} {1}","month_format_wide":["tháng một","tháng hai","tháng ba","tháng tư","tháng năm","tháng sáu","tháng bảy","tháng tám","tháng chín","tháng mười","tháng mười một","tháng mười hai"],"quarter_format_abbreviated":["Q1","Q2","Q3","Q4"],"datetime_format_short":"HH:mm dd/MM/yyyy","glibc_datetime_format":"%a %b %e %H:%M:%S %Y","quarter_stand_alone_abbreviated":["Q1","Q2","Q3","Q4"],"script_id":null,"prefers_24_hour_time":1,"cldr_version":"1.7.1","day_format_wide":["Thứ hai","Thứ ba","Thứ tư","Thứ năm","Thứ sáu","Thứ bảy","Chủ nhật"],"language":"Vietnamese","month_format_narrow":["thg 1","thg 2","thg 3","thg 4","thg 5","thg 6","thg 7","thg 8","thg 9","thg 10","thg 11","thg 12"],"time_format_full":"HH:mm:ss zzzz","date_format_default":"dd-MM-yyyy","am_pm_abbreviated":["SA","CH"],"native_territory":null,"glibc_time_12_format":"%I:%M:%S %p","month_stand_alone_wide":["tháng một","tháng hai","tháng ba","tháng tư","tháng năm","tháng sáu","tháng bảy","tháng tám","tháng chín","tháng mười","tháng mười một","tháng mười hai"],"time_format_long":"HH:mm:ss z","day_stand_alone_wide":["Thứ hai","Thứ ba","Thứ tư","Thứ năm","Thứ sáu","Thứ bảy","Chủ nhật"],"variant":null,"id":"vi","available_formats":null,"quarter_stand_alone_wide":["Q1","Q2","Q3","Q4"],"time_format_medium":"HH:mm:ss","time_format_short":"HH:mm","date_format_full":"EEEE, 'ngày' dd MMMM 'năm' y","territory_id":null,"first_day_of_week":"1","glibc_date_format":"%m/%d/%y","quarter_format_wide":["Q1","Q2","Q3","Q4"],"day_stand_alone_abbreviated":["Th 2","Th 3","Th 4","Th 5","Th 6","Th 7","CN"],"month_stand_alone_narrow":["1","2","3","4","5","6","7","8","9","10","11","12"],"format_for":{"yQQQ":"QQQ y","yMMMEd":"EEE, d MMM y","d":"d","y":"y","hms":"h:mm:ss a","MMMMd":"d MMMM","yMMMM":"MMMM y","ms":"mm:ss","M":"L","yM":"y-M","MEd":"E, d-M","MMM":"LLL","Md":"d-M","yQ":"Q yyyy","yMEd":"EEE, d-M-yyyy","Hm":"H:mm","EEEd":"d EEE","Hms":"H:mm:ss","hm":"h:mm a","MMMEd":"E d MMM","MMMMEd":"E d MMMM","MMMd":"d MMM","yMMM":"MMM y"},"quarter_format_narrow":["1","2","3","4"],"date_formats":{"short":"dd/MM/yyyy","medium":"dd-MM-yyyy","long":"'Ngày' dd 'tháng' M 'năm' y","full":"EEEE, 'ngày' dd MMMM 'năm' y"},"date_format_long":"'Ngày' dd 'tháng' M 'năm' y","month_stand_alone_abbreviated":["thg 1","thg 2","thg 3","thg 4","thg 5","thg 6","thg 7","thg 8","thg 9","thg 10","thg 11","thg 12"],"native_language":"Tiếng Việt","datetime_format_default":"HH:mm:ss dd-MM-yyyy","native_name":"Tiếng Việt","day_format_narrow":["Th 2","Th 3","Th 4","Th 5","Th 6","Th 7","CN"],"script":null,"default_time_format_length":"medium","glibc_time_format":"%H:%M:%S","native_script":null,"month_format_abbreviated":["thg 1","thg 2","thg 3","thg 4","thg 5","thg 6","thg 7","thg 8","thg 9","thg 10","thg 11","thg 12"],"default_date_format_length":"medium","day_stand_alone_narrow":["2","3","4","5","6","7","1"],"day_format_abbreviated":["Th 2","Th 3","Th 4","Th 5","Th 6","Th 7","CN"],"datetime_format_medium":"HH:mm:ss dd-MM-yyyy"},
        misc_info = {"delimiters":{"quotation_start":"“","quotation_end":"”","alternate_quotation_start":"‘","alternate_quotation_end":"’"},"orientation":{"lines":"top-to-bottom","characters":"left-to-right"},"posix":{"nostr":{"draft":"contributed","content":"no:n"},"yesstr":{"draft":"contributed","content":"yes:y"}},"plural_forms":{"category_list":["other"],"category_rules_function":null,"category_rules":{},"category_rules_compiled":{}},"cldr_formats":{"territory":"Vùng: {0}","_decimal_format_decimal":",","language":"Ngôn ngữ: {0}","percent":"#,##0%","locale":"{0} ({1})","_decimal_format_group":".","_percent_format_percent":"%","decimal":"#,##0.###","ellipsis":{"medial":"{0}…{1}","final":"{0}…","initial":"…{0}"},"list_or":{"2":"{0} hoặc {1}","start":"{0}, {1}","middle":"{0}, {1}","end":"{0} hoặc {1}"},"list":{"middle":"{0}, {1}","2":"{0} và {1}","start":"{0}, {1}","end":"{0} và {1}"}},"fallback":[],"characters":{"more_information":"?"}};

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