// menubar.js
// @IdeasNeverCease
// ========================================================

/* jshint undef: true, unused: true */
/* global $, document, require, _pageAbout, tabInit, iframeInit, pageLoad, tabby, tabHover */

// Initialize Node Webkit
var
  nw = {
    gui: require("nw.gui"),
    win: require("nw.gui").Window.get(),
    platform: require("os").platform,
    spawn: require("child_process").spawn,
    exec: require("child_process").exec,
    fs: require("fs"),
    path: require("path")
  }
  // os = require("os")
;

// Should really put platform specific things in conditionals,
// instead of duplicating functionality.
// `if (os.platform() === "win32")`, &c
// `if (os.platform() === "darwin")`

// var menu = new nw.gui.Menu({ type: "menubar" });
// menu.createMacBuiltin("Aries");
// nw.win.menu = menu;



// Create a menubar for window menu
var
  menubar = new nw.gui.Menu({ type: "menubar" }),
  ariesMenuItem = new nw.gui.Menu(), // Aries Menu
  fileMenuItem = new nw.gui.Menu() // File Menu
;



//------------------------------
// Aries Menu Item
//
//------------------------------



////////////////////////// About
ariesMenuItem.append(new nw.gui.MenuItem({
  label: "About Aries",

  click: function () {
    _pageAbout();
    console.log("Clicked 'About Aries'");
  }
}));

ariesMenuItem.append(new nw.gui.MenuItem({ type: "separator" }));



//////////////////// Preferences
ariesMenuItem.append(new nw.gui.MenuItem({
  label: "Preferences",

  click: function () {
    console.log("Clicked 'Preferences'");
  },

  key: ",",
  modifiers: "cmd"
}));

ariesMenuItem.append(new nw.gui.MenuItem({ type: "separator" }));



//////////////////// Synchronize
ariesMenuItem.append(new nw.gui.MenuItem({
  label: "Synchronize", // Aries Connect

  click: function () {
    console.log("Clicked 'Synchronize'");
  }
}));



///////////// Clear Private Data
ariesMenuItem.append(new nw.gui.MenuItem({
  label: "Clear Private Data",

  click: function () {
    console.log("Clicked 'Clear Private Data'");
  }
}));

ariesMenuItem.append(new nw.gui.MenuItem({ type: "separator" }));



///////////////////// Streamline
ariesMenuItem.append(new nw.gui.MenuItem({
  label: "Streamline", // like Opera Turbo

  click: function () {
    console.log("Clicked 'Streamline'");
  }
}));

ariesMenuItem.append(new nw.gui.MenuItem({ type: "separator" }));



///////////////////// Hide Aries
ariesMenuItem.append(new nw.gui.MenuItem({
  label: "Hide Aries",

  click: function () {
    console.log("Clicked 'Hide Aries'");
  },

  key: "h",
  modifiers: "cmd"
}));



//////////////////// Hide Others
ariesMenuItem.append(new nw.gui.MenuItem({
  label: "Hide Others",

  click: function () {
    console.log("Clicked 'Hide Others'");
  },

  key: "h",
  modifiers: "shift-cmd"
}));



/////////////////////// Show All
ariesMenuItem.append(new nw.gui.MenuItem({
  label: "Show All",

  click: function () {
    console.log("Clicked 'Show All'");
  }
}));

ariesMenuItem.append(new nw.gui.MenuItem({ type: "separator" }));



///////////////////// Quit Aries
ariesMenuItem.append(new nw.gui.MenuItem({
  label: "Quit Aries",

  click: function () {
    nw.win.close();
    console.log("Clicked 'Quit Aries'");
  },

  key: "q",
  modifiers: "cmd"
}));



// Init
menubar.append(new nw.gui.MenuItem({
  label: "Aries",
  submenu: ariesMenuItem
}));



//------------------------------
// File Menu Item
//
//------------------------------



