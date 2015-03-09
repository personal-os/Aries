_stylesInit = "";
_stylesInit += "<style id='aries__style'>";

  // Basic styles
  _stylesInit += "html, body, article, aside, footer, header, hgroup, main, nav, section, h1, h2, h3, h4, h5, h6," +
                 "p, ul, ol, menu, dir, pre, code { ";
    _stylesInit += "display: block; ";
  _stylesInit += "} ";

  // Head styles
  _stylesInit += "head { display: none; } ";

  // Body styles
  _stylesInit += "body { ";
    _stylesInit += "background-color: #fcfcfc; ";
    _stylesInit += "color: rgba(25, 25, 25, 0.9); ";
    _stylesInit += "font-family: sans-serif; ";
    _stylesInit += "font-size: 16px; ";
    _stylesInit += "line-height: 1.33; ";
    _stylesInit += "margin: 1rem; ";
  _stylesInit += "} ";

  // Header tag styles
  _stylesInit += "h1, h2, h3, h4, h5, h6 { ";
    _stylesInit += "font-weight: 700; ";
    _stylesInit += "-webkit-margin-before: 0; ";
    _stylesInit += "-webkit-margin-after: 0; ";
    _stylesInit += "-webkit-margin-start: 0; ";
    _stylesInit += "-webkit-margin-end: 0; ";
  _stylesInit += "} ";

  _stylesInit += "h1 { font-size: 2rem; } ";
  _stylesInit += "h2 { font-size: 1.5rem; } ";
  _stylesInit += "h3 { font-size: 1.3rem; } ";
  _stylesInit += "h4 { font-size: 1.1rem; } ";
  _stylesInit += "h5 { font-size: 0.9rem; } ";
  _stylesInit += "h6 { font-size: 0.7rem; }";

  // Paragraph styles
  _stylesInit += "p {";
    _stylesInit += "-webkit-margin-before: 1rem; ";
    _stylesInit += "-webkit-margin-after: 1rem; ";
    _stylesInit += "-webkit-margin-start: 0; ";
    _stylesInit += "-webkit-margin-end: 0; ";
  _stylesInit += "}";

  // List styles
  _stylesInit += "ul, ol, menu, dir { ";
    _stylesInit += "-webkit-margin-before: 1rem; ";
    _stylesInit += "-webkit-margin-after: 1rem; ";
    _stylesInit += "-webkit-margin-start: 0; ";
    _stylesInit += "-webkit-margin-end: 0; ";
    _stylesInit += "-webkit-padding-start: 2.5rem; ";
  _stylesInit += "}";

  _stylesInit += "ul, menu, dir { ";
    _stylesInit += "list-style-type: disc; ";
  _stylesInit += "} ";

  _stylesInit += "ol { ";
    _stylesInit += "list-style-type: decimal; ";
  _stylesInit += "} ";

  _stylesInit += "li { ";
    _stylesInit += "display: list-item; ";
    _stylesInit += "text-align: -webkit-match-parent; ";
  _stylesInit += "} ";

  // Code styles
  _stylesInit += "pre, code { ";
    // _stylesInit += "display: inline; ";
    _stylesInit += "font-family: 'Source Code Pro', 'Courier New', monospace; ";
    _stylesInit += "margin: 1rem 0; ";
    _stylesInit += "white-space: pre; ";
  _stylesInit += "} ";

  // Context Menu
  _stylesInit += "#aries-contextMenu__default, #aries-contextMenu__text, #aries-contextMenu__image { ";
    _stylesInit += "width: auto; height: auto; ";
    _stylesInit += "background-color: #eff0f1; ";
    _stylesInit += "border-radius: 5px; ";
    _stylesInit += "box-shadow: 0 0 5px 1px rgba(25, 25, 25, 0.15); ";
    _stylesInit += "box-sizing: border-box; ";
    _stylesInit += "cursor: default; ";
    _stylesInit += "display: none; ";
    _stylesInit += "font-family: 'Libre Baskerville', 'Source Code Pro', 'Courier New', monospace; ";
    _stylesInit += "font-size: 12px; ";
    _stylesInit += "line-height: 1; ";
    _stylesInit += "margin: 0; ";
    _stylesInit += "padding-top: 0.2rem; padding-bottom: 0.2rem; ";
    _stylesInit += "overflow: hidden; ";
    _stylesInit += "position: absolute; ";
    _stylesInit += "text-align: left; ";
    _stylesInit += "z-index: 1000; ";
    _stylesInit += "-webkit-margin-before: 0; ";
    _stylesInit += "-webkit-margin-after: 0; ";
    _stylesInit += "-webkit-padding-start: 0; ";
  _stylesInit += "} ";

  _stylesInit += ".aries-contextMenu__item { ";
    _stylesInit += "background-color: transparent; ";
    // _stylesInit += "border-bottom: 1px solid rgba(25, 25, 25, 0.15); ";
    _stylesInit += "color: #191919; ";
    _stylesInit += "cursor: inherit; ";
    _stylesInit += "padding: 0.5rem 1rem; ";
    _stylesInit += "transition: background-color 0.05s ease-in-out; ";
  _stylesInit += "} ";

  _stylesInit += ".aries-contextMenu__item:hover { ";
    _stylesInit += "background-color: #50bebf; ";
    // _stylesInit += "border-bottom: 1px solid #50bebf; ";
    _stylesInit += "color: #fefefe; ";
  _stylesInit += "} ";

  _stylesInit += ".aries-contextMenu__item:last-of-type, .aries-contextMenu__item:last-of-type:hover { ";
    _stylesInit += "border-bottom: none; ";
  _stylesInit += "} ";

  _stylesInit += "#aries-contextMenu__image { width: 170px; } ";
  _stylesInit += "#aries-contextMenu__default { width: 115px; } ";

  // GitHub
  _stylesInit += ".markdown-body code { display: inline; } ";

  // YouTube
  _stylesInit += "#watch7-sidebar-offer, #watch7-sidebar-ads { display: none !important; }";

  // Polygon
  _stylesInit += ".ad_slidedown, .m-ad, .m-ad__leaderboard, .dfp_ad, .ad_chunk_a { display: none !important; }";
  _stylesInit += "";
  _stylesInit += "";
  _stylesInit += "";

