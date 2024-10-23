// This fixes issue #2529475, which wasn't addressed in YUI 2.9.0 and
// thus will remain broken in YUI 2.
if ( !YAHOO.widget.Paginator._fixed_2529475 ) {
    ( function() {
        YAHOO.widget.Paginator._fixed_2529475 = true;

        var lang = YAHOO.lang;
        var Paginator = YAHOO.widget.Paginator;
        var Dom = DOM;
        var isArray = YAHOO.lang.isArray;

        Paginator.prototype.updateVisibility = function(e) {
            var alwaysVisible = this.get("alwaysVisible"),
                totalRecords, visible, rpp, rppOptions, i, len, opt;

            if (!e || e.type === "alwaysVisibleChange" || !alwaysVisible) {
                totalRecords = this.get("totalRecords");
                visible      = true;
                rpp          = this.get("rowsPerPage");
                rppOptions   = this.get("rowsPerPageOptions");

                if (isArray(rppOptions)) {
                    for (i = 0, len = rppOptions.length; i < len; ++i) {
                        opt = rppOptions[i];

                        // account for value 'all'
                        if (lang.isNumber(opt.value || opt)) {   // THIS IS THE FIX.
                            rpp = Math.min(rpp, (opt.value || opt));
                        }
                    }
                }

                if (totalRecords !== Paginator.VALUE_UNLIMITED &&
                totalRecords <= rpp) {
                    visible = false;
                }

                visible = visible || alwaysVisible;

                for (i = 0, len = this._containers.length; i < len; ++i) {
                    Dom.setStyle(this._containers[i], "display",
                        visible ? "" : "none");
                }
            }
        };
    }() );
}

var AJAX_ERROR_NOTICE;
window.handle_ajax_error = function(req, resp, pay) {
    var err_html;
    if ( resp.cpanel_error ) {
        err_html = resp.cpanel_error.html_encode();
    } else {
        err_html = LOCALE.maketext("An unknown error occurred.");
    }

    if (AJAX_ERROR_NOTICE) {
        AJAX_ERROR_NOTICE.cfg.setProperty("content", err_html);
    } else {
        AJAX_ERROR_NOTICE = new CPANEL.widgets.Dynamic_Page_Notice({
            level: "error",
            content: err_html,
            replaces: AJAX_ERROR_NOTICE
        } );
        AJAX_ERROR_NOTICE.destroyEvent.subscribe( function() {
            AJAX_ERROR_NOTICE = null;
        } );
    }
};

// global variables
var default_initial_hidden_columns = [];
var default_locked_columns = {};
var default_minimum_columns = 3;

// initialized in each template file.
var date_obj = {};

// used to initialize some table setup after the external JS has created a datatable and pagination
// setup a new calendar
var yui_cal = new YAHOO.widget.Calendar("cal1", "cal1Container", { "maxdate": new Date() }); // global

// Setup an event to close popups if the user "clicks off"
EVENT.on(document, "click", function(e) {
    var el = EVENT.getTarget(e);
    var cal = DOM.get("start_cal");
    var calEnd = DOM.get("end_cal");
    var calEl = DOM.get("startcal");
    var optionsEl = DOM.get("toggle_col_options");
    var emailreportEl = DOM.get("emailreport");
    var timestamp = (new Date()).getTime();
    if (el != optionsEl && !DOM.isAncestor(emailreportEl, el)) {
        if ("emailreportpanel" in window) {
            if (timestamp - emailreportpanel.timestamp > 500) {
                emailreportpanel.hide();
            }
        }
    }
    if (el != optionsEl && !DOM.isAncestor(optionsEl, el) && !DOM.isAncestor(DOM.get("col_options"), el)) {
        header_panel.hide();
    }
    if (el != cal && !DOM.isAncestor(cal, el)) {
        if ((el != calEl && !DOM.isAncestor(calEl, el)) && (el != calEnd && !DOM.isAncestor(calEnd, el))) {
            cal_panel.hide();
        }
    }
} );

