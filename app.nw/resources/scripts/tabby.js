
	// Tabby.js (include Buoy.js)
	// both written by Chris Ferdinandi
	//
	// @IdeasNeverCease
	// ========================================================

	window.buoy = (function (window, document, undefined) {

	    if ("document" in self && !("classList" in document.createElement("_"))) {
	        (function (view) {

	            "use strict";

	            if (!("Element" in view)) return;

	            var classListProp = "classList";
	            var protoProp = "prototype";
	            var elemCtrProto = view.Element[protoProp];
	            var objCtr = Object;
	            var strTrim = String[protoProp].trim || function () {
	                return this.replace(/^\s+|\s+$/g, "");
	            };

	            var arrIndexOf = Array[protoProp].indexOf || function (item) {

	                var i = 0, len = this.length;

	                for (; i < len; i++) {
	                    if (i in this && this[i] === item) {
	                        return i;
	                    }
	                }

	                return -1;

	            };

							// Vendors: please allow content code to instantiate DOMExceptions
	            var DOMEx = function (type, message) {

	                this.name = type;
	                this.code = DOMException[type];
	                this.message = message;

	            };

	            var checkTokenAndGetIndex = function (classList, token) {

	                if (token === "") {
	                    throw new DOMEx(
	                        "SYNTAX_ERR",
	                        "An invalid or illegal string was specified"
	                    );
	                }

	                if (/\s/.test(token)) {
	                    throw new DOMEx(
	                        "INVALID_CHARACTER_ERR",
	                        "String contains an invalid character"
	                    );
	                }

	                return arrIndexOf.call(classList, token);

	            };

	            var ClassList = function (elem) {

	                var trimmedClasses = strTrim.call(elem.getAttribute("class") || "");
	                var classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [];
	                var i = 0;
	                var len = classes.length;

	                for (; i < len; i++) {
	                    this.push(classes[i]);
	                }

	                this._updateClassName = function () {
	                    elem.setAttribute("class", this.toString());
	                };

	            };

	            var classListProto = ClassList[protoProp] = [];

	            var classListGetter = function () {
	                return new ClassList(this);
	            };

	            // Most DOMException implementations don't allow calling DOMException's toString()
	            // on non-DOMExceptions. Error's toString() is sufficient here.
	            DOMEx[protoProp] = Error[protoProp];

	            classListProto.item = function (i) {
	                return this[i] || null;
	            };

	            classListProto.contains = function (token) {

	                token += "";
	                return checkTokenAndGetIndex(this, token) !== -1;

	            };

	            classListProto.add = function () {

	                var tokens = arguments;
	                var i = 0;
	                var l = tokens.length;
	                var token;
	                var updated = false;

	                do {
	                    token = tokens[i] + "";
	                    if (checkTokenAndGetIndex(this, token) === -1) {
	                        this.push(token);
	                        updated = true;
	                    }
	                }

	                while (++i < l);

	                if (updated) {
	                    this._updateClassName();
	                }

	            };

	            classListProto.remove = function () {

	                var tokens = arguments;
	                var i = 0;
	                var l = tokens.length;
	                var token;
	                var updated = false;

	                do {
	                    token = tokens[i] + "";
	                    var index = checkTokenAndGetIndex(this, token);
	                    if (index !== -1) {
	                        this.splice(index, 1);
	                        updated = true;
	                    }
	                }

	                while (++i < l);

	                if (updated) {
	                    this._updateClassName();
	                }

	            };

	            classListProto.toggle = function (token, force) {

	                token += "";

	                var result = this.contains(token);
	                var method = result ? force !== true && "remove" : force !== false && "add";

	                if (method) {
	                    this[method](token);
	                }

	                return !result;

	            };

	            classListProto.toString = function () {
	                return this.join(" ");
	            };

	            if (objCtr.defineProperty) {
	                var classListPropDesc = {
	                    get: classListGetter,
	                    enumerable: true,
	                    configurable: true
	                };

	                try {
	                    objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	                } catch (ex) { // IE 8 doesn't support enumerable:true
	                    if (ex.number === -0x7FF5EC54) {
	                        classListPropDesc.enumerable = false;
	                        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	                    }
	                }
	            } else if (objCtr[protoProp].__defineGetter__) {
	                elemCtrProto.__defineGetter__(classListProp, classListGetter);
	            }

	        }(self));

	    }

	})(window, document);

	// Tabby.js ===============================================||

	window.tabby = (function (window, document, undefined) {

	    "use strict";

	    // Default settings
	    // Private method
	    // Returns an {object}
	    var _defaults = {
	        toggleActiveClass: "active",
	        contentActiveClass: "active",
	        initClass: "js-tabby",
	        callbackBefore: function () {},
	        callbackAfter: function () {}
	    };

	    // Merge default settings with user options
	    // Private method
	    // Returns an {object}
	    var _mergeObjects = function (original, updates) {

	        for (var key in updates) {
	            original[key] = updates[key];
	        }

	        return original;

	    };

	    // Get siblings of an element
	    // Private method
	    // Returns array of nodes
	    var _getSiblings = function (elem) {

	        var siblings = [];
	        var sibling = elem.parentNode.firstChild;
	        var skipMe = elem;

	        for (; sibling; sibling = sibling.nextSibling) {
	            if (sibling.nodeType == 1 && sibling != elem) {
	                siblings.push(sibling);
	            }
	        }

	        return siblings;

	    };

	    // Stop YouTube, Vimeo, and HTML5 videos from playing when leaving the tab
	    // Private method
	    // Runs functions
	    var _stopVideo = function (tab) {

	        var iframe = tab.querySelector("iframe");
	        var video = tab.querySelector("video");

	        if (iframe !== null) {
	            var iframeSrc = iframe.src;
	            iframe.src = iframeSrc;
	        }

	        if (video !== null) {
	            video.pause();
	        }

	    };

	    // Remove ".active" class from all other tab toggles
	    // Private method
	    // Runs functions
	    var _deactivateOtherToggles = function (toggleSiblings, toggleParentSiblings, options) {

	        Array.prototype.forEach.call(toggleSiblings, function (sibling) {
	            sibling.classList.remove(options.toggleActiveClass);
	        });

	        Array.prototype.forEach.call(toggleParentSiblings, function (sibling) {
	            if (sibling.tagName === "LI") {
	                sibling.classList.remove(options.toggleActiveClass);
	            }
	        });

	    };

	    // Hide all tab content sections
	    // Private method
	    // Runs functions
	    var _hideOtherTabs = function (tabSiblings, options) {
	        Array.prototype.forEach.call(tabSiblings, function (tab) {

	            if (tab.classList.contains(options.contentActiveClass)) {
	                _stopVideo(tab);
	                tab.classList.remove(options.contentActiveClass);
	            }

	        });
	    };

	    // Show target tabs
	    // Private method
	    // Runs functions
	    var _showTargetTabs = function (tabs, options) {
	        Array.prototype.forEach.call(tabs, function (tab) {

	            var tabSiblings = _getSiblings(tab);
	            tab.classList.add(options.contentActiveClass);
	            _hideOtherTabs(tabSiblings, options);

	        });
	    };

	    // Show a tab (and hide all others)
	    // Public method
	    // Runs functions
	    var toggleTab = function (toggle, tabID, options, event) {

	        // Selectors and variables
	        options = _mergeObjects(_defaults, options || {}); // Merge user options with defaults
	        var tabs = document.querySelectorAll(tabID); // Get tab content

	        // Get other toggle elements
	        var toggleParent = toggle.parentNode;
	        var toggleSiblings = _getSiblings(toggle);
	        var toggleParentSiblings = _getSiblings(toggleParent);

	        // If a link, prevent default click event
	        if (toggle && toggle.tagName === "A" && event) {
	            event.preventDefault();
	        }

	        options.callbackBefore(toggle, tabID); // Run callbacks before toggling tab

	        // Set clicked toggle to active. Deactivate others.
	        toggle.classList.add(options.toggleActiveClass);

	        if (toggleParent && toggleParent.tagName === "LI") {
	            toggleParent.classList.add(options.toggleActiveClass);
	        }

	        _deactivateOtherToggles(toggleSiblings, toggleParentSiblings, options);

	        // Show target tab content. Hide others.
	        _showTargetTabs(tabs, options);

	        options.callbackAfter(toggle, tabID); // Run callbacks after toggling tab

	    };

	    // Initialize Tabby
	    // Public method
	    // Runs functions
	    var init = function (options) {

	        // Feature test before initializing
	        if ("querySelector" in document && "addEventListener" in window && Array.prototype.forEach) {
	            // Selectors and variables
	            options = _mergeObjects(_defaults, options || {}); // Merge user options with defaults
	            var toggles = document.querySelectorAll("[data-tab]"); // Get all tab toggle elements
	            document.documentElement.classList.add(options.initClass); // Add class to HTML element to activate conditional CSS

	            // When tab toggles are clicked, hide/show tab content
	            Array.prototype.forEach.call(toggles, function (toggle) {
	                toggle.addEventListener("click", toggleTab.bind(null, toggle, toggle.getAttribute("data-tab"), options), false);
	            });
	        }

	    };

	    // Return public methods
	    return {
	        init: init,
	        toggleTab: toggleTab
	    };

	})(window, document);
