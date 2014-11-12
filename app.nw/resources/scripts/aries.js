
	// Aries.js
	// @IdeasNeverCease
	// ========================================================

	// Window Actions!
	$(function () {

		// Initialize Node Webkit
		var
		$vW = $(window).width(),
		$vH = $(window).height(),
		// child_process = require("child_process"),
		nw = {
			gui: require("nw.gui"),
			win: require("nw.gui").Window.get(),
			platform: require("os").platform,
			spawn: require("child_process").spawn,
			exec: require("child_process").exec,
			fs: require("fs"),
			path: require("path")
		},
		os = require("os"),
		winState,
		currWinMode,
		resizeTimeout,
		isMaximizationEvent = false;



		// menubar.js
		include("resources/scripts/menubar.js");



        /*
		// winstate.js
		function initWindowState() {

			winState = JSON.parse(localStorage.windowState || "null");

			if (winState) {
				currWinMode = winState.mode;

				if (currWinMode === "maximized") {
					nw.win.maximize();
				} else {
					restoreWindowState();
				}
			} else {
				currWinMode = "normal";

				if (deltaHeight !== "disabled") deltaHeight = 0;
				dumpWindowState();
			}

			nw.win.show();

		}

		function dumpWindowState() {

			if (!winState) { winState = {}; }

			// we don't want to save minimized state, only maximized or normal
			if (currWinMode === "maximized") {
				winState.mode = "maximized";
			} else {
				winState.mode = "normal";
			}

			// when window is maximized you want to preserve normal
			// window dimensions to restore them later (even between sessions)
			if (currWinMode === "normal") {
				winState.x = nw.win.x;
				winState.y = nw.win.y;
				winState.width = nw.win.width;
				winState.height = nw.win.height;

				// save delta only of it is not zero
				if (deltaHeight !== "disabled" && deltaHeight !== 0 && currWinMode !== "maximized") {
					winState.deltaHeight = deltaHeight;
				}
			}

		}

		function restoreWindowState() {

			// deltaHeight already saved, so just restore it and adjust window height
			if (deltaHeight !== "disabled" && typeof winState.deltaHeight !== "undefined") {
				deltaHeight = winState.deltaHeight;
				winState.height = winState.height - deltaHeight;
			}

			nw.win.resizeTo(winState.width, winState.height);
			nw.win.moveTo(winState.x, winState.y);

		}

		function saveWindowState() {

			dumpWindowState();
			localStorage.windowState = JSON.stringify(winState);

		}
        */

		// Build initial tab
		_tabInit = "";
		_tabInit += "<button class='tab active'";
		_tabInit += "data-tab='#tab1'";
		_tabInit += "data-page='start.html'>";
		_tabInit += "<img class='tab-favicon' type='image/x-icon'";
		_tabInit += "src='resources/images/favicon-default.png'>";
		_tabInit += "<span class='tab-close'></span>";
		_tabInit += "<span class='tab-title'>Start Page</span>";
		_tabInit += "</button>";

		// Build initial iframe
		_iframeInit = "";
		_iframeInit += "<iframe class='tabs-pane active'";
		_iframeInit += "seamless='true'";
		// _iframeInit += "sandbox='allow-same-origin allow-scripts allow-forms'";
		_iframeInit += "nwUserAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.157 Aries/0.5-alpha'";
		_iframeInit += "nwdisable nwfaketop ";
		_iframeInit += "onLoad='pageLoad(); browserLoad();'";
		_iframeInit += "id='tab1'>";

		$("#aries-showcase").append(_iframeInit);

		// Minimize Aries
		$(".app-minimize").on("click", function () {

			nw.win.on("minimize", function() {
				currWinMode = "minimized";
			});

			nw.win.minimize();

		});

		// Restore Aries
		nw.win.on("restore", function() {
			// Memory Leak
			currWinMode = "normal";
			process.setMaxListeners(0);
		});

		// Un/Maximize Aries
		$(".app-maximize").on("click", function () {

			nw.win.on("maximize", function() {
				isMaximizationEvent = true;
				currWinMode = "maximized";
			});

			nw.win.on("unmaximize", function() {
				currWinMode = "normal";
				// restoreWindowState();
			});

			nw.win.maximize();

		});

		// Close Aries
		$(".app-close").on("click", function () {

			nw.win.on("close", function() {
				// saveWindowState();
				this.close(true);
			});

			nw.win.close();

		});

		// Set URL bar width
		$("#url-bar").css("width", nw.win.window.innerWidth - 190 + "px");

		// Set showcase width and height
		$("#aries-showcase, iframe").css({
			"width": nw.win.window.innerWidth,
			"height": nw.win.window.innerHeight - 31 + "px"
		});

		// Prevent popups from occurring
		// Memory Leak
		nw.win.on("new-win-policy", function (frame, url, policy) {
			policy.ignore();
			process.setMaxListeners(0);
		});

		// Recalculate sizing of browser elements when scaling Aries
		// Need to make this better
		// Memory Leak
		nw.win.on("resize", function () {

			// Set URL bar width
			$("#url-bar").css("width", nw.win.window.innerWidth - 190 + "px");

			// Set showcase width and height
			$("#aries-showcase, iframe").css({
				"width": nw.win.window.innerWidth,
				"height": nw.win.window.innerHeight - 31 + "px"
			});

			process.setMaxListeners(0);

		});

		// Resize Aries
		// Enable this when I have resizing implemented
		/*
		nw.win.window.addEventListener("resize", function () {

			// resize event is fired many times on one resize action,
			// this hack with setTiemout forces it to fire only once
			clearTimeout(resizeTimeout);

			resizeTimeout = setTimeout(function () {

				// on MacOS you can resize maximized window, so it's no longer maximized
				if (isMaximizationEvent) {
					// first resize after maximization event should be ignored
					isMaximizationEvent = false;
				} else {
					if (currWinMode === "maximized") {
						currWinMode = "normal";
					}
				}

				// there is no deltaHeight yet, calculate it and adjust window size
				if (deltaHeight !== "disabled" && deltaHeight === false) {
					deltaHeight = nw.win.height - winState.height;
					// set correct size
					if (deltaHeight !== 0) {
						nw.win.resizeTo(winState.width, nw.win.height - deltaHeight);
					}
				}

				dumpWindowState();

			}, 500);

		}, false);
		*/

		$(document).on("click", ".tab-title", function () {

			var _tabID = $(this).parent().attr("data-tab");
			// var _tabID = $(this).attr("data-tab");
			var _gotIT = $("iframe" + _tabID).attr("src");
			var _title = $("iframe" + _tabID).contents().find("title").html();

			// Remove active states for other tabs/windows
			$("iframe").removeClass("active");
			$("#tab-wrapper button").removeClass("active");

			// Add active states for selected tab/window
			$("iframe" + _tabID).addClass("active");
			$(this).parent().addClass("active");

			// Populate address bar, tab title, and tab icon with
			// appropriate information
			$("#url-bar").val(_gotIT);
			$(".tab-title", this).text(_title);
			$(".tab-favicon", this).attr("src", getFavicon);

			// Don't show anything in address bar if on start page,
			// but put it in focus
			if (_gotIT === "start.html") {
				$("#url-bar").val("").focus();
			}

			console.log(_tabID);
			console.log(_gotIT);

		});

		$(document).on("click", ".tab-close", function () {

			var _tabID = $(this).parent().attr("data-tab");
			var _gotIT = $("iframe" + _tabID);

			var
			tab = $(this).closest("#tab-wrapper").find(".tab"),
			win = $(_gotIT).closest("#aries-showcase").find("iframe"),
			tabCount = tab.length,
			winCount = win.length;

			if ((tabCount == 1) && (winCount == 1)) { // if there is only one window left

				console.log("This is the last tab and window.");

				$(this).parent(".tab").addClass("active");
				$(_gotIT).attr("src", "start.html");
				$(_gotIT).addClass("active");

			} else if ((tabCount > 1) && (winCount > 1)) { // if there is more than one window

				if ($(this).parent().hasClass("active") && $(_gotIT).hasClass("active")) {

					var prevTab = $(this).parent(".tab").prev(".tab");
					var nextTab = $(this).parent(".tab").next(".tab");

					if (prevTab.length) {
						$(this).parent(".tab").prev(".tab").addClass("active");
					} else if (nextTab.length) {
						$(this).parent(".tab").next(".tab").addClass("active");
					}

					var prevWin = $(_gotIT).prev("iframe");
					var nextWin = $(_gotIT).next("iframe");

					if (prevWin.length) {
						$(_gotIT).prev("iframe").addClass("active");
					} else if (nextWin.length) {
						$(_gotIT).next("iframe").addClass("active");
					}

				}

				setTimeout(function () {
					var _location = $("iframe.active").attr("src");
					$("#url-bar").val(_location);
				}, 10);

				$(this).parent(".tab").remove();
				$(_gotIT).remove();

			} else if ((tabCount < 1) && (winCount < 1)) { // just create new tab and window

				console.log("Create new tab and window");

				$("#tab-wrapper").append(_tabInit);
				$("#aries-showcase").append(_iframeInit);

				if ($("#url-bar").val() == "start.html") {
					$("#url-bar").val("").focus();
				} else {
					$("#url-bar").val("").focus();
				}

			}

		});

		$(document).on("click", ".app-go-back", function () {
			window.history.back();
		});

		$(document).on("click", ".app-go-forth", function () {
			window.history.forward();
		});

		$(document).on("click", ".app-settings", function (e) {

			e.preventDefault();
			e.stopPropagation();

			$("#bt-menu").toggleClass("bt-menu--is-open");

			$(document).one("click", function(e) {
				if($("#bt-menu").has(e.target).length === 0) {
					$("#bt-menu").removeClass("bt-menu--is-open");
				}
			});

		});

		// Things to do before Aries starts
		onload = function () {

			// Reload tabs and windows of previous session
			$("#tab-wrapper .tab").each(function () {

				var _dataTab_ = $(this).attr("data-tab");
				var _dataPage_ = $(this).attr("data-page");

				// Set window URL via associated tab [data-page]
				$("#aries-showcase iframe" + _dataTab_).attr("src", _dataPage_);

				// Grab page title and attach to associated tab
				setTimeout(function () {

					var _currentTitle_ = $("#aries-showcase iframe" + _dataTab_).contents().find("title").html();

					$("#aries-showcase iframe").bind("load", function () {
						$(".tab[data-tab=" + _dataTab_ + "] .tab-title").text(_currentTitle_);
					});

					console.log("#3 — Tab Title: " + _currentTitle_);

				}, 50);

				console.log("#1 — Tab URL: " + _dataPage_);
				console.log("#2 — Tab ID: " + _dataTab_);

			});

			tabHover();

			// Let's get this shit started!
			nw.win.maximize();

			setTimeout(function () {
				nw.win.show();
			}, 175);

			pageLoad();

		};

		/*
		// This needs to be smoother. For now, just grab and drag window via URL bar
		$(".button-group").hover(function () { showTitlebar(); });
		$("#aries-showcase").hover(function () { hideTitlebar(); });
		*/

	});

	/*
	// This goes along with the code comment above that needs to be smoother
	var timeoutId;

	// Titlebar show functionality
	function showTitlebar() {

		if (!timeoutId) {
			timeoutId = window.setTimeout(function () {

				timeoutId = null; 

				$("#aries-titlebar").css({
					"margin": "0",
					"opacity": "1"
				});

			}, 950);
		}
	
	}

	// Titlebar hide functionality
	function hideTitlebar() {

		if (timeoutId) {
			window.clearTimeout(timeoutId);
			timeoutId = null;
		} else {
			$("#aries-titlebar").css({
				"margin": "0 0 -31px 0",
				"opacity": "0"
			});
		}

	}
	*/

	function tabHover() {

		$(".tab").each(function () {

			$(this).on("mouseenter", function () {
				$(".tab-favicon", this).hide();
				$(".tab-close", this).show();
			});

			$(this).on("mouseleave", function () {
				$(".tab-favicon", this).show();
				$(".tab-close", this).hide();
			});

		});

	}

	// Grab favicons for tabs
	var getFavicon = function () {

		var favicon, _tabID = $(".tab.active").attr("data-tab");
		var nodeList = $("iframe" + _tabID).contents().find("link");
		// var nodeListII = $("iframe" + _tabID).contents().find("meta");

		for (var i = 0; i < nodeList.length; i++) {
			// get any type of icon
			// meta property="og:image" content="http://images.apple.com/home/images/og.jpg"
			if ((nodeList[i].getAttribute("rel") == "icon") || (nodeList[i].getAttribute("rel") == "shortcut icon") || (nodeList[i].getAttribute("rel") == "apple-touch-icon")) {
				favicon = nodeList[i].href; // get absolute path
			} // else { favicon = "resources/images/favicon-default.png"; }

			/*
			if (nodeListII[i].getAttribute("property") == "og:image") {
				favicon = nodeListII[i].content;
			}
			*/
		}

		return favicon;

	};

	function browserLoad() {

		$("iframe.active").each(function () {
			// include("resources/scripts/browser.js", "resources/scripts/vendor/jquery-2.1.0.min.js", function() {
			include("resources/scripts/browser.js", function() {

			  // browser.js has been loaded, now we can use it
				$("iframe.active").contents().find("head").prepend(_stylesInit);
				$("iframe.active").contents().find("body").append(_contextInit);

			});
		});

	}

	function pageLoad() {

		NProgress.start();

		$("iframe.active").ready(function () {

			var nw = {
				gui: require("nw.gui"), // Load native UI library
				win: require("nw.gui").Window.get(), // Get the current window
				platform: require("os").platform,
				spawn: require("child_process").spawn,
				exec: require("child_process").exec,
				fs: require("fs"),
				path: require("path")
			};

			// NProgress.done();

		}).bind("load", function () {

			var baseURL = this.contentWindow.location.href;
			var currentTitle = $(this).contents().find("title").html();
			var currentURL = $("#url-bar").val(baseURL);

			$("#url-bar").val(baseURL);
			$("button.active .tab-title").html(currentTitle);
			$("button.active .tab-favicon").attr("src", getFavicon);



			// Remove focus from URL bar
			// TODO: focus on first input field in iframe.
			//////// if none exist, focus on iframe.
			$(this).focus();

			// Start progress bar when clicking <a> inside window
			var iframe = $(this).contents();

			iframe.find("a").not("a[href*='#'], a[href*='%'], a[href*='javascript:;']").bind("click", function() {

				// Hamburger menu on Dockyard.com has no href
				if ($(this).attr("href").length === 0) { return false; }

				if ($(this).attr("href").indexOf(".pdf") >-1) {

					console.log("This is a PDF: " + $(this).attr("href"));
					// _pagePDF();

					/*
					// Let's work on PDF support after 1.0 is out...
					$("iframe.active").attr("src", "resources/scripts/pdf/index.html");
					$("button.active").attr("data-page", "resources/scripts/pdf/index.html");
					*/

					// $("iframe.active").attr("src", "resources/scripts/pdf/index.html?file=" + encodeURIComponent($(this).attr("href")));
					// $("button.active").attr("data-page", "resources/scripts/pdf/index.html?file=" + encodeURIComponent($(this).attr("href")));

					// aries://app.nw/resources/scripts/pdf/index.html?file=aries%3A%2F%2Fapp.nw%2Fresources%2Fscripts
					// %2Fpdf%2Fbuild%2Fgeneric%2Fweb%2Fcompressed.tracemonkey-pldi-09.pdf

					// set PDF src in viewer.js somehow...
					// _location?

					setTimeout(function () {
						$("#url-bar").val("");
					}, 100);

				} else {

					NProgress.start(); // Hmm, may not need this...

					$("button.active .tab-title").html(currentTitle);
					$("button.active .tab-favicon").attr("src", getFavicon);

					var _location = $(this)[0].href;
					$("iframe.active").attr("src", _location);

					console.log("Hmm, " + _location);

				}

			});

			/*
			if ($("a[href*='/pdf']").length > 0) {
				_pagePDF();
			}
			*/

			// Don't show anything in address bar if on start page,
			// but put it in focus
			if ($("#url-bar").val() == "app://aries/app.nw/start.html") {
				$("#url-bar").val("").focus();
			}

			// Notification when on certain sites
			var uri = new URI(baseURL);

			// Uncomment below to find hostname parameter
			// console.log(uri.hostname());

			if (uri.hostname() == "www.facebook.com") {
				var fbNotify = iframe.find("#notificationsCountValue").text();

				if (fbNotify > 0) {
					$("button.active .tab-favicon").before("<span class='notification-count'>"+ fbNotify +"</span>");
					// $(".notification-count").css("opacity", "1");
				} else {
					$(".notification-count").css("opacity", "0");
				}
			}

			if (uri.hostname() == "www.deviantart.com") {
				var daNotify = $.trim(iframe.find("#oh-menu-split .oh-l").text());

				if (daNotify !== "undefined") {
					$("button.active .tab-favicon").before("<span class='notification-count'>"+ daNotify +"</span>");
					// $(".notification-count").css("opacity", "1");
				} else {
					// $(".notification-count").css("opacity", "0");
				}
			}

			/*
			if ($("#url-bar").val() == "http://data:test/html,chromewebdata") {
				console.log("nope");
			}
			*/

		});

		// Browser styles
		/*
		// Only works on local pages. UGH.
		$("iframe.active").contents().find("head").append($("<link/>", {
			rel: "stylesheet",
			href: "app://aries/app.nw/resources/css/browser.css"
			// type: "text/css"
		}));
		*/

		// $("iframe.active").contents().find("head").append("<style>body { background-color: #07d0eb; }</style>");

		// Context Menu
		var
		$frameBody = jQuery("iframe.active").contents().find("body"),
		mouseX, mouseY;

		$frameBody[0].addEventListener("mousemove", function(e) {

			mouseX = e.pageX;
			mouseY = e.pageY;
			// console.log(e.pageX + "px + " + e.pageY + "px");

		});

		// http://hikar.io/test.html

		$frameBody[0].addEventListener("contextmenu", function(event) {

			event.preventDefault();
			var target = event.target;

			if ($(target).is("img")) {

				// Show context menu
				// Any selection obtained through: jQuery('#iframe').get(0).contentDocument.getSelection().toString()
				console.log("Context Menu: Image");

				$("iframe.active").contents().find("body #aries-contextMenu__image").css({
					"top": mouseY + "px",
					"left": mouseX + "px",
					"display": "block"
				});

				$("iframe.active").contents().find("body").bind("click", function(e) {
					if($(e.target).closest("body #aries-contextMenu__image").length === 0) {
						// click happened outside of menu, hide any visible menu items
						$("iframe.active").contents().find("body #aries-contextMenu__image").fadeOut("fast");
					}
				});

			} else {

				// Show context menu
				// Any selection obtained through: jQuery('#iframe').get(0).contentDocument.getSelection().toString()
				console.log("Context Menu: Default");

				$("iframe.active").contents().find("body #aries-contextMenu__default").css({
					"top": mouseY + "px",
					"left": mouseX + "px",
					"display": "block"
				});

				$("iframe.active").contents().find("body").bind("click", function(e) {
					if($(e.target).closest("body #aries-contextMenu__default").length === 0) {
						// click happened outside of menu, hide any visible menu items
						$("iframe.active").contents().find("body #aries-contextMenu__default").fadeOut("fast");
					}
				});

			}

			// return false;

		});

		NProgress.done();

	}

	function _pageAbout() {

		console.log("Internal Aries link!");

		$("iframe.active").attr("src", "about.html");
		$("button.active").attr("data-page", "about.html");

		setTimeout(function () {
			$("#url-bar").val("about");
		}, 100);

	}

	/*
	function _pagePDF() {

		console.log("PDF view");

		$("iframe.active").attr("src", "resources/scripts/pdf/index.html");
		$("button.active").attr("data-page", "resources/scripts/pdf/index.html");

		// set PDF src in viewer.js somehow

		setTimeout(function () {
			$("#url-bar").val("");
		}, 100);

	}

	// resources/scripts/pdf/index.html
	*/

	function _searchDDG() {

		// looks like input isn't a URL, so search!
		var encodeSearch = "https://duckduckgo.com/?q=" + encodeURIComponent($("#url-bar").val());

		$("iframe.active").attr("src", encodeSearch);
		$("button.active").attr("data-page", encodeSearch);

		// Make sure to mention !bangs in the future readme: https://duckduckgo.com/bang.html

	}

	// Go to a website, or search for something
	function goThere() {

		// 651 TLDs!
		// TLD list: https://data.iana.org/TLD/tlds-alpha-by-domain.txt
		// used http://convertcase.net to take IANA's list out of caps
		// Version 2014071900, Last Updated Sat Jul 19 07:07:01 2014 UTC

		var url = /(\S+\.(ac|academy|accountants|active|actor|ad|ae|aero|af|ag|agency|ai|airforce|al|am|an|ao|aq|ar|archi|army|arpa|as|asia|associates|at|attorney|au|auction|audio|autos|aw|ax|axa|az|ba|bar|bargains|bayern|bb|bd|be|beer|berlin|best|bf|bg|bh|bi|bid|bike|bio|biz|bj|black|blackfriday|blue|bm|bmw|bn|bo|boutique|br|brussels|bs|bt|build|builders|buzz|bv|bw|by|bz|bzh|ca|cab|camera|camp|cancerresearch|capetown|capital|cards|care|career|careers|cash|cat|catering|cc|cd|center|ceo|cf|cg|ch|cheap|christmas|church|ci|citic|city|ck|cl|claims|cleaning|clinic|clothing|club|cm|cn|co|codes|coffee|college|cologne|com|community|company|computer|condos|construction|consulting|contractors|cooking|cool|coop|country|cr|credit|creditcard|cruises|cu|cuisinella|cv|cw|cx|cy|cz|dance|dating|de|deals|degree|democrat|dental|dentist|desi|diamonds|digital|direct|directory|discount|dj|dk|dm|dnp|do|domains|durban|dz|ec|edu|education|ee|eg|email|engineer|engineering|enterprises|equipment|er|es|estate|et|eu|eus|events|exchange|expert|exposed|fail|farm|feedback|fi|finance|financial|fish|fishing|fitness|fj|fk|flights|florist|fm|fo|foo|foundation|fr|frogans|fund|furniture|futbol|ga|gal|gallery|gb|gd|ge|gent|gf|gg|gh|gi|gift|gives|gl|glass|global|globo|gm|gmo|gn|gop|gov|gp|gq|gr|graphics|gratis|green|gripe|gs|gt|gu|guide|guitars|guru|gw|gy|hamburg|haus|hiphop|hiv|hk|hm|hn|holdings|holiday|homes|horse|host|house|hr|ht|hu|id|ie|il|im|immobilien|in|industries|info|ink|institute|insure|int|international|investments|io|iq|ir|is|it|je|jetzt|jm|jo|jobs|joburg|jp|juegos|kaufen|ke|kg|kh|ki|kim|kitchen|kiwi|km|kn|koeln|kp|kr|krd|kred|kw|ky|kz|la|lacaixa|land|lawyer|lb|lc|lease|lgbt|li|life|lighting|limited|limo|link|lk|loans|london|lotto|lr|ls|lt|lu|luxe|luxury|lv|ly|ma|maison|management|mango|market|marketing|mc|md|me|media|meet|melbourne|menu|mg|mh|miami|mil|mini|mk|ml|mm|mn|mo|mobi|moda|moe|monash|mortgage|moscow|motorcycles|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|nagoya|name|navy|nc|ne|net|neustar|nf|ng|ngo|nhk|ni|ninja|nl|no|np|nr|nra|nrw|nu|nyc|nz|okinawa|om|onl|org|organic|ovh|pa|paris|partners|parts|pe|pf|pg|ph|photo|photography|photos|physio|pics|pictures|pink|pk|pl|place|plumbing|pm|pn|post|pr|press|pro|productions|properties|ps|pt|pub|pw|py|qa|qpon|quebec|re|recipes|red|rehab|reise|reisen|ren|rentals|repair|report|republican|rest|reviews|rich|rio|ro|rocks|rodeo|rs|ru|ruhr|rw|ryukyu|sa|saarland|sb|sc|scb|schmidt|schule|scot|sd|se|services|sexy|sg|sh|shiksha|shoes|si|singles|sj|sk|sl|sm|sn|so|social|software|sohu|solar|solutions|soy|space|spiegel|sr|st|su|supplies|supply|support|surf|surgery|suzuki|sv|sx|sy|systems|sz|tattoo|tax|tc|td|technology|tel|tf|tg|th|tienda|tips|tirol|tj|tk|tl|tm|tn|to|today|tokyo|tools|town|toys|tp|tr|trade|training|travel|tt|tv|tw|tz|ua|ug|uk|university|uno|us|uy|uz|va|vacations|vc|ve|vegas|ventures|versicherung|vet|vg|vi|viajes|villas|vision|vlaanderen|vn|vodka|vote|voting|voto|voyage|vu|wang|watch|webcam|website|wed|wf|whoswho|wien|wiki|works|ws|wtc|wtf|xn--3bst00m|xn--3ds443g|xn--3e0b707e|xn--45brj9c|xn--4gbrim|xn--55qw42g|xn--55qx5d|xn--6frz82g|xn--6qq986b3xl|xn--80adxhks|xn--80ao21a|xn--80asehdb|xn--80aswg|xn--90a3ac|xn--c1avg|xn--cg4bki|xn--clchc0ea0b2g2a9gcd|xn--czr694b|xn--czru2d|xn--d1acj3b|xn--fiq228c5hs|xn--fiq64b|xn--fiqs8s|xn--fiqz9s|xn--fpcrj9c3d|xn--fzc2c9e2c|xn--gecrj9c|xn--h2brj9c|xn--i1b6b1a6a2e|xn--io0a7i|xn--j1amh|xn--j6w193g|xn--kprw13d|xn--kpry57d|xn--kput3i|xn--l1acc|xn--lgbbat1ad8j|xn--mgb9awbf|xn--mgba3a4f16a|xn--mgbaam7a8h|xn--mgbab2bd|xn--mgbayh7gpa|xn--mgbbh1a71e|xn--mgbc0a9azcg|xn--mgberp4a5d4ar|xn--mgbx4cd0ab|xn--ngbc5azd|xn--nqv7f|xn--nqv7fs00ema|xn--o3cw4h|xn--ogbpf8fl|xn--p1ai|xn--pgbs0dh|xn--q9jyb4c|xn--rhqv96g|xn--s9brj9c|xn--ses554g|xn--unup4y|xn--wgbh1c|xn--wgbl6a|xn--xkc2al3hye2a|xn--xkc2dl3a5ee0h|xn--yfro4i67o|xn--ygbi2ammx|xn--zfr164b|xxx|xyz|yachts|yandex|ye|yokohama|yt|za|zm|zone|zw)|([0-9])(\/\S+)?)/;

		var a = url.test($("#url-bar").val());

		// check to see if input is a URL
		// apparently, encodeURIComponent fucks up URLs. Hooray for learning!
		// var encodeURL = "http://" + encodeURI($("#url-bar").val());
		var encodeURL = encodeURI($("#url-bar").val());

		// Figure out if we need to prepend "http://" to URLs
		function decipher() {

			if (encodeURL.match(/(^http:\/\/)|(^https:\/\/)/) !== null) {

				console.log("This URL already contains 'http://'");

				$("iframe.active").attr("src", encodeURL);
				$("button.active").attr("data-page", encodeURL);

			} else if (encodeURL.match(/(%20)/) !== null) {

				console.log("spaces!"); // almost deals with numbers in the URL bar. Almost.
				_searchDDG();

			} else if (encodeURL.match(/(^http:\/\/127.0.0.1:2000)/) !== null) {

				$("button.active .tab-title").html("Console");
				console.log("console");

			} else if (encodeURL.match(/(pdf)/) !== null) {

				// _pagePDF();

			} else {

				console.log("This URL did not contain 'http://'");

				$("iframe.active").attr("src", "http://" + encodeURL);
				$("button.active").attr("data-page", "http://" + encodeURL);

			}

		}

		decipher();

		setTimeout(function () {

			var currentTitle = $("iframe.active").contents().find("title").html(); // get current iframe title

			$("button.active .tab-title").html(currentTitle);
			$("button.active .tab-favicon").attr("src", getFavicon);

			if (encodeURL.match(/(^https:\/\/)/) !== null) {
				$("button.active").addClass("secure-site");
			}

		}, 500);

		if (url.test($("#url-bar").val()) === true) {

			console.log(a); // should be true, go to actual site

			/*
			if (a === "data:test/html,chromewebdata") {
				console.log("sdgffdg");
			}

			process.on("net::ERR_NAME_NOT_RESOLVED", function(error) { console.log("Aries Error: " + error); });

			process.on("uncaughtException", function(error) {

				console.dir(error);
				console.log("!111!!1!0" + error.stack);
				process.exit();

				// window.location.href ="app://aries/notify-test.html";
				// if (error == "net::ERR_NAME_NOT_RESOLVED") { console.log("Aries Error: " + error); }

			});
			*/

		} else {

			if (encodeURL.match(/(^aries:\/\/about)/) !== null) {
				_pageAbout();
			} else {

				console.log(a); // should be false, search DDG
				_searchDDG();

			}

		}

	}

	// titleSignet × HubSpot × https://github.com/HubSpot/signet/tree/master/titleSignet
	(function(){var autoInit,deferConsole,draw,getContent,getOptions,orDefault,tag;getOptions=function(options){options.title=orDefault(options.title,getContent('meta[name="application-name"]'),getContent('meta[property="og:title"]'),document.title.split(/\u0020[\/\\\|\-\u8211\u8212]\u0020|\:\u0020/)[0],"");options.author=orDefault(options.author,getContent('meta[name=author]'),'');options.description=orDefault(options.description,getContent("meta[name=description]"),getContent('meta[property="og:description"]'),"");options.image=orDefault(options.image,getContent('meta[property="og:image"]'),getContent("meta[name=image]"));options.hue=options.hue||0;options.baseStyles=orDefault(options.baseStyles,'color: #444; font-family: "Open Sans", "Source Sans Pro", Arial, sans-serif;');options.titleStyles=orDefault(options.titleStyles,""+options.baseStyles+"; font-size: 20px; line-height: 30px;");options.authorStyles=orDefault(options.authorStyles,""+options.baseStyles+"; font-size: 12px; line-height: 30px; padding: 0 0 0 20px;");options.descriptionStyles=orDefault(options.descriptionStyles,""+options.baseStyles+"; font-size: 10px; line-height: 20px;");return options;};orDefault=function(){var argument,_i,_len;for(_i=0,_len=arguments.length;_i<_len;_i++){argument=arguments[_i];if(typeof argument!=="undefined"){return argument;}}return arguments[arguments.length-1];};getContent=function(selector){var _ref;return(_ref=document.head.querySelector(selector))!==null?_ref.content:void 0;};deferConsole=function(fn){var callable,i,messages,old,type,types,_fn,_i,_len;types=["log","debug","warn","error"];old={};callable={};messages=[];i=types.length;_fn=function(type){old[type]=console[type];callable[type]=function(){return old[type].apply(console,arguments);};return console[type]=function(){messages.push([type,arguments]);return void 0;};};for(i=_i=0,_len=types.length;_i<_len;i=++_i){type=types[i];_fn(type);}return setTimeout((function(){var _then;_then=function(){var block,message,_j,_len1,_results;while(messages.length){block=messages.shift();type=block[0];message=block[1];old[type].apply(console,message);}_results=[];for(_j=0,_len1=types.length;_j<_len1;_j++){type=types[_j];_results.push(console[type]=old[type]);}return _results;};return fn(callable,_then);}),0);};draw=function(options,_console,cb){var img,_draw;_draw=function(){var args,hue,i;if(options.title){if(!options.image){args=[""];i=0;while(i<options.title.length){args[0]+="%c"+options.title[i];if(options.title[i]===" "){args.push(options.titleStyles);}else{hue=((options.title[i].toLowerCase().charCodeAt(0)*2)+options.hue)%255;args.push(""+options.titleStyles+"; background-color: #50bebf; color: transparent; line-height: 0;");}i++;}_console.log.apply(console,args);}if(options.author){_console.log("%c"+options.title+"%c"+options.author,options.titleStyles,options.authorStyles);}else{_console.log("%c"+options.title,options.titleStyles);}}if(options.description){_console.log("%c"+options.description,options.descriptionStyles);}if(cb){return cb();}};_console=_console||window.console;options=options||window.signet.options||{enabled:true};if(options.enabled===false){return;}options=getOptions(options);if(!options.image){return _draw();}else{img=new Image();img.onload=function(){_console.log("%c ","font-size: 0; line-height: "+img.height+"px; padding: "+(Math.floor(img.height/2))+"px "+img.width+"px "+(Math.ceil(img.height/2))+"px 0; background-image: url(\""+img.src+"\");");return _draw();};return img.src=options.image;}};window.signet=window.signet||{};window.signet.options=window.signet.options||window.signetOptions||{};if(!window.console||!window.console.log||!document.head||!document.querySelector){window.signet.draw=function(){};return;}autoInit=true;tag=document.querySelector("[data-signet-draw]");if(tag){autoInit=tag.getAttribute("data-signet-draw").toLowerCase()!=="false";}if(signet.options.draw===false){autoInit=false;}if(autoInit){deferConsole(function(_console,_then){return draw(null,_console,_then);});}window.signet.draw=draw;}).call(this);
	//

	console.log("Platform: " + process.platform);
	console.log("Processor architecture: " + process.arch);
	console.log("PID: " + process.pid);

	// http://127.0.0.1:2000/devtools/devtools.html?ws=127.0.0.1:2000/devtools/page/2E4B1554-529A-9ECF-D486-F3467A66E29D
	// http://127.0.0.1:2000/devtools/Main.js
	// http://127.0.0.1:2000/devtools/inspector.css
	// http://127.0.0.1:2000/devtools/devtools.html

	// Error Handling
	// process.setMaxListeners(0);

	// Memory Leak fix?
	// (node) warning: possible EventEmitter memory leak detected. 11 listeners added. Use emitter.setMaxListeners() to increase limit.
	// emitter.setMaxListeners(0);

	// chrome.webRequest.onErrorOccurred.addListener(onErrorOccurred, {urls: ["http://*/*", "https://*/*"]});

	/*
	function onErrorOccurred(details) {
		if (details.error == "net::ERR_NAME_NOT_RESOLVED")
		chrome.tabs.update(details.tabId, {url: "..."});
	}
	*/

	// process.on("net::ERR_NAME_NOT_RESOLVED", function(error) { console.log("Aries Error: " + error); });