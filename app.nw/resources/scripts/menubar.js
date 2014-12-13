
	// menubar.js
	// @IdeasNeverCease
	// ========================================================

	// Initialize Node Webkit
	var nw = {
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

	if (os.platform() === "win32") {
		// Create a menubar for window menu
		var menubar = new nw.gui.Menu({ type: "menubar" });

		/***********************************************/

		// Aries Menu
		var _aries = new nw.gui.Menu();

		// About
		_aries.append(new nw.gui.MenuItem({
			label: "About Aries",
			click: function () {

				console.log("Clicked 'About Aries'");

				/*
				// iTunes-style About window
				var win = nw.gui.Window.open("about.html", {
				  "position": "center",
				  "width": 600,
				  "height": 297,
				  "frame": false,
				  "toolbar": false
				});

				win.on("load", function () { this.focus(true); });
				*/

				_pageAbout();

			}
		}));

		_aries.append(new nw.gui.MenuItem({ type: "separator" }));



		// Preferences
		_aries.append(new nw.gui.MenuItem({
			label: "Preferences",
			click: function () {
				console.log("Clicked 'Preferences'");
			},
		  key: ",",
		  modifiers: "ctrl",
		}));

		_aries.append(new nw.gui.MenuItem({ type: "separator" }));



		// Synchronize
		_aries.append(new nw.gui.MenuItem({
			label: "Synchronize", // Aries Connect
			click: function () {
				console.log("Clicked 'Synchronize'");
			}
		}));



		// Clear Private Data
		_aries.append(new nw.gui.MenuItem({
			label: "Clear Private Data",
			click: function () {
				console.log("Clicked 'Clear Private Data'");
			}
		}));

		_aries.append(new nw.gui.MenuItem({ type: "separator" }));



		// Streamline
		_aries.append(new nw.gui.MenuItem({
			label: "Streamline", // like Opera Turbo
			click: function () {
				console.log("Clicked 'Streamline'");
			}
		}));

		_aries.append(new nw.gui.MenuItem({ type: "separator" }));



		// Hide Aries
		_aries.append(new nw.gui.MenuItem({
			label: "Hide Aries",
			click: function () {
				console.log("Clicked 'Hide Aries'");
			},
		  key: "h",
		  modifiers: "ctrl",
		}));



		// Hide Others
		_aries.append(new nw.gui.MenuItem({
			label: "Hide Others",
			click: function () {
				console.log("Clicked 'Hide Others'");
			},
		  key: "h",
		  modifiers: "shift-ctrl",
		}));



		// Show All
		_aries.append(new nw.gui.MenuItem({
			label: "Show All",
			click: function () {
				console.log("Clicked 'Show All'");
			}
		}));

		_aries.append(new nw.gui.MenuItem({ type: "separator" }));



		// Quit Aries
		_aries.append(new nw.gui.MenuItem({
			label: "Quit Aries",
			click: function () {

				nw.win.close();
				console.log("Clicked 'Quit Aries'");

			},
		  key: "q",
		  modifiers: "ctrl",
		}));

		menubar.append(new nw.gui.MenuItem({
			label: "Aries",
			submenu: _aries
		}));

		/***********************************************/



		// File Menu
	  var _file = new nw.gui.Menu();



		// New Tab
	  _file.append(new nw.gui.MenuItem({
			label: "New Tab",
			click: function() {
				console.log("Clicked 'New Tab'");



				// Remove focus from other tabs and windows
				$(".tab, .tabs-pane").removeClass("active");

				$("#tab-wrapper").append("<button class='tab active' data-page='start.html'><img class='tab-favicon' type='image/x-icon' src='resources/images/favicon-default.png'><span class='tab-close'></span><span class='tab-title'>Start Page</span></button>");

				$("#aries-showcase").append("<iframe class='tabs-pane active' seamless='true' nwUserAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.157 Aries/0.5-alpha' nwdisable nwfaketop onLoad='pageLoad();' src='start.html'></iframe>");

				$("#url-bar").val("").focus();

				var tabID = 0, windowID = 0;



				// Add a new tab
				$("#tab-wrapper .tab").each(function () {

					tabID++;
					$(this).attr("data-tab", "#tab" + tabID);

					var dataPage = $(this).attr("data-page");
					console.log(dataPage);

				});



				// Add a new window
				$("#aries-showcase iframe").each(function () {

					windowID++;
					$(this).attr("id", "tab" + windowID);
					// $(this).attr("src", dataPage);

				}).css({ "width": nw.win.window.innerWidth, "height": nw.win.window.innerHeight - 31 + "px" });

				$("iframe.active").each(function () {
				  this.contentWindow.location.reload(true);
				});



				// Reinitialize tabby to recognize new tab and window
				tabby.init();
				tabHover();

				console.log("New tab added to Aries");
			},
		  key: "t",
		  modifiers: "ctrl",
		}));



		// New Window
	  _file.append(new nw.gui.MenuItem({
			label: "New Window",
			click: function() {
				console.log("Clicked 'New Window'");
			},
		  key: "n",
		  modifiers: "ctrl",
		}));



		// New Private Window
	  _file.append(new nw.gui.MenuItem({
			label: "New Private Window",
			click: function() {
				console.log("Clicked 'New Private Window'");
			},
		  key: "n",
		  modifiers: "shift-ctrl",
		}));



		// Open File
	  _file.append(new nw.gui.MenuItem({
			label: "Open File",
			click: function() {
				console.log("Clicked 'Open File'");
			},
		  key: "o",
		  modifiers: "ctrl",
		}));



		// Open Location
	  _file.append(new nw.gui.MenuItem({
			label: "Open Location",
			click: function() {
				console.log("Clicked 'Open Location'");
			},
		  key: "l",
		  modifiers: "ctrl",
		}));

		_file.append(new nw.gui.MenuItem({ type: "separator" }));



		// Reload Tab
	  _file.append(new nw.gui.MenuItem({
			label: "Reload Tab",
			click: function() {

				$("iframe.active").attr("src", function (i, val) { return val; });
				console.log("Reloaded Tab");

			},
		  key: "r",
		  modifiers: "ctrl",
		}));



		// Close Tab
	  _file.append(new nw.gui.MenuItem({
			label: "Close Tab",
			click: function() {
				console.log("Clicked 'Close Tab'");
			},
		  key: "w",
		  modifiers: "ctrl",
		}));



		// Close Other Tabs
	  _file.append(new nw.gui.MenuItem({
			label: "Close Other Tabs",
			click: function() {
				console.log("Clicked 'Close Other Tabs'");
			}
		}));



		// Close Window
	  _file.append(new nw.gui.MenuItem({
			label: "Close Window",
			click: function() {
				console.log("Clicked 'Close Window'");
			},
		  key: "w",
		  modifiers: "shift-ctrl",
		}));

		_file.append(new nw.gui.MenuItem({ type: "separator" }));



		// Save Page As
	  _file.append(new nw.gui.MenuItem({
			label: "Save Page As",
			click: function() {
				console.log("Clicked 'Save Page As'");
			},
		  key: "s",
		  modifiers: "shift-ctrl",
		}));

		_file.append(new nw.gui.MenuItem({ type: "separator" }));



		// Print
	  _file.append(new nw.gui.MenuItem({
			label: "Print",
			click: function() {
				console.log("Clicked 'Print'");
			},
		  key: "p",
		  modifiers: "ctrl",
		}));

		menubar.append(new nw.gui.MenuItem({
			label: "File",
			submenu: _file
		}));

		/***********************************************/



		// Edit Menu
		var _edit = new nw.gui.Menu();



		// Undo
	  _edit.append(new nw.gui.MenuItem({
			label: "Undo",
			click: function() {
				console.log("Clicked 'Undo'");
			},
		  key: "z",
		  modifiers: "ctrl",
		}));



		// Redo
	  _edit.append(new nw.gui.MenuItem({
			label: "Redo",
			click: function() {
				console.log("Clicked 'Redo'");
			},
		  key: "z",
		  modifiers: "shift-ctrl",
		}));

		_edit.append(new nw.gui.MenuItem({ type: "separator" }));



		// Cut
	  _edit.append(new nw.gui.MenuItem({
			label: "Cut",
			click: function() {

				document.execCommand("cut");
				console.log("Cut something");

			},
		  key: "x",
		  modifiers: "ctrl",
		}));



		// Copy
	  _edit.append(new nw.gui.MenuItem({
			label: "Copy",
			click: function() {

				document.execCommand("copy");
				console.log("Copied something");

			},
		  key: "c",
		  modifiers: "ctrl",
		}));



		// Paste
	  _edit.append(new nw.gui.MenuItem({
			label: "Paste",
			click: function() {

				document.execCommand("paste");
				console.log("Pasted something");

			},
		  key: "v",
		  modifiers: "ctrl",
		}));



		// Select All
	  _edit.append(new nw.gui.MenuItem({
			label: "Select All",
			click: function() {

				document.execCommand("SelectAll");
				console.log("Clicked 'Select All'");

			},
		  key: "a",
		  modifiers: "ctrl",
		}));

		_edit.append(new nw.gui.MenuItem({ type: "separator" }));



		// Find
	  _edit.append(new nw.gui.MenuItem({
			label: "Find",
			click: function() {
				console.log("Clicked 'Find'");
			},
		  key: "f",
		  modifiers: "ctrl",
		}));



		// Find Next
	  _edit.append(new nw.gui.MenuItem({
			label: "Find Next",
			click: function() {
				console.log("Clicked 'Find Next'");
			},
		  key: "g",
		  modifiers: "ctrl",
		}));



		// Find Previous
	  _edit.append(new nw.gui.MenuItem({
			label: "Find Previous",
			click: function() {
				console.log("Clicked 'Find Previous'");
			},
		  key: "g",
		  modifiers: "shift-ctrl",
		}));

		menubar.append(new nw.gui.MenuItem({
			label: "Edit",
			submenu: _edit
		}));

		/***********************************************/



		// View Menu
		var _view = new nw.gui.Menu();

	  _view.append(new nw.gui.MenuItem({
			label: "Test 002",
			click: function() {
				console.log("Clicked 'Test 002'");
			},
		  key: "",
		  modifiers: "",
		}));

		_view.append(new nw.gui.MenuItem({ type: "separator" }));

		menubar.append(new nw.gui.MenuItem({
			label: "View",
			submenu: _view
		}));

		/***********************************************/



		// History Menu
		var _history = new nw.gui.Menu();

	  _history.append(new nw.gui.MenuItem({
			label: "Test 003",
			click: function() {
				console.log("Clicked 'Test 003'");
			},
		  key: "",
		  modifiers: "",
		}));

		_history.append(new nw.gui.MenuItem({ type: "separator" }));

		menubar.append(new nw.gui.MenuItem({
			label: "History",
			submenu: _history
		}));

		/***********************************************/



		// Developer Menu
		var _developer = new nw.gui.Menu();



		// Web Inspector
	  _developer.append(new nw.gui.MenuItem({
			label: "Web Inspector",

			click: function() {

				nw.win.showDevTools();
				// win.showDevTools([id | iframe, headless]);
				console.log("Dev Mode, ON");

			},
		  key: "i",
		  modifiers: "shift-ctrl",
		}));



		// Reload Aries
	  _developer.append(new nw.gui.MenuItem({
			label: "Reload Aries",
			click: function() {

				nw.win.reload();
				// nw.win.maximize(); // gotta be a better solution than this
				console.log("Reloaded Aries");

			},
		  key: "r",
		  modifiers: "shift-ctrl",
		}));

		_developer.append(new nw.gui.MenuItem({ type: "separator" }));



		// View Source
	  _developer.append(new nw.gui.MenuItem({
			label: "View Source",
			click: function() {
				console.log("Clicked 'View Source'");
			},
		  key: "u",
		  modifiers: "ctrl",
		}));

		_developer.append(new nw.gui.MenuItem({ type: "separator" }));



		// Task Manager
	  _developer.append(new nw.gui.MenuItem({
			label: "Task Manager",
			click: function() {
				console.log("Clicked 'Task Manager'");
			},
		  key: "",
		  modifiers: "",
		}));



		// Plugins
	  _developer.append(new nw.gui.MenuItem({
			label: "Plugins",
			click: function() {
				console.log("Clicked 'Plugins'");
			},
		  key: "",
		  modifiers: "",
		}));

		menubar.append(new nw.gui.MenuItem({
			label: "Developer",
			submenu: _developer
		}));

		/***********************************************/



		// Window Menu
		var _window = new nw.gui.Menu();

	  _window.append(new nw.gui.MenuItem({
			label: "Test 005",
			click: function() {
				console.log("Clicked 'Test 005'");
			},
		  key: "",
		  modifiers: "",
		}));

		_window.append(new nw.gui.MenuItem({ type: "separator" }));

		menubar.append(new nw.gui.MenuItem({
			label: "Window",
			submenu: _window
		}));

		/***********************************************/



		// Help Menu
	  var _help = new nw.gui.Menu();



		// Aries Help
	  _help.append(new nw.gui.MenuItem({
			label: "Aries Help",
			click: function() {
				console.log("Clicked 'Aries Help'");
			}
		}));



		// Keyboard Shortcuts
	  _help.append(new nw.gui.MenuItem({
			label: "Keyboard Shortcuts",
			click: function() {
				console.log("Clicked 'Keyboard Shortcuts'");
			}
		}));

		_help.append(new nw.gui.MenuItem({ type: "separator" }));



		// Report Issues
	  _help.append(new nw.gui.MenuItem({
			label: "Report Issues",
			click: function() {
				console.log("Clicked 'Report Issues'");
			}
		}));

	  menu_help = new nw.gui.MenuItem({ label: "Help" });
	  menu_help.submenu = _help;

		menubar.append(menu_help);

		/***********************************************/



		// Assign the menubars to window menu
		nw.win.menu = menubar;
		console.log("Windows machine");
	}

	if (os.platform() === "darwin") {
		// var menu = new nw.gui.Menu({ type: "menubar" });
		// menu.createMacBuiltin("Aries");
		// nw.win.menu = menu;

		// Create a menubar for window menu
		var menubar = new nw.gui.Menu({ type: "menubar" });

		/***********************************************/

		// Aries Menu
		var _aries = new nw.gui.Menu();

		// About
		_aries.append(new nw.gui.MenuItem({
			label: "About Aries",
			click: function () {

				console.log("Clicked 'About Aries'");

				/*
				// iTunes-style About window
				var win = nw.gui.Window.open("about.html", {
				  "position": "center",
				  "width": 600,
				  "height": 297,
				  "frame": false,
				  "toolbar": false
				});

				win.on("load", function () { this.focus(true); });
				*/

				_pageAbout();

			}
		}));

		_aries.append(new nw.gui.MenuItem({ type: "separator" }));



		// Preferences
		_aries.append(new nw.gui.MenuItem({
			label: "Preferences",
			click: function () {
				console.log("Clicked 'Preferences'");
			},
		  key: ",",
		  modifiers: "cmd",
		}));

		_aries.append(new nw.gui.MenuItem({ type: "separator" }));



		// Synchronize
		_aries.append(new nw.gui.MenuItem({
			label: "Synchronize", // Aries Connect
			click: function () {
				console.log("Clicked 'Synchronize'");
			}
		}));



		// Clear Private Data
		_aries.append(new nw.gui.MenuItem({
			label: "Clear Private Data",
			click: function () {
				console.log("Clicked 'Clear Private Data'");
			}
		}));

		_aries.append(new nw.gui.MenuItem({ type: "separator" }));



		// Streamline
		_aries.append(new nw.gui.MenuItem({
			label: "Streamline", // like Opera Turbo
			click: function () {
				console.log("Clicked 'Streamline'");
			}
		}));

		_aries.append(new nw.gui.MenuItem({ type: "separator" }));



		// Hide Aries
		_aries.append(new nw.gui.MenuItem({
			label: "Hide Aries",
			click: function () {
				console.log("Clicked 'Hide Aries'");
			},
		  key: "h",
		  modifiers: "cmd",
		}));



		// Hide Others
		_aries.append(new nw.gui.MenuItem({
			label: "Hide Others",
			click: function () {
				console.log("Clicked 'Hide Others'");
			},
		  key: "h",
		  modifiers: "shift-cmd",
		}));



		// Show All
		_aries.append(new nw.gui.MenuItem({
			label: "Show All",
			click: function () {
				console.log("Clicked 'Show All'");
			}
		}));

		_aries.append(new nw.gui.MenuItem({ type: "separator" }));



		// Quit Aries
		_aries.append(new nw.gui.MenuItem({
			label: "Quit Aries",
			click: function () {

				nw.win.close();
				console.log("Clicked 'Quit Aries'");

			},
		  key: "q",
		  modifiers: "cmd",
		}));

		menubar.append(new nw.gui.MenuItem({
			label: "Aries",
			submenu: _aries
		}));

		/***********************************************/



		// File Menu
	  var _file = new nw.gui.Menu();



		// New Tab
	  _file.append(new nw.gui.MenuItem({
			label: "New Tab",
			click: function() {
				console.log("Clicked 'New Tab'");



				// Remove focus from other tabs and windows
				$(".tab, .tabs-pane").removeClass("active");

				$("#tab-wrapper").append(tabInit);
				$("#aries-showcase").append(iframeInit);

				$("#url-bar").val("").focus();

				var tabID = 0, windowID = 0;



				// Add a new tab
				$("#tab-wrapper .tab").each(function () {

					tabID++;
					$(this).attr("data-tab", "#tab" + tabID);

					var dataPage = $(this).attr("data-page");
					console.log(dataPage);

				});



				// Add a new window
				$("#aries-showcase iframe").each(function () {

					windowID++;
					$(this).attr("id", "tab" + windowID);
					// $(this).attr("src", dataPage);

				}).css({ "width": nw.win.window.innerWidth, "height": nw.win.window.innerHeight - 31 + "px" });

				$("iframe.active").each(function () {
				  this.contentWindow.location.reload(true);
				});



				// Reinitialize tabby to recognize new tab and window
				tabby.init();
				tabHover();

				console.log("New tab added to Aries");
			},
		  key: "t",
		  modifiers: "cmd",
		}));



		// New Window
	  _file.append(new nw.gui.MenuItem({
			label: "New Window",
			click: function() {
				console.log("Clicked 'New Window'");
			},
		  key: "n",
		  modifiers: "cmd",
		}));



		// New Private Window
	  _file.append(new nw.gui.MenuItem({
			label: "New Private Window",
			click: function() {
				console.log("Clicked 'New Private Window'");
			},
		  key: "n",
		  modifiers: "shift-cmd",
		}));



		// Open File
	  _file.append(new nw.gui.MenuItem({
			label: "Open File",
			click: function() {
				console.log("Clicked 'Open File'");
			},
		  key: "o",
		  modifiers: "cmd",
		}));



		// Open Location
	  _file.append(new nw.gui.MenuItem({
			label: "Open Location",
			click: function() {
				console.log("Clicked 'Open Location'");
			},
		  key: "l",
		  modifiers: "cmd",
		}));

		_file.append(new nw.gui.MenuItem({ type: "separator" }));



		// Reload Tab
	  _file.append(new nw.gui.MenuItem({
			label: "Reload Tab",
			click: function() {

				$("iframe.active").attr("src", function (i, val) { return val; });
				console.log("Reloaded Tab");

			},
		  key: "r",
		  modifiers: "cmd",
		}));



		// Close Tab
	  _file.append(new nw.gui.MenuItem({
			label: "Close Tab",
			click: function() {
				console.log("Clicked 'Close Tab'");
			},
		  key: "w",
		  modifiers: "cmd",
		}));



		// Close Other Tabs
	  _file.append(new nw.gui.MenuItem({
			label: "Close Other Tabs",
			click: function() {
				console.log("Clicked 'Close Other Tabs'");
			}
		}));



		// Close Window
	  _file.append(new nw.gui.MenuItem({
			label: "Close Window",
			click: function() {
				console.log("Clicked 'Close Window'");
			},
		  key: "w",
		  modifiers: "shift-cmd",
		}));

		_file.append(new nw.gui.MenuItem({ type: "separator" }));



		// Save Page As
	  _file.append(new nw.gui.MenuItem({
			label: "Save Page As",
			click: function() {
				console.log("Clicked 'Save Page As'");
			},
		  key: "s",
		  modifiers: "shift-cmd",
		}));

		_file.append(new nw.gui.MenuItem({ type: "separator" }));



		// Print
	  _file.append(new nw.gui.MenuItem({
			label: "Print",
			click: function() {
				console.log("Clicked 'Print'");
			},
		  key: "p",
		  modifiers: "cmd",
		}));

		menubar.append(new nw.gui.MenuItem({
			label: "File",
			submenu: _file
		}));

		/***********************************************/



		// Edit Menu
		var _edit = new nw.gui.Menu();



		// Undo
	  _edit.append(new nw.gui.MenuItem({
			label: "Undo",
			click: function() {
				console.log("Clicked 'Undo'");
			},
		  key: "z",
		  modifiers: "cmd",
		}));



		// Redo
	  _edit.append(new nw.gui.MenuItem({
			label: "Redo",
			click: function() {
				console.log("Clicked 'Redo'");
			},
		  key: "z",
		  modifiers: "shift-cmd",
		}));

		_edit.append(new nw.gui.MenuItem({ type: "separator" }));



		// Cut
	  _edit.append(new nw.gui.MenuItem({
			label: "Cut",
			click: function() {

				document.execCommand("cut");
				console.log("Cut something");

			},
		  key: "x",
		  modifiers: "cmd",
		}));



		// Copy
	  _edit.append(new nw.gui.MenuItem({
			label: "Copy",
			click: function() {

				document.execCommand("copy");
				console.log("Copied something");

			},
		  key: "c",
		  modifiers: "cmd",
		}));



		// Paste
	  _edit.append(new nw.gui.MenuItem({
			label: "Paste",
			click: function() {

				document.execCommand("paste");
				console.log("Pasted something");

			},
		  key: "v",
		  modifiers: "cmd",
		}));



		// Select All
	  _edit.append(new nw.gui.MenuItem({
			label: "Select All",
			click: function() {

				document.execCommand("SelectAll");
				console.log("Clicked 'Select All'");

			},
		  key: "a",
		  modifiers: "cmd",
		}));

		_edit.append(new nw.gui.MenuItem({ type: "separator" }));



		// Find
	  _edit.append(new nw.gui.MenuItem({
			label: "Find",
			click: function() {
				console.log("Clicked 'Find'");
			},
		  key: "f",
		  modifiers: "cmd",
		}));



		// Find Next
	  _edit.append(new nw.gui.MenuItem({
			label: "Find Next",
			click: function() {
				console.log("Clicked 'Find Next'");
			},
		  key: "g",
		  modifiers: "cmd",
		}));



		// Find Previous
	  _edit.append(new nw.gui.MenuItem({
			label: "Find Previous",
			click: function() {
				console.log("Clicked 'Find Previous'");
			},
		  key: "g",
		  modifiers: "shift-cmd",
		}));

		menubar.append(new nw.gui.MenuItem({
			label: "Edit",
			submenu: _edit
		}));

		/***********************************************/



		// View Menu
		var _view = new nw.gui.Menu();

	  _view.append(new nw.gui.MenuItem({
			label: "Test 002",
			click: function() {
				console.log("Clicked 'Test 002'");
			},
		  key: "",
		  modifiers: "",
		}));

		_view.append(new nw.gui.MenuItem({ type: "separator" }));

		menubar.append(new nw.gui.MenuItem({
			label: "View",
			submenu: _view
		}));

		/***********************************************/



		// History Menu
		var _history = new nw.gui.Menu();

	  _history.append(new nw.gui.MenuItem({
			label: "Test 003",
			click: function() {
				console.log("Clicked 'Test 003'");
			},
		  key: "",
		  modifiers: "",
		}));

		_history.append(new nw.gui.MenuItem({ type: "separator" }));

		menubar.append(new nw.gui.MenuItem({
			label: "History",
			submenu: _history
		}));

		/***********************************************/



		// Developer Menu
		var _developer = new nw.gui.Menu();



		// Web Inspector
	  _developer.append(new nw.gui.MenuItem({
			label: "Web Inspector",

			click: function() {

				nw.win.showDevTools();
				// win.showDevTools([id | iframe, headless]);
				console.log("Dev Mode, ON");

			},
		  key: "i",
		  modifiers: "shift-cmd",
		}));



		// Reload Aries
	  _developer.append(new nw.gui.MenuItem({
			label: "Reload Aries",
			click: function() {

				nw.win.reload();
				// nw.win.maximize(); // gotta be a better solution than this
				console.log("Reloaded Aries");

			},
		  key: "r",
		  modifiers: "shift-cmd",
		}));

		_developer.append(new nw.gui.MenuItem({ type: "separator" }));



		// View Source
	  _developer.append(new nw.gui.MenuItem({
			label: "View Source",
			click: function() {
				console.log("Clicked 'View Source'");
			},
		  key: "u",
		  modifiers: "cmd",
		}));

		_developer.append(new nw.gui.MenuItem({ type: "separator" }));



		// Task Manager
	  _developer.append(new nw.gui.MenuItem({
			label: "Task Manager",
			click: function() {
				console.log("Clicked 'Task Manager'");
			},
		  key: "",
		  modifiers: "",
		}));



		// Plugins
	  _developer.append(new nw.gui.MenuItem({
			label: "Plugins",
			click: function() {
				console.log("Clicked 'Plugins'");
			},
		  key: "",
		  modifiers: "",
		}));

		menubar.append(new nw.gui.MenuItem({
			label: "Developer",
			submenu: _developer
		}));

		/***********************************************/



		// Window Menu
		var _window = new nw.gui.Menu();

	  _window.append(new nw.gui.MenuItem({
			label: "Test 005",
			click: function() {
				console.log("Clicked 'Test 005'");
			},
		  key: "",
		  modifiers: "",
		}));

		_window.append(new nw.gui.MenuItem({ type: "separator" }));

		menubar.append(new nw.gui.MenuItem({
			label: "Window",
			submenu: _window
		}));

		/***********************************************/



		// Help Menu
	  var _help = new nw.gui.Menu();



		// Aries Help
	  _help.append(new nw.gui.MenuItem({
			label: "Aries Help",
			click: function() {
				console.log("Clicked 'Aries Help'");
			}
		}));



		// Keyboard Shortcuts
	  _help.append(new nw.gui.MenuItem({
			label: "Keyboard Shortcuts",
			click: function() {
				console.log("Clicked 'Keyboard Shortcuts'");
			}
		}));

		_help.append(new nw.gui.MenuItem({ type: "separator" }));



		// Report Issues
	  _help.append(new nw.gui.MenuItem({
			label: "Report Issues",
			click: function() {
				console.log("Clicked 'Report Issues'");
			}
		}));

	  menu_help = new nw.gui.MenuItem({ label: "Help" });
	  menu_help.submenu = _help;

		menubar.append(menu_help);

		/***********************************************/



		// Assign the menubars to window menu
		nw.win.menu = menubar;
	}