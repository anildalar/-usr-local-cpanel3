/* jshint ignore:start */
/* TODO: Resolve remaining lint errors from legacy code */
(function() {
    var LAST_PAGE_NOTICE;

    window.save = function(form) {
        var data = CPANEL.dom.get_data_from_form(form);

        var overlay = new CPANEL.ajax.Page_Progress_Overlay(null, {
            covers: form,
            status_html: LOCALE.maketext("Saving filter “[output,class,_1,code]” …", data.filtername.html_encode())
        });
        overlay.show();

        // If we are editing, then we reload the page, WITHOUT hiding the overlay.
        var callback = CPANEL.ajax.build_page_callback(
            function(o) {
                if (WE_ARE_EDITING) {
                    overlay.set_status_now(LOCALE.maketext("Success! The filters list is reloading now."));
                    location.href = GO_BACK_URL;
                } else {
                    overlay.hide();
                    LAST_PAGE_NOTICE = new CPANEL.widgets.Dynamic_Page_Notice({
                        level: "success",
                        replaces: LAST_PAGE_NOTICE,
                        content: LOCALE.maketext("You have successfully created a new filter. You can create another one now, or you can [output,url,_1,return to the filters list].", GO_BACK_URL)
                    });
                }
            }, {
                on_error: function() {
                    overlay.hide();
                }
            }
        );

        CPANEL.api({
            module: "Email",
            func: "storefilter",
            data: data,
            callback: callback
        });
    };
}());


var workingDestEl;
var itags = ["img", "select", "input"];
var VALID_ANY_HEADER_OPTIONS = /(contains|does not contain|matches|does not match)/;

function duperow(tblname) {
    var tblC = document.getElementById(tblname + "tbl");
    var rowList = (tblC.getElementsByTagName("tbody"))[0].getElementsByClassName("filter-row");
    var lastRow = rowList[rowList.length - 1];
    var rowMatch = lastRow.id.match(/([0-9]+)/);
    var newRowNum = parseInt(rowMatch[0]) + 1;
    var newid = tblname + newRowNum;
    var newRow = document.createElement("tr");
    newRow.id = newid;
    newRow.className = "filter-row";
    var OldCols = lastRow.getElementsByClassName("filter-col");
    var newCols = [];
    for (var i = 0; i < OldCols.length; i++) {
        var colId = newCols.length;
        var newCol = document.createElement("td");
        newCol.className = "filter-col";
        newCols.push(newCol);
        newCols[colId].innerHTML = OldCols[colId].innerHTML;
    }
    var itaglist = [];
    for (var j = 0; j < itags.length; j++) {
        for (var cols = 0; cols < newCols.length; cols++) {
            itaglist.push.apply(itaglist, newCols[cols].getElementsByTagName(itags[j]));
        }
    }
    if ( tblname === "action" ) {
        itaglist.push(newCols[0].getElementsByClassName("tree-view-container")[0]);
        itaglist.push(newCols[0].getElementsByClassName("tree-view")[0]);
    }
    for (var k = 0, length = itaglist.length; k < length; k++ ) {
        if ( itaglist[k].name ) {
            itaglist[k].name = itaglist[k].name.replace(/(\d+)/, newRowNum);
        }
        if ( itaglist[k].id ) {
            itaglist[k].id = itaglist[k].id.replace(/(\d+)/, newRowNum);
        }
        if (itaglist[k].type === "button") {
            continue;
        }
        if (itaglist[k].type === "select-one") {
            itaglist[k].selectedIndex = 0;
            continue;
        }
        if (itaglist[k].value) {
            itaglist[k].value = "";
        }
    }

    for (var i = 0; i < newCols.length; i++) {
        newRow.appendChild(newCols[i]);
    }
    (tblC.getElementsByTagName("tbody"))[0].appendChild(newRow);
    checkaddrembuttons(tblname);
    return newRowNum;
}


function setDisabled(Ellist, Elmatch, key) {
    for (var i = 0; i < Ellist.length; i++) {
        if (Ellist[i].name.match(Elmatch)) {
            Ellist[i].disabled = key;
        }
    }
}

function setDisplay(Ellist, Elmatch, key) {
    for (var i = 0; i < Ellist.length; i++) {
        if (Ellist[i].name.match(Elmatch)) {
            Ellist[i].style.display = key;
        }
    }
}