// Calendar panel.
// Holds the calendar
var cal_panel = new YAHOO.widget.Panel("startcal", {
    close: false,
    visible: false,
    draggable: false,
    modal: false,
    underlay: "none",
    constraintoviewport: true,
    width: "250px",
    context: ["startdate", "bl", "bl", ["beforeShow", "windowResize"]]
});
cal_panel.render();
DOM.get("startcal_c").className = "hidden_panel";
DOM.get("startcal").className = "cal_interior";


// Header selector panel (gear icon)
// column selector checkboxes
var header_panel = new YAHOO.widget.Overlay("col_options", {
    close: true,
    visible: false,
    draggable: false,
    constraintoviewport: false,
    width: "250px",
    context: ["toggle_col_options", "tr", "tr", ["beforeShow", "windowResize"]]
});
header_panel.render();

// -----------------------------------------Main Functions

// Toggle the very top search area (with the calendars) visibility.
function toggle_inquiry() {

    if (DOM.get("container_box").style.display == "none") {
        CPANEL.animate.slide_down("container_box");
        DOM.get("toggle_inquiry_text").innerHTML = LOCALE.maketext("Hide");
    } else {
        CPANEL.animate.slide_up("container_box");
        DOM.get("toggle_inquiry_text").innerHTML = LOCALE.maketext("Reconfigure Search");
    }
}

( function() {
    var _sliding_shut = false;

    if ( DOM.get("filterItems") ) {
        CPANEL.nvdata.register( "show_advanced", function() {
            return (!_sliding_shut && (DOM.getStyle("filterItems", "display") !== "none")) ? 1 : 0;
        } );
    }

    window.toggle_filter = function() {

        // onclick event, display/hide the filter checkboxes (advanced search).
        if (DOM.get("filterItems").offsetHeight) {
            _sliding_shut = true;
            CPANEL.animate.slide_up("filterItems").onComplete.subscribe( function() {
                _sliding_shut = false;
            } );
        } else {
            CPANEL.animate.slide_down("filterItems");
        }

        CPANEL.nvdata.save();

        return false;
    };
}() );

var date_clicked = function() {

    // A date was clicked on the calendar.
    date_picked = yui_cal.getSelectedDates()[0];
    date_obj.value = date_picked.to_ymd_string();
    date_obj.focus();
    cal_panel.hide();
};

function _show_cal( input_el, mindate, maxdate ) {

    // onclick event, display the end date calendar selector.
    if (cal_panel.cfg.getProperty("visible")) {
        cal_panel.hide();
        return;
    }
    cal_panel.hide();
    if (!("retention" in window)) {
        retention = 90;
    }
    if (!mindate && retention > 0) {
        mindate = new Date(new Date().getTime() - (retention * 86400000));
    }
    input_el = DOM.get(input_el);
    var the_date = CPANEL.Locale.ymd_string_to_date(input_el.value.trim());
    if (!the_date) {
        the_date = new Date();
    }

    // NB: "selected" must be a string, not a Date
    // TODO: Wrap configSelected to accept a Date object
    yui_cal.cfg.setProperty("selected", the_date.getMonth() + 1 + "/" + the_date.getDate() + "/" + the_date.getFullYear());

    yui_cal.cfg.setProperty("pagedate", the_date);

    yui_cal.cfg.setProperty("maxdate", maxdate);
    if (mindate) {
        yui_cal.cfg.setProperty("mindate", mindate);
    }
    yui_cal.render();
    yui_cal.show();

    cal_panel.cfg.setProperty("context", [input_el, "tl", "bl", ["beforeShow", "windowResize"]]);
    cal_panel.show();

    date_obj = input_el;
}

function show_end_cal() {
    var the_date = new Date();
    var maxdate = the_date.getMonth() + 1 + "/" + (the_date.getDate() + 1) + "/" + the_date.getFullYear();
    _show_cal("enddate", CPANEL.Locale.ymd_string_to_date(DOM.get("startdate").value), maxdate );
}

function show_start_cal() {
    _show_cal("startdate", null, CPANEL.Locale.ymd_string_to_date(DOM.get("enddate").value) || new Date());
}