//////////////////////// New Tab
fileMenuItem.append(new nw.gui.MenuItem({
  label: "New Tab",

  click: function () {
    console.log("Clicked 'New Tab'");

    // Remove focus from other tabs and windows
    $(".tab, .tabs-pane").removeClass("active");

    $("#tab-wrapper").append(tabInit);
    $("#aries-showcase").append(iframeInit);

    pageLoad();

    $("#url-bar").val("").focus();

    var
      tabID = 0,
      windowID = 0
    ;

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

    // Make sure URL bar shows. Gets stuck when clicking links with _target.
    $("#url-bar").css("top", "0");
    $("#status-bar").css("top", "31px");

    console.log("New tab added to Aries");
  },

  key: "t",
  modifiers: "cmd"
}));



///////////////////// New Window
fileMenuItem.append(new nw.gui.MenuItem({
  label: "New Window",

  click: function () {
    console.log("Clicked 'New Window'");
  },

  key: "n",
  modifiers: "cmd"
}));



///////////// New Private Window
fileMenuItem.append(new nw.gui.MenuItem({
  label: "New Private Window",

  click: function () {
    console.log("Clicked 'New Private Window'");
  },

  key: "n",
  modifiers: "shift-cmd"
}));



////////////////////// Open File
fileMenuItem.append(new nw.gui.MenuItem({
  label: "Open File",

  click: function () {
    console.log("Clicked 'Open File'");
  },

  key: "o",
  modifiers: "cmd"
}));



////////////////// Open Location
fileMenuItem.append(new nw.gui.MenuItem({
  label: "Open Location",

  click: function () {
    console.log("Clicked 'Open Location'");
  },

  key: "l",
  modifiers: "cmd"
}));

fileMenuItem.append(new nw.gui.MenuItem({ type: "separator" }));



///////////////////// Reload Tab
fileMenuItem.append(new nw.gui.MenuItem({
  label: "Reload Tab",

  click: function () {
    $("iframe.active").attr("src", function (i, val) { return val; });
    console.log("Reloaded Tab");
  },

  key: "r",
  modifiers: "cmd"
}));



////////////////////// Close Tab
fileMenuItem.append(new nw.gui.MenuItem({
  label: "Close Tab",

  click: function () {
    console.log("Clicked 'Close Tab'");
  },

  key: "w",
  modifiers: "cmd"
}));



/////////////// Close Other Tabs
fileMenuItem.append(new nw.gui.MenuItem({
  label: "Close Other Tabs",

  click: function () {
    console.log("Clicked 'Close Other Tabs'");
  }
}));



/////////////////// Close Window
fileMenuItem.append(new nw.gui.MenuItem({
  label: "Close Window",

  click: function () {
    console.log("Clicked 'Close Window'");
  },

  key: "w",
  modifiers: "shift-cmd"
}));

fileMenuItem.append(new nw.gui.MenuItem({ type: "separator" }));



/////////////////// Save Page As
fileMenuItem.append(new nw.gui.MenuItem({
  label: "Save Page As",

  click: function () {
    console.log("Clicked 'Save Page As'");
  },

  key: "s",
  modifiers: "shift-cmd",
}));

fileMenuItem.append(new nw.gui.MenuItem({ type: "separator" }));



////////////////////////// Print
fileMenuItem.append(new nw.gui.MenuItem({
  label: "Print",

  click: function () {
    console.log("Clicked 'Print'");
  },

  key: "p",
  modifiers: "cmd"
}));



// Init
menubar.append(new nw.gui.MenuItem({
  label: "File",
  submenu: fileMenuItem
}));










// Edit Menu
var _edit = new nw.gui.Menu();



/*
  // Undo
  _edit.append(new nw.gui.MenuItem({
    label: "Undo",

    click: function () {
      console.log("Clicked 'Undo'");
    },

    key: "z",
    modifiers: "cmd"
  }));



  // Redo
  _edit.append(new nw.gui.MenuItem({
    label: "Redo",

    click: function () {
      console.log("Clicked 'Redo'");
    },

    key: "z",
    modifiers: "shift-cmd"
  }));

  _edit.append(new nw.gui.MenuItem({ type: "separator" }));
  */