function checkaddrembuttons(tblname) {
    var tblC = document.getElementById(tblname + "tbl");
    var rowList = (tblC.getElementsByTagName("tbody"))[0].getElementsByClassName("filter-row");
    var rowCount = rowList.length;
    for (var i = 0; i < rowList.length; i++) {
        var selList = rowList[i].getElementsByTagName("select");
        var inputList = rowList[i].getElementsByTagName("input");
        if (tblname == "rule") {
            if ((i + 1) < rowCount) {
                setDisplay(selList, "opt", "");
            } else {
                setDisplay(selList, "opt", "none");
            }
        }
        if (tblname == "action") {
            if (inputList[0].value.match("/dev/null") && !inputList[0].value.match(">")) {
                selList[0].selectedIndex = 0; // deliver /dev/null
                inputList[0].value = "";
                setDisplay(inputList, "dest", "none");
            }
        }
        if (rowCount > 1) {
            setDisabled(inputList, "remove", false);
        } else {
            setDisabled(inputList, "remove", true);
        }
    }
}

function addaction(bt) {
    var newRowNum = duperow("action");
    handleactionbynum(newRowNum);
}

function removeaction(bt) {
    var matchlist = bt.name.match(/(\d+)/);
    removeRow("action", matchlist[0]);
}

function addrule(bt) {
    var newRowNum = duperow("rule");
    handlepartbynum(newRowNum);
}

function removerule(bt) {
    var matchlist = bt.name.match(/(\d+)/);
    removeRow("rule", matchlist[0]);
}

function removeRow(tblname, rowid) {
    var thisrow = document.getElementById(tblname + rowid);
    thisrow.parentNode.removeChild(thisrow);
    checkaddrembuttons(tblname);
}

function handlepartbynum(snum) {
    handlepart(document.filterform["part" + snum]);
}

function handleactionbynum(snum) {
    handleaction(document.filterform["action" + snum]);
}


function handlepart(sb) {
    var matchlist = sb.name.match(/(\d+)/);
    if (matchlist[0]) {

        // default the option value if nothing is selected
        var optval = sb.selectedIndex !== -1 ? sb.options[sb.selectedIndex].value : "";
        var candonum = 0;
        var hasopts = 1;
        if (optval.match(/(not delivered|error_message)/)) {
            hasopts = 0;
        }
        if (optval.match(/Spam-Score/)) {
            candonum = 1;
        }
        var partEl = document.filterform["part" + matchlist[0]];
        var matchEl = document.filterform["match" + matchlist[0]];
        var valEl = document.filterform["val" + matchlist[0]];

        if (hasopts) {
            matchEl.style.display = "";
            valEl.style.display = "";
        } else {
            matchEl.style.display = "none";
            valEl.style.display = "none";
        }

        for (var i = 0; i < partEl.options.length; i++) {
            if (partEl.options[i].value.match(/(Spam-Status|Spam-Score|Spam-Bar)/)) {
                if (HAS_SPAM_AS_ACL && SPAM_ASSASSIN_ENABLED) {
                    partEl.options[i].disabled = false;
                } else {
                    partEl.options[i].disabled = true;
                }
            }
        }


        for (var i = 0; i < matchEl.options.length; i++) {

            // enable all options by default
            matchEl.options[i].disabled = false;

            if (matchEl.options[i].value.match(/(above|below)/)) {
                if (candonum) {
                    matchEl.options[i].disabled = false;
                } else {
                    matchEl.options[i].disabled = true;
                }
            }

            // For the Any Header option, we only want to allow the
            // contains and matches options.
            if (optval === "$message_headers") {
                matchEl.options[i].disabled = !VALID_ANY_HEADER_OPTIONS.test(matchEl.options[i].value);
            }
        }
    }
}

var foldertrees = {};

function handlebrowser(sb) {
    var matchlist;
    if (sb.value == LOCALE.maketext("Browse")) {
        sb.value = LOCALE.maketext("Cancel");
        matchlist = sb.name.match(/(\d+)/);
        if (matchlist[0]) {
            document.getElementById("treeviewCont" + matchlist[0]).style.display = "";
            workingDestEl = document.filterform["dest" + matchlist[0]];
            var idKey = matchlist[0];
            inittreeview(idKey, workingDestEl, sb);
        }
    } else {
        matchlist = sb.name.match(/(\d+)/);
        var id = "treeviewCont" + matchlist[0];
        document.getElementById(id).style.display = "none";
        sb.value = LOCALE.maketext("Browse");
        workingDestEl = 0;
    }
}