function init_start_end_times( starttime_cfg ) {
    var now = new Date();

    var tomorrow = new Date(now); tomorrow.setDate( tomorrow.getDate() + 1 );

    if ( !DOM.get("enddate").value ) {
        DOM.get("enddate").value = tomorrow.to_ymd_string();
    }
    if ( !DOM.get("endtime").value ) {
        DOM.get("endtime").value = tomorrow.getHours() + ":" + tomorrow.getMinutes();
    }

    var start = new Date(now);

    switch (starttime_cfg) {
        case "twomonth":
            start.setMonth( start.getMonth() - 2 );
            break;
        case "month":
            start.setMonth( start.getMonth() - 1 );
            break;
        case "today":
            start.setDate( start.getDate() );
            start.setTime( start.getTime() - 7200000);
            break;
        default:   // "yesterday", etc.
            start.setDate( start.getDate() - 1 );
    }

    if ( !DOM.get("startdate").value ) {
        DOM.get("startdate").value = start.to_ymd_string();
    }
    if ( !DOM.get("starttime").value ) {
        DOM.get("starttime").value = start.getHours() + ":" + start.getMinutes();
    }
}

// TODO: Abstract this h:m parsing logic.
function get_start_end_times() {
    var start = CPANEL.Locale.ymd_string_to_date(DOM.get("startdate").value);
    if (start) {
        var strStartTime = DOM.get("starttime").value;
        start.setHours( (strStartTime.match(/^\d+/) || [0])[0] );
        start.setMinutes( (strStartTime.match(/:(\d+)/) || [0, 0])[1] );
    }

    var end = CPANEL.Locale.ymd_string_to_date(DOM.get("enddate").value);
    if (end) {
        var strEndTime = DOM.get("endtime").value;
        end.setHours( (strEndTime.match(/^\d+/) || [0])[0] );
        end.setMinutes( (strEndTime.match(/:(\d+)/) || [0, 0])[1] );
    }
    return [start, end];
}

function fade_table_out() {
    DOM.setStyle(eximstatstbl.deliveryreport.dt.getTableEl(), "opacity", 0.25);
};
function fade_table_in() {
    DOM.setStyle(eximstatstbl.deliveryreport.dt.getTableEl(), "opacity", 1);
};