// Cut
_edit.append(new nw.gui.MenuItem({
  label: "Cut",

  click: function () {

    document.execCommand("cut");
    console.log("Cut something");

  },

  key: "x",
  modifiers: "cmd"
}));



// Copy
_edit.append(new nw.gui.MenuItem({
  label: "Copy",

  click: function () {

    document.execCommand("copy");
    console.log("Copied something");

  },

  key: "c",
  modifiers: "cmd"
}));



// Paste
_edit.append(new nw.gui.MenuItem({
  label: "Paste",

  click: function () {

    document.execCommand("paste");
    console.log("Pasted something");

  },

  key: "v",
  modifiers: "cmd"
}));



// Select All
_edit.append(new nw.gui.MenuItem({
  label: "Select All",

  click: function () {

    document.execCommand("SelectAll");
    console.log("Clicked 'Select All'");

  },

  key: "a",
  modifiers: "cmd"
}));

_edit.append(new nw.gui.MenuItem({ type: "separator" }));



/*
  // Find
  _edit.append(new nw.gui.MenuItem({
    label: "Find",

    click: function () {
      console.log("Clicked 'Find'");
    },

    key: "f",
    modifiers: "cmd"
  }));



  // Find Next
  _edit.append(new nw.gui.MenuItem({
    label: "Find Next",

    click: function () {
      console.log("Clicked 'Find Next'");
    },

    key: "g",
    modifiers: "cmd"
  }));



  // Find Previous
  _edit.append(new nw.gui.MenuItem({
    label: "Find Previous",

    click: function () {
      console.log("Clicked 'Find Previous'");
    },

    key: "g",
    modifiers: "shift-cmd",
  }));
  */

menubar.append(new nw.gui.MenuItem({
  label: "Edit",
  submenu: _edit
}));

/***********************************************/



/*
  // View Menu
  var _view = new nw.gui.Menu();

  _view.append(new nw.gui.MenuItem({
    label: "Test 002",

    click: function () {
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
  */

/***********************************************/



/*
  // History Menu
  var _history = new nw.gui.Menu();

  _history.append(new nw.gui.MenuItem({
    label: "Test 003",

    click: function () {
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
  */

/***********************************************/



// Developer Menu
var _developer = new nw.gui.Menu();



// Web Inspector
_developer.append(new nw.gui.MenuItem({
  label: "Web Inspector",

  click: function () {
    nw.win.showDevTools();

    // "pages/devtools.html" opens
    // "http://127.0.0.1:2000/devtools/inspector.html"
    // TODO: Figure out why localhost:2000 isn't working

    /*
      var winnnn = nw.gui.Window.open("pages/devtools.html", {
        "width": 1066,
        "height": 568,
        "focus": true,
        "frame": false,
        "fullscreen": false,
        "icon": "app.nw/resources/images/aries.icns",
        "position": "center",
        "resizable": true,
        "title": "Aries"
      });

      winnnn;
      */

    /*
      // var url = "pages/devtools.html";
      nw.win.showDevTools(false, true);

      nw.win.on("devtools-opened", function(url) {
        console.log("devtools-opened: " + url);

        var winnnn = nw.gui.Window.open("pages/devtools.html", {
          "width": 1066,
          "height": 568,
          "focus": true,
          "frame": false,
          "fullscreen": false,
          "icon": "app.nw/resources/images/aries.icns",
          "position": "center",
          "resizable": true,
          "title": "Aries"
        });

        $("#devtools").src(url);

        winnnn;

        var tools=document.createElement("iframe");
        tools.src = url;
        document.querySelector("body").appendChild(tools);
        tools.style.background="black";
        tools.style.position="absolute";
        tools.style.top= "0";
        tools.style.left= "0";
        tools.style.width= "100%";
        tools.style.height= "100%";
        tools.style.border= "none";
        tools.style.color= "white";
      });
      */

    /*
      nw.win.showDevTools(false, true);

      nw.win.on("devtools-opened", function(url) {
        console.log("devtools-opened: " + url);
        var tools=document.createElement('iframe');
        tools.src = url;
        document.querySelector('body').appendChild(tools);
        tools.style.background='black';
        tools.style.position='absolute';
        tools.style.top='0px';
        tools.style.left='0px';
        tools.style.width='100%';
        tools.style.height='100%';
        tools.style.border='none';
        tools.style.color='white';
      });
      */

    // nw.win.showDevTools([id | iframe, headless]);
    // nw.win.showDevTools("", false);
    // nw.win.showDevTools("devtools", headless);

    // http://127.0.0.1:2000/devtools/inspector.html

    console.log("Dev Mode, ON");
  },

  key: "i",
  modifiers: "shift-cmd",
}));

