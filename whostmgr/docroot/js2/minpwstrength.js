(function() {
    var topConstraint = 0;
    var bottomConstraint = 200;
    var scaleFactor = 0.5;
    var keyIncrement = 10;
    var tickSize = 2;

    var _lock = YAHOO.widget.Slider.prototype.lock;
    var _unlock = YAHOO.widget.Slider.prototype.unlock;
    YAHOO.lang.augmentObject(YAHOO.widget.Slider.prototype, {
        get_real_value: function() {
            return Math.round(this.getValue() * scaleFactor);
        },

        lock: function() {
            _lock.apply(this);
            DOM.addClass(this.id, "disabled");
        },
        unlock: function() {
            _unlock.apply(this);
            DOM.removeClass(this.id, "disabled");
        },
    });


    var sliders = {};

    STRENGTHS.forEach(function(key) {
        var slider,
            enabler = DOM.get(key + "-enabled"),
            bg = key + "-slider-bg",
            thumb = key + "-slider-thumb",
            valuearea = key + "-slider-value",
            textfield = key;

        EVENT.onDOMReady(function() {
            slider = YAHOO.widget.Slider.getHorizSlider(bg,
                thumb, topConstraint, bottomConstraint, tickSize);

            sliders[key] = slider;

            slider.subscribe("change", function(offsetFromStart) {
                var fld = DOM.get(textfield);
                var actualValue = slider.get_real_value();
                fld.value = actualValue;
                if (enabler) {
                    enabler.checked = true;
                }
                DOM.get(bg).title = LOCALE.maketext("The password strength must be at least [numf,_1].", actualValue);
            });

            if (enabler) {
                EVENT.on(enabler, "click", function(e) {
                    if (!this.checked) {
                        var textFieldEl = DOM.get(textfield);
                        if (textFieldEl.id == "minpwstrength") {
                            textFieldEl.value = "0";
                        } else {
                            textFieldEl.value = "";
                        }
                    }
                });
            }

            var copy_text_to_slider = function() {
                var v = parseFloat(DOM.get(textfield).value, 10);
                if (typeof v === "number") {
                    if (enabler) {
                        enabler.checked = true;
                    }
                    if (v > MAX_STRENGTH) {
                        v = MAX_STRENGTH;
                    }
                    slider.setValue(Math.round(v / scaleFactor), true);
                }
            };

            if (CPANEL.dom.has_oninput) {
                EVENT.on(textfield, "input", copy_text_to_slider);
            } else { // IE 8
                EVENT.on(textfield, "keyup", copy_text_to_slider);
                EVENT.on(textfield, "paste", copy_text_to_slider);
            }
            if (!enabler || enabler.checked) {
                copy_text_to_slider();
            }
        });
    });

    var form;
    var formData; // eslint-disable-line no-unused-vars
    var newFormData;
    var notification;

    document.addEventListener("DOMContentLoaded", () => {
        form = document.forms["the_form"];
        formData = CPANEL.dom.get_data_from_form(form);
    });

    function tryFetchingAgain(url, remainingTries) {
        if (remainingTries < 0) {
            return Promise.reject();
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(tryFetching(url, remainingTries));
            }, 5000);
        });
    }

    function tryFetching(url, remainingTries) {
        return fetch(url)
            .then(response => response.json())
            .then(result => {
                if (result && result.data && result.data.service && result.data.service[0]) {
                    let status = result.data.service[0].running;

                    return status === 1 || tryFetchingAgain(url, --remainingTries);
                }
            })
            .catch(() => {
                return tryFetchingAgain(url, --remainingTries);
            });
    }


    function checkServiceStatus(service) {
        const url = `${this.CPANEL.security_token}/json-api/servicestatus?api.version=1&service=${service}`;
        const remainingTries = 3;

        return tryFetching(url, remainingTries);
    }

    function captureNewFormData() {
        newFormData = CPANEL.dom.get_data_from_form(form);

        return buildDataForApi();
    }

    function showGrowlSuccessNotice() {
        notification = new CPANEL.ajax.Dynamic_Notice({
            level: "success",
            content: LOCALE.maketext("Success!"),
            replaces: notification,
        });
    }

    function clearErrorNoticeContainer() {
        const element = DOM.get("cjt_pagenotice_container");

        if (element.firstChild) {
            element.innerHTML = "";
        }
    }

    function buildErrorMessage() {
        const errorMessageTitle = LOCALE.maketext("[output,strong,An error occurred while saving configuration]");
        const errorMessageBody = LOCALE.maketext("You should verify that your connection to the server is stable, that a firewall does not block your request, and the [asis, cpsrvd] service is running.");

        return  errorMessageTitle + "<br />" + errorMessageBody;
    }

    function showErrorNotice() {
        const errorMessage = buildErrorMessage();

        CPANEL.ajax.show_api_error(errorMessage);
    }

    function buildDataForApi() {
        const dataForApi = {};

        STRENGTHS.forEach(function(key) { // eslint-disable-line no-undef
            dataForApi[key] = newFormData[key + "-control"] ? newFormData[key] : "";
        });
        dataForApi["default"] = newFormData["default"];

        return dataForApi;
    }

    function onSuccess() {
        formData = newFormData;
        clearErrorNoticeContainer();
        showGrowlSuccessNotice();
    }

    function sendApiRequest(dataForApi, overlay) {
        CPANEL.api({
            func: "setminimumpasswordstrengths",
            catch_api_errors: true,
            data: dataForApi,
            callback: CPANEL.ajax.build_page_callback(onSuccess, {
                hide_on_return: overlay,
            }),
        });
    }

    function buildOverlay() {
        if (notification && notification.element) {
            notification.hide();
        }

        return new CPANEL.ajax.Page_Progress_Overlay(null, {
            covers: form,
            status_html: LOCALE.maketext("Saving …"),
        });
    }

    window.save = function save() {

        // Capturing form data first because overlay.show() will disable the
        // form elements. The elements being disabled is problematic as
        // CPANEL.dom.get_data_from_form, used by the capture function,  doesn't
        // capture disabled form elements.
        const dataForApi = captureNewFormData();
        const overlay = buildOverlay();
        overlay.show();

        checkServiceStatus("cpsrvd").then(() => {
            sendApiRequest(dataForApi, overlay);
        }).catch(() => {
            overlay.hide();
            showErrorNotice();
        });
    };
}());