function doupdate() {

    // called when the "get results" button is clicked, or the filter checkboxes are changed.
    if (DOM.get("hide_inquiry")) {
        DOM.get("hide_inquiry").style.display = "block";
    }
    DOM.get("bottom-nav").style.display = "block";
    DOM.get("option_header").style.display = "block";

    // convert date and time to unixtime.
    eximstatstbl.loadUnixTimes();

    if ( !eximstatstbl.deliveryreport ) {
        eximstatstbl.updatedata();
        eximstatstbl.deliveryreport.ds.subscribe( "dataErrorEvent", hide_spinner );
        eximstatstbl.deliveryreport.ds.subscribe( "responseEvent", hide_spinner );

        CPANEL.nvdata.register( "table_sort", function() {
            return eximstatstbl.deliveryreport.dt.getState().sortedBy;
        } );
        eximstatstbl.deliveryreport.dt.subscribe( "sortedByChange", function(args) {
            var changed = (args.prevValue.key !== args.newValue.key)
                || (args.prevValue.dir !== args.newValue.dir);

            if (changed) {
                CPANEL.nvdata.save();
            }
        } );

        fade_table_out();
        eximstatstbl.deliveryreport.ds.subscribe( "requestEvent", fade_table_out );
        eximstatstbl.deliveryreport.ds.subscribe( "dataErrorEvent", fade_table_in );
        eximstatstbl.deliveryreport.ds.subscribe( "responseEvent", fade_table_in );

        // we haven't built the html for the filter header checkboxes do so now.
        var keys = eximstatstbl.deliveryreport.dt.getColumnSet().keys;
        var i;

        // TODO: pull markup into template

        var header_panel_html = '<div class="check-all"><input id="toggle_all_checkbox" type="checkbox" onchange="toggle_all_headers()" /> <label id="toggle_all_label" for="toggle_all_checkbox">' + LOCALE.maketext("Select All") + "</label></div>";
        var num_keys = keys.length;
        for (i = 0; i < num_keys; i++) {
            header_panel_html += '<div class="toggle_checkbox_row"><input type=checkbox checked id="key_' + keys[i].key + '" ';
            if (keys[i].key in default_locked_columns) {
                header_panel_html += 'disabled="disabled"';
            }
            header_panel_html += ' onclick="filterHeaders(\'' + keys[i].key + '\'); CPANEL.nvdata.save()"/> <label id="label_' + keys[i].key + '" ';
            if (keys[i].key in default_locked_columns) {
                header_panel_html += ' class="disabled-label" ';
            }
            header_panel_html += ' for="key_' + keys[i].key + '">' + ((keys[i].label === "") ? (" " + LOCALE.maketext("Checkboxes")) : keys[i].label) + "</label></div>";
        }
        header_panel_html += "<div class='reset-to-default'><button onclick='reset_headers()'>" + LOCALE.maketext("Reset to Default") + "</button></div>";
        DOM.get("option_area").innerHTML = header_panel_html;


        // setup default table option visibility...
        for (i = default_initial_hidden_columns.length - 1; i >= 0; i--) {
            var El = DOM.get("key_" + default_initial_hidden_columns[i]);
            if (El) {
                El.checked = false;
            } else if (window.console) {
                console.warn("Failed to find the column key for " + default_initial_hidden_columns[i]);
            }
        }

        // for each key/header make sure it is correctly visible/invisible.
        for (i = 0; i < keys.length; i++) {
            filterHeaders(keys[i].key);
        }

        header_panel.cfg.setProperty("context", ["toggle_col_options", "tr", "tr"]);

        eximstatstbl.deliveryreport.dt.get("paginator").subscribe("totalRecordsChange", function() {
            var total_items = this.getTotalRecords();
            DOM.get("results-header").innerHTML = LOCALE.maketext("The search matches [quant,_1,record,records].", total_items);
        } );

        // Call any local setup code
        if ( typeof initial_setup_callback !== "undefined" ) {
            initial_setup_callback();
        }
    } else {
        if (THE_PAGINATOR.getCurrentPage() > 1) {
            THE_PAGINATOR.setPage(1);
        } else {
            eximstatstbl.updatedata();
        }
    }
    if ("set_checkbox_header" in window) {
        set_checkbox_header();
    }
}

function reset_headers() {
    var keys = eximstatstbl.deliveryreport.dt.getColumnSet().keys;
    if (!("resetColumns" in window)) {
        resetColumns = [];
    }
    if ("failview" in resetColumns) {

        // exception for emailstats_summary which allows only for 2 initial states
        failview(resetColumns.failview);
        return;
    }
    for (var i = 0; i < keys.length; i++) {
        var El = DOM.get("key_" + keys[i].key);
        El.checked = true;
        for (var ii = 0; ii < resetColumns.length; ii++) {
            if (resetColumns[ii] == keys[i].key) {
                El.checked = false;
            }
        }
        last_header_state[keys[i].key] = El.checked;
        filterHeaders(keys[i].key, true);
    }
    CPANEL.nvdata.save();
}

var last_header_state = {};
function toggle_all_headers() {
    var keys = eximstatstbl.deliveryreport.dt.getColumnSet().keys;
    var is_set_to_all = DOM.get("toggle_all_checkbox").checked;
    for (var i = 0; i < keys.length; i++) {
        var El = DOM.get("key_" + keys[i].key);
        if (is_set_to_all) {
            last_header_state[keys[i].key] = El.checked;
            El.checked = true;
        } else {
            El.checked = last_header_state[keys[i].key];
        }
        filterHeaders(keys[i].key);
    }
}

function toggle_options() {

    // show the table header filter options display pane (gear icon)
    header_panel.cfg.setProperty("context", ["toggle_col_options", "tr", "tr", ["beforeShow", "windowResize"]]);
    header_panel.show();
    header_panel.align();
    DOM.get("col_options").style.visibility = "visible";
    return false;
}