function safeencode(st) {
    var enc = encodeURIComponent(st);
    var ecp = -1;
    var safeenc = "";

    for (var i = 0; i < enc.length; i++) {

        if (ecp >= 0) {
            ecp++;
        }
        if (ecp >= 3) {
            ecp = -1;
        }
        if (ecp == 1 || ecp == 2) {
            safeenc += enc.substring(i, i + 1).toLowerCase();
        } else {
            safeenc += enc.substring(i, i + 1);
        }
        if (enc.substring(i, i + 1) == "%") {
            ecp = 0;
        }
    }


    return safeenc.replace("(", "%28").replace(")", "%29").replace(",", "%2c");
}


function parsejsonFile(o) {
    var root = YAHOO.lang.JSON.parse(o.responseText);
    if (root == null) {
        throw "There was a problem fetching the JSON file list! Please reload and try again.";
        return;
    }
    var node = o.argument.node;
    for (var i = 0; i < root.files.length; i++) {
        if (!root.files[i].name) {
            continue;
        }
        var name;
        name = root.files[i].name;
        var filePath = root.files[i].path + "%2f" + safeencode(root.files[i].name);
        var fileRelPath = root.files[i].relpath;
        var ismailbox = root.files[i].ismailbox;
        var data = {
            label: name,
            path: filePath,
            relpath: fileRelPath,
            type: root.files[i].type,
            depth: node.data.depth + 1
        };

        var newNode = new YAHOO.widget.TextNode(data, node, false);
        if (root.files[i].isleaf == "1") {
            newNode.isLeaf = true;
        }
        if (ismailbox == "1") {
            newNode.labelStyle = "icon-mailbox";
        }
    }
    o.argument.fnLoadComplete();

}

function inittreeview(idKey, destEl, sb) {
    var thisEl = document.getElementById("treeviewCont" +  idKey);
    thisEl.style.display = "";
    thisEl = document.getElementById("treeview" + idKey);
    thisEl.style.display = "";

    if (!foldertrees[idKey]) {
        var loadNodeData = function(node, fnLoadComplete) {
            var callback = {
                success: parsejsonFile,
                argument: {
                    node: node,
                    fnLoadComplete: fnLoadComplete
                }
            };

            var sUrl = "mailbrowser.json?types=dir&dir=" + node.data.path + "&account=" + encodeURIComponent(ACCOUNT_NAME);
            YAHOO.util.Connect.asyncRequest("GET", sUrl, callback, null);
        };

        var foldertree = new YAHOO.widget.TreeView("treeview" + idKey);
        foldertree.subscribe("clickEvent", nodeClick);
        foldertree.setDynamicLoad(loadNodeData, 1);
        var root = foldertree.getRoot();
        var data = {
            label: "INBOX",
            path: "mail",
            relpath: "%2f",
            type: "dir",
            depth: 1
        };

        if (ACCOUNT_NAME.match(/@/)) {
            var acctpts = ACCOUNT_NAME.split("@");
            var user = acctpts[0];
            var domain = acctpts[1];
            data.path += "%2f" + domain + "%2f" + user;
        }

        var tempNode = new YAHOO.widget.TextNode(data, root, false);
        tempNode.labelStyle = "icon-mailbox";

        tempNode.expand();
        foldertrees[idKey] = foldertree;
    }

    foldertrees[idKey].draw();
    var root = foldertrees[idKey].getRoot();
}

function nodeClick(oArgs) {
    var node = oArgs.node;

    if (workingDestEl) {
        var matchlist = workingDestEl.name.match(/(\d+)/);

        var thisEl = document.getElementById("treeviewCont" + matchlist[0]);
        thisEl.style.display = "none";

        document.filterform["changedest" + matchlist[0]].value = LOCALE.maketext("Browse");
        var path = decodeURIComponent(node.data.relpath);
        if (path == "/") {
            workingDestEl.value = "INBOX";
        } else {
            workingDestEl.value = path;
        }
    }
}