/*
  var win = nwgui.Window.get();

  win.showDevTools("", true);

  win.on("devtools-opened", function (url) {
    console.log("devtools-opened: " + url);
    document.getElementById('devtools').src = url;
  });
  */

// Ghostery
_developer.append(new nw.gui.MenuItem({
  label: "Ghostery",

  click: function () {
    console.log("Ghostery!");
    _ghostery();
  },

  key: "g",
  modifiers: "shift-cmd",
}));

// Reload Aries
_developer.append(new nw.gui.MenuItem({
  label: "Reload Aries",

  click: function () {
    nw.win.reload();
    // nw.win.maximize(); // gotta be a better solution than this
    console.log("Reloaded Aries");
  },

  key: "r",
  modifiers: "shift-cmd",
}));

/*
  _developer.append(new nw.gui.MenuItem({ type: "separator" }));



  // View Source
  _developer.append(new nw.gui.MenuItem({
    label: "View Source",

    click: function () {
      console.log("Clicked 'View Source'");
    },

    key: "u",
    modifiers: "cmd"
  }));
  */

/*
  _developer.append(new nw.gui.MenuItem({ type: "separator" }));



  // Task Manager
  _developer.append(new nw.gui.MenuItem({
    label: "Task Manager",

    click: function () {
      console.log("Clicked 'Task Manager'");
    },

    key: "",
    modifiers: "",
  }));



  // Plugins
  _developer.append(new nw.gui.MenuItem({
    label: "Plugins",

    click: function () {
      console.log("Clicked 'Plugins'");
    },

    key: "",
    modifiers: "",
  }));
  */

menubar.append(new nw.gui.MenuItem({
  label: "Developer",
  submenu: _developer
}));

/***********************************************/



/*
  // Window Menu
  var _window = new nw.gui.Menu();

  _window.append(new nw.gui.MenuItem({
    label: "Test 005",

    click: function () {
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
  */

/***********************************************/



// Help Menu
var _help = new nw.gui.Menu();



/*
  // Aries Help
  _help.append(new nw.gui.MenuItem({
    label: "Aries Help",

    click: function () {
      console.log("Clicked 'Aries Help'");
    }
  }));



  // Keyboard Shortcuts
  _help.append(new nw.gui.MenuItem({
    label: "Keyboard Shortcuts",

    click: function () {
      console.log("Clicked 'Keyboard Shortcuts'");
    }
  }));

  _help.append(new nw.gui.MenuItem({ type: "separator" }));
  */



// Report Issues
_help.append(new nw.gui.MenuItem({
  label: "Report Issues",

  click: function () {
    console.log("Clicked 'Report Issues'");

    // TODO:
    // Maybe open a new tab instead of taking over the current active one
    $("iframe.active").attr("src", "https://github.com/IdeasNeverCease/Aries/issues");
    $("button.active").attr("data-page", "https://github.com/IdeasNeverCease/Aries/issues");

    var currentTitle = $("iframe.active").contents().find("title").html();
    $("#aries-titlebar h1").text(currentTitle);
    $("button.active .tab-title").text("Issues · IdeasNeverCease/Aries");
  }
}));

menu_help = new nw.gui.MenuItem({ label: "Help" });
menu_help.submenu = _help;

menubar.append(menu_help);

/***********************************************/



// Assign the menubars to window menu
nw.win.menu = menubar;