function filterHeaders(key, forced) {
    var total_showing = 0;
    var i;
    var keys = eximstatstbl.deliveryreport.dt.getColumnSet().keys;
    if (!forced) {
        for (i = 0; i < keys.length; i++) {
            if (DOM.get("key_" + keys[i].key).checked) {
                total_showing++;
            }
        }

        if (total_showing == default_minimum_columns)  {
            for (i = 0; i < keys.length; i++) {
                if (DOM.get("key_" + keys[i].key).checked) {
                    DOM.get("key_" + keys[i].key).disabled = true;
                    YAHOO.util.Dom.addClass("label_" + keys[i].key, "disabled-label");
                }
            }
        } else {
            for (i = 0; i < keys.length; i++) {
                if (!(keys[i].key in default_locked_columns)) {
                    DOM.get("key_" + keys[i].key).disabled = false;
                    YAHOO.util.Dom.removeClass("label_" + keys[i].key, "disabled-label");
                }
            }
        }
    }

    if (DOM.get("key_" + key).checked) {
        eximstatstbl.deliveryreport.dt.showColumn(key);
    } else {
        eximstatstbl.deliveryreport.dt.hideColumn(key);
        DOM.get("toggle_all_checkbox").checked = false;
    }
}

CPANEL.nvdata.register( "hidden_columns", function() {
    return eximstatstbl.deliveryreport.dt.getColumnSet().flat.map( function(c) {
        return c.hidden ? c.key : false;
    } ).filter(Boolean);
} );

CPANEL.nvdata.register( "rows_per_page", function() {
    return eximstatstbl.deliveryreport.dt.get("paginator").getRowsPerPage();
} );

if ( DOM.get("advanced-form") ) {
    CPANEL.nvdata.register( "show_success", function() {
        return DOM.get("advanced-form").success.checked ? 1 : 0;
    } );
    CPANEL.nvdata.register( "show_failure", function() {
        return DOM.get("advanced-form").failure.checked ? 1 : 0;
    } );
    CPANEL.nvdata.register( "show_defer", function() {
        return DOM.get("advanced-form").defer.checked ? 1 : 0;
    } );
    CPANEL.nvdata.register( "show_inprogress", function() {
        return DOM.get("advanced-form").inprogress.checked ? 1 : 0;
    } );
}

function check_filter() {

    // A filter checkbox has been checked or unchecked.
    // This disallows unchecking all the boxes.
    var advanced = CPANEL.dom.get_data_from_form("advanced-form");
    if ( !advanced.defer && !advanced.failure && !advanced.success && !advanced.inprogress ) {
        alert( LOCALE.maketext("You must show at least one message type.") );
        return false;
    }
    setSpinner();

    doupdate();

    CPANEL.nvdata.save();
}

var stylesheet_location = TIMESELECTOR_STYLESHEET;

YAHOO.util.Event.onDOMReady( function() {
    if (!("no_time_init" in window)) {
        if (DOM.get("starttime")) {
            new CPANEL.time_selector("starttime", {
                stylesheet: stylesheet_location
            });
        }

        if (DOM.get("endtime")) {
            new CPANEL.time_selector("endtime", {
                stylesheet: stylesheet_location
            });
        }
    }
});

// Cleanup -- do a calendar subscription now that it's defined.
yui_cal.selectEvent.subscribe(date_clicked, yui_cal, true);

if (typeof (window["setSpinner"]) === "undefined") {

// Handle the "Run Report" ajax spinner.
    var setSpinner = function() {
        var run_button = DOM.get("run-button");
        var spinner = DOM.get("spinner");
        var spinner_text = DOM.get("spinner-text");
        return function() {
            spinner.style.width = run_button.offsetWidth + "px";
            DOM.setStyle(spinner_text, "opacity", .2);
            spinner.style.display = "block";
            run_button.disabled = true;
        };
    }();

    var hide_spinner = function() {
        var run_button = DOM.get("run-button");
        var spinner = DOM.get("spinner");
        var spinner_text = DOM.get("spinner-text");
        return function() {
            spinner.style.display = "none";
            DOM.setStyle(spinner_text, "opacity", 1);
            run_button.disabled = false;
        };
    }();
}