function handleaction(sb) {
    var matchlist = sb.name.match(/(\d+)/);
    if (matchlist[0]) {
        document.getElementById("action_menu" + matchlist[0]).disabled = false;
        if ( sb.selectedIndex === -1 ) {
            document.filterform["dest" + matchlist[0]].style.display = "none";
            document.filterform["changedest" + matchlist[0]].style.display = "none";
            document.filterform["changedest" + matchlist[0]].value = LOCALE.maketext("Browse");
            document.getElementById("treeviewCont" + matchlist[0]).style.display = "none";
            return;
        }

        document.getElementById("treeviewCont" + matchlist[0]).style.display = "none";

        var optval = sb.options[sb.selectedIndex].value;
        if (optval.match(/save\s*$/i)) {
            document.filterform["dest" + matchlist[0]].style.display = "";
            document.filterform["changedest" + matchlist[0]].style.display = "";
            document.filterform["changedest" + matchlist[0]].value = LOCALE.maketext("Browse");
        } else if (optval.match(/finish|null/)) {
            document.filterform["dest" + matchlist[0]].style.display = "none";
            document.filterform["changedest" + matchlist[0]].style.display = "none";
        } else {
            document.filterform["dest" + matchlist[0]].readOnly = false;
            document.filterform["dest" + matchlist[0]].style.display = "";
            document.filterform["changedest" + matchlist[0]].style.display = "none";
        }
    }
}

function getrowfromBtnEl(btEl) {
    var trEl = btEl.parentNode.parentNode;
    var matchlist = trEl.id.match(/(\d+)/);
    return matchlist[0];
}

function moveup(btEl) {
    moverow(getrowfromBtnEl(btEl), -1);
}

function movedown(btEl) {
    moverow(getrowfromBtnEl(btEl), 1);
}

function moverow(tid, offset) {
    tid--;
    var ruletbl = document.getElementById("ruletbl");
    var trlist = ruletbl.getElementsByTagName("tr");
    var lastid = null;
    for (var i = 0; i < trlist.length; i++) {
        if (i == tid) {
            var targetoffset = (i + parseInt(offset));
            if (targetoffset > trlist.length || trlist[targetoffset] == null || (targetoffset) == -1) {
                return true;
            }
            var thisParent = trlist[i].parentNode;
            var tmpchld = trlist[i];
            thisParent.removeChild(trlist[i]);
            thisParent.insertBefore(tmpchld, trlist[targetoffset]);
            break;
        }
    }

    for (var i = 0; i < trlist.length; i++) {
        trlist[i].id = trlist[i].id.replace(/(\d+)/, (i + 1));
        for (var k = 0; k < itags.length; k++) {
            var itaglist = trlist[i].getElementsByTagName(itags[k]);
            for (var j = 0; j < itaglist.length; j++) {
                itaglist[j].name = itaglist[j].name.replace(/(\d+)/, (i + 1));
            }
        }
    }
    checkaddrembuttons("rule");
}

// Validation rules for #filtername
var validate_filter_name = function() {
    var filter_name = document.getElementById("filtername").value;

    // Disallow string "Converted Rule" -- case insensitive
    if (/Converted Rule/i.test(filter_name)) {
        return false;
    }

    // Disallow string "Rule ##+" -- case insensitive
    if (/Rule \d+/i.test(filter_name)) {
        return false;
    }

    return true;
};

// Page initialization script
var init = function() {
    var validation = new CPANEL.validate.validator(LOCALE.maketext("Filter Name"));
    validation.add("filtername", validate_filter_name, LOCALE.maketext("The filter name cannot contain “[output,class,_1,code]” or “[output,class,_2,code]”.", "Rule #", "Converted Rule"));
    validation.add("filtername", "min_length(%input%, 1)", LOCALE.maketext("The filter name cannot be empty."));
    validation.attach();

    // validation.verify();

    CPANEL.validate.attach_to_form("activate-button", validation);

    // Extract the account parameter from the url
    var is_webmail = document.location.port in {
        2095: 1,
        2096: 1
    };

    if (is_webmail) {

        // remove pipe option from all action menus
        var actionMenus = DOM.getElementsByClassName("action-menu"),
            currentOption,
            optionCounter;
        for ( var i = 0, length = actionMenus.length; i < length; i++ ) {
            optionCounter = 0;
            while ( currentOption = actionMenus[i].options[optionCounter++] ) {
                if ( currentOption.value === "pipe" ) {
                    currentOption.parentNode.removeChild(currentOption);
                }
            }
        }
    }

    DOM.get("filtername").focus();

    var action_rows = DOM.get("actiontbl").rows;
    var rule_rows = DOM.get("ruletbl").rows;

    for (var r = rule_rows.length - 1; r >= 0; r--) {
        handlepartbynum(r + 1);
    }

    for (var a = action_rows.length - 1; a >= 0; a--) {
        handleactionbynum(a + 1);
    }

    checkaddrembuttons("rule");
    checkaddrembuttons("action");
};

EVENT.onDOMReady(init);