_stylesInit += "</style>";

_contextInit = "";

_contextInit += "<ul id='aries-contextMenu__default'>";
  _contextInit += "<li id='acMd__back' class='aries-contextMenu__item'>Back</li>";
  _contextInit += "<li id='acMd__forward' class='aries-contextMenu__item'>Forward</li>";
  _contextInit += "<li id='acMd__reload' class='aries-contextMenu__item'>Reload</li>";
  _contextInit += "<li id='acMd__copy' class='aries-contextMenu__item'>Copy</li>";
  _contextInit += "<li id='acMd__source' class='aries-contextMenu__item'>View Source</li>";
  // _contextInit += "<li class='aries-contextMenu__item'>Copy Address</li>";
_contextInit += "</ul>";

_contextInit += "<ul id='aries-contextMenu__text'>";
  _contextInit += "<li class='aries-contextMenu__item'>Search</li>";
  // _contextInit += "<li class='aries-contextMenu__item'>Copy</li>";
_contextInit += "</ul>";

_contextInit += "<ul id='aries-contextMenu__image'>";
  _contextInit += "<li class='aries-contextMenu__item'>Copy Image Address</li>";
  _contextInit += "<li class='aries-contextMenu__item'>Copy Image</li>";
  _contextInit += "<li class='aries-contextMenu__item'>Open Image in New Tab</li>";
_contextInit += "</ul>";

$.each($("iframe.active"), function() {

  // Context Menu
  var
  $frameHead = $(this).contents().find("head"),
  $frameBody = $(this).contents().find("body"),
  mouseX, mouseY;

  if ($frameHead.find("#aries__style").length > 0) {
    console.log("Styles already exist");
  } else {
    $frameHead.prepend(_stylesInit);
    console.log("Injected default Aries styles");
  }

  if ($frameBody.find("#aries-contextMenu__default, #aries-contextMenu__text, #aries-contextMenu__image").length > 0) {
    console.log("Menus already exist");
  } else {
    $frameBody.append(_contextInit);
    console.log("Injected context menus");
  }

  $frameBody[0].addEventListener("mousemove", function (e) {

    mouseX = e.pageX;
    mouseY = e.pageY;
    // console.log(e.pageX + "px + " + e.pageY + "px");

  });

  // http://hikar.io/test.html

  $frameBody[0].addEventListener("contextmenu", function (event) {

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

      $("iframe.active").contents().find("body").bind("click", function (e) {
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

      $("iframe.active").contents().find("body #acMd__source").bind("click", function () {
        console.log("Viewing source?");
      });

      $("iframe.active").contents().find("body").bind("click", function (e) {
        if ($(e.target).closest("body #aries-contextMenu__default").length === 0) {
          // click happened outside of menu, hide any visible menu items
          $("iframe.active").contents().find("body #aries-contextMenu__default").fadeOut("fast");
        }
      });

    }

    // return false;

  });

});