// TODO: Subclass this paginator
( function() {

    var DEFAULT_ROWS_PER_PAGE = window.DEFAULT_ROWS_PER_PAGE || 25;

    var rpp_opts = [ 10, 25, 50, 100, 500, 1000 ];

    var rpp = CPANEL.nvdata.initial && Number(CPANEL.nvdata.initial.rows_per_page);
    if ( !rpp || (rpp_opts.indexOf(rpp) === -1) ) {   // validate nvdata rpp
        rpp = DEFAULT_ROWS_PER_PAGE;
    }

    rpp_opts = rpp_opts.map( function(n) {
        return { value: n, text: LOCALE.maketext("Show [quant,_1,Result,Results]", n) };
    } );

    window.THE_PAGINATOR = new YAHOO.widget.Paginator( {
        alwaysVisible: false,
        previousPageLinkLabel: "&nbsp;",
        previousPageLinkTitle: LOCALE.maketext("Previous Page"),
        nextPageLinkLabel: "&nbsp;",
        nextPageLinkTitle: LOCALE.maketext("Next Page"),
        rowsPerPage: rpp,
        rowsPerPageOptions: rpp_opts,

        // pageReportTemplate: ... See below.
        template: "<span class='page-nav'>{PreviousPageLink}{CurrentPageReport}{NextPageLink}</span>{JumpToPageDropdown}{RowsPerPageDropdown}",
        containers: [ "top-page-nav", "bottom-page-nav" ]
    } );
    var wrapped_selects = [];
    THE_PAGINATOR.on( "render", function() {
        this.getContainerNodes().forEach( function(c) {
            var selects = c.getElementsByTagName("select");
            for (var s = selects.length - 1; s >= 0; s--) {
                wrapped_selects.push( new CPANEL.widgets.Wrapped_Select(selects[s]) );
            }
        } );
    } );

    // curiously, rowsPerPageChange fires even if there's no change.
    THE_PAGINATOR.on( "rowsPerPageChange", function(args) {
        if (args.prevValue !== args.newValue) {
            CPANEL.nvdata.save();
        }
    } );

    // We can't use the pageReportTemplate attribute because we want to format the #s.
    // So we override this function entirely.
    YAHOO.widget.Paginator.ui.CurrentPageReport.sprintf = function(t, values) {
        return LOCALE.maketext("Page [numf,_1] of [numf,_2]", values.currentPage, values.totalPages);
    };

    var rpp_update = YAHOO.widget.Paginator.ui.RowsPerPageDropdown.prototype.update;
    YAHOO.widget.Paginator.ui.RowsPerPageDropdown.prototype.update = function() {
        var ret = rpp_update.apply(this, arguments);
        wrapped_selects.forEach( function(ws) {
            ws.synchronize_label();
        } );
        return ret;
    };

    var rpp_render = YAHOO.widget.Paginator.ui.RowsPerPageDropdown.prototype.render;
    YAHOO.widget.Paginator.ui.RowsPerPageDropdown.prototype.render = function() {
        var ret = rpp_render.apply(this, arguments);
        this.select.title = LOCALE.maketext("Rows per Page");
        return ret;
    };

    var jtp_update = YAHOO.widget.Paginator.ui.JumpToPageDropdown.prototype.update;
    YAHOO.widget.Paginator.ui.JumpToPageDropdown.prototype.update = function() {
        var ret = jtp_update.apply(this, arguments);
        var opts = this.select.options;
        for (var o = opts.length - 1; o >= 0; o--) {
            opts[o].innerHTML = LOCALE.maketext("Page [numf,_1]", opts[o].value);
        }
        this.select.disabled = (opts.length < 2);
        wrapped_selects.forEach( function(ws) {
            ws.synchronize_label();
        } );
        return ret;
    };

    var jtp_render = YAHOO.widget.Paginator.ui.JumpToPageDropdown.prototype.render;
    YAHOO.widget.Paginator.ui.JumpToPageDropdown.prototype.render = function() {
        var ret = jtp_render.apply(this, arguments);
        this.select.title = LOCALE.maketext("Jump to page.");
        return ret;
    };
}() );
