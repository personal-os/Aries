// aries.js
// @IdeasNeverCease
// ========================================================

/* jshint undef: true, unused: true */
/* global window, require, __dirname, navigator, process, $, setTimeout, document, macKeys */
/* global NProgress */



//------------------------------
// Global Variables
//------------------------------

window.$ = window.jQuery = require(__dirname + "/resources/scripts/vendor/jquery.min.js");

var
  remote = require("remote"),
  fs = require("fs"),
  del = require("delete"),
  readline = require("readline"),
  os = require("os"),
  openssl = require("openssl-wrapper")
;



//------------------------------
// Signet
//------------------------------

(function (){var autoInit,deferConsole,draw,getContent,getOptions,orDefault,tag;getOptions=function (options){options.title=orDefault(options.title,getContent('meta[name="application-name"]'),getContent('meta[property="og:title"]'),document.title.split(/\u0020[\/\\\|\-\u8211\u8212]\u0020|\:\u0020/)[0],"");options.author=orDefault(options.author,getContent('meta[name=author]'),'');options.description=orDefault(options.description,getContent("meta[name=description]"),getContent('meta[property="og:description"]'),"");options.image=orDefault(options.image,getContent('meta[property="og:image"]'),getContent("meta[name=image]"));options.hue=options.hue||0;options.baseStyles=orDefault(options.baseStyles,'color: #444; font-family: "Open Sans", "Source Sans Pro", Arial, sans-serif;');options.titleStyles=orDefault(options.titleStyles,""+options.baseStyles+"; font-size: 20px; line-height: 30px;");options.authorStyles=orDefault(options.authorStyles,""+options.baseStyles+"; font-size: 12px; line-height: 30px; padding: 0 0 0 20px;");options.descriptionStyles=orDefault(options.descriptionStyles,""+options.baseStyles+"; font-size: 10px; line-height: 20px;");return options;};orDefault=function (){var argument,_i,_len;for(_i=0,_len=arguments.length;_i<_len;_i++){argument=arguments[_i];if(typeof argument!=="undefined"){return argument;}}return arguments[arguments.length-1];};getContent=function (selector){var _ref;return(_ref=document.head.querySelector(selector))!==null?_ref.content:void 0;};deferConsole=function (fn){var callable,i,messages,old,type,types,_fn,_i,_len;types=["log","debug","warn","error"];old={};callable={};messages=[];i=types.length;_fn=function (type){old[type]=console[type];callable[type]=function (){return old[type].apply(console,arguments);};return console[type]=function (){messages.push([type,arguments]);return void 0;};};for(i=_i=0,_len=types.length;_i<_len;i=++_i){type=types[i];_fn(type);}return setTimeout((function (){var _then;_then=function (){var block,message,_j,_len1,_results;while(messages.length){block=messages.shift();type=block[0];message=block[1];old[type].apply(console,message);}_results=[];for(_j=0,_len1=types.length;_j<_len1;_j++){type=types[_j];_results.push(console[type]=old[type]);}return _results;};return fn(callable,_then);}),0);};draw=function (options,_console,cb){var img,_draw;_draw=function (){var args,hue,i;if(options.title){if(!options.image){args=[""];i=0;while(i<options.title.length){args[0]+="%c"+options.title[i];if(options.title[i]===" "){args.push(options.titleStyles);}else{hue=((options.title[i].toLowerCase().charCodeAt(0)*2)+options.hue)%255;args.push(""+options.titleStyles+"; background-color: #50bebf; color: transparent; line-height: 0;");}i++;}_console.log.apply(console,args);}if(options.author){_console.log("%c"+options.title+"%c"+options.author,options.titleStyles,options.authorStyles);}else{_console.log("%c"+options.title,options.titleStyles);}}if(options.description){_console.log("%c"+options.description,options.descriptionStyles);}if(cb){return cb();}};_console=_console||window.console;options=options||window.signet.options||{enabled:true};if(options.enabled===false){return;}options=getOptions(options);if(!options.image){return _draw();}else{img=new Image();img.onload=function (){_console.log("%c ","font-size: 0; line-height: "+img.height+"px; padding: "+(Math.floor(img.height/2))+"px "+img.width+"px "+(Math.ceil(img.height/2))+"px 0; background-image: url(\""+img.src+"\");");return _draw();};return img.src=options.image;}};window.signet=window.signet||{};window.signet.options=window.signet.options||window.signetOptions||{};if(!window.console||!window.console.log||!document.head||!document.querySelector){window.signet.draw=function (){};return;}autoInit=true;tag=document.querySelector("[data-signet-draw]");if(tag){autoInit=tag.getAttribute("data-signet-draw").toLowerCase()!=="false";}if(signet.options.draw===false){autoInit=false;}if(autoInit){deferConsole(function (_console,_then){return draw(null,_console,_then);});}window.signet.draw=draw;}).call(this);



//------------------------------
// On/Off Line Detector
//------------------------------

function update() {
  console.log(
    navigator.onLine ? "\n>> STATUS: Online": ">> STATUS: Offline",
    "\n   " + process.platform + " / " + process.arch + " / " + process.pid
  );

  if (!navigator.onLine) {
    // future
  }
}

window.addEventListener("offline", update);
window.addEventListener("online", update);

update();



//------------------------------
// Boot
//------------------------------

function init(url) {

  $(".tab").removeClass("active");
  $("webview").removeClass("active");
  $("#-url-bar-mask").hide();

  var
    tabInit = "",
    iframeInit = ""
  ;

  // Build tab
  tabInit +=
    "<button class='tab active' data-tab='' data-page='pages/start.html'>" +
      "<img class='tab-favicon' type='image/x-icon' src='resources/images/favicon-default.png'>" +
      "<span class='tab-close'></span>" +
      "<span class='tab-title'></span>" +
    "</button>"
  ;

  // TODO:
  // make user-agent (more) dynamic

  // Build window
  if (url) {
    iframeInit += "<webview class='tabs-pane active' id='' src='" + url + "' preload='file://" + __dirname + "/resources/scripts/browser.js' autosize='on' useragent='Mozilla/5.0 (" + os.type() + " " + os.release() + " " + os.arch() + "; KHTML, like Gecko) Chrome/" + process.versions.chrome + " Aries/1.2'></webview>";
  } else {
    iframeInit += "<webview class='tabs-pane active' id='' src='file://" + __dirname + "/pages/start.html' preload='file://" + __dirname + "/resources/scripts/browser.js' autosize='on' useragent='Mozilla/5.0 (" + os.type() + " " + os.release() + " " + os.arch() + "; KHTML, like Gecko) Chrome/" + process.versions.chrome + " Aries/1.2'></webview>";
  }



  // Things to do before Aries starts
  $("#tab-wrapper").append(tabInit);
  $("#aries-showcase").append(iframeInit);



  // Manage new tabs and windows
  var random = Math.round(Math.random() * 100000000000000000);

  $(".tab.active").each(function () {
    $(this).attr("data-tab", "#tab" + random);
  });

  $("webview.active").each(function () {
    $(this).attr("id", "tab" + random);
  });



  /*
  // Put these files into a folder and flush 'em on exit
  fs.writeFile("" + random + ".txt", $("webview.active").attr("src") + "\n", function (err) {
    if (err) {
      throw err;
    }
  });
  */

  // Bring in menu bar
  // include("resources/scripts/menubar.js");

  tabHover();



  var webview = document.getElementsByClassName("tabs-pane active")[0];

  webview.addEventListener("ipc-message", function (e) {
    if (e.channel === "window-data") {
      // console.log(e.args[0]);

      $(".tab.active .tab-favicon").attr("src", e.args[0].favicon);
      $(".tab.active .tab-title").html(e.args[0].title);
      $("#url-bar").val(e.args[0].url);

      $("#aries-titlebar h1").html("Aries | " + e.args[0].title);
    }



    if (e.channel === "clicked-href") {
      // console.log(e.args[0]);
      new init(e.args[0]);
    }



    // TODO
    // Make this better...cancel out setTimeout?
    var timer;

    if (e.channel === "mouseover-href") {
      // console.log(e.args[0]);
      $(".linker").html(e.args[0]).stop().addClass("active");

      // clearTimeout(timer);

      timer = setTimeout(function () {
        $(".linker").stop().removeClass("active");
      }, 1500);
    }



    $("webview.active").focus();
  });

  webview.addEventListener("did-finish-load", function () {
    if ($("webview.active").attr("src") === "file://" + __dirname + "/pages/start.html") {
      $(".tab.active .tab-favicon").attr("src", "resources/images/favicon-default.png");
      $("#url-bar").val("").focus();
    }
  });

}



//------------------------------
// Let's...GOOOOO
// https://youtube.com/watch?v=ukJa59koTic
//------------------------------

$(function () {

  init();

  // pageLoad();



  $("#-url-bar-mask").click(function () {
    $(this).hide();
    $("#url-bar").focus().select();
  }).blur(function () {
    $(this).show();
  });



  //------------------------------
  // Buttons
  //------------------------------

  // Minimize Aries
  $(".app-minimize").on("click", function () {
    remote.getCurrentWindow().minimize();
  });

  // Un/Maximize Aries
  $(".app-maximize").on("click", function () {
    remote.getCurrentWindow().maximize();
  });

  // Close Aries
  $(".app-close").on("click", function () {
    remote.getCurrentWindow().close();

    // TODO:
    // doesn't actually close out the app
  });



  // TODO
  // Can't rely on default history stuff for webviews
  // Gotta create own system

  // var webview = document.getElementsByClassName("tabs-pane active")[0];

  // Back Button
  $(document).on("click", ".app-go-back", function () {

    // console.log("--- Went back");
    // webview.goBack();

    /*
    var
      ID = $("webview.active").attr("id").replace(/tab/g, ""),
      // url = $("webview.active").attr("src"),

      rl = readline.createInterface({
        input: fs.createReadStream("" + ID + ".txt")
      }),

      current = "",
      prev = ""
    ;



    rl.on("line", function (line) {
      prev = current;
      current = line;

      $("webview.active").attr("src", prev);
      // console.log(prev);
    });
    */

    /*
    rl.on("close", function () {
      console.log(
        "Prev line: ", prev +
        "\nLast line: ", current
      );
    });
    */

  });

  // Forward Button
  $(document).on("click", ".app-go-forth", function () {
    // console.log("--- Went forth");
    // webview.goForward();
  });

});



//------------------------------
// Keyboard Shortcuts
  /*
    e.altKey
    e.ctrlKey
    e.metaKey
    e.shiftKey
  */
//------------------------------

$(document).on("keydown", function (e) {
  if (e.cmdKey || macKeys.cmdKey && e.which === 84) {
    console.log("Cmd + T");
    new init();
  }
});



//------------------------------
// Tab Controls
//------------------------------

$(document).on("click", ".tab-title", function () {

  var tabID = $(this).closest(".tab").attr("data-tab");
  var targetWebview = $("webview" + tabID).attr("src");
  var title = $("webview" + tabID).contents().find("title").html();

  // Remove active states for other tabs/windows
  $(".tab").removeClass("active");
  $("webview").removeClass("active");

  // Add active states for selected tab/window
  $(this).closest(".tab").addClass("active");
  $("webview" + tabID).addClass("active");

  // Populate title/address bar, tab title, and
  // tab icon with appropriate information
  $("#url-bar").val(targetWebview);
  $(".tab-title", this).text(title);
  $("#aries-titlebar h1").text(title);

  // Don't show anything in address bar if on start page,
  // but put it in focus
  if (targetWebview === "file://" + __dirname + "/pages/start.html") {
    $("#url-bar").val("").focus();
  }

  $("#-url-bar-mask").html(targetWebview.replace(/(https:\/\/)/g, "<span style='color: green;'>$&</span>"));

  console.log(tabID);
  console.log(targetWebview);

});

$(document).on("click", ".tab-close", function () {

  // TODO
  // Make this a function so I can use this for keyboard shortcuts
  var tabID = $(this).closest(".tab").attr("data-tab");
  var targetWebview = $(tabID);

  var
    tab = $(".tab"),
    win = $("webview"),
    tabCount = tab.length,
    winCount = win.length,
    ID = $(this).closest(".tab").attr("data-tab").replace(/#tab/g, "")
  ;



  // Delete the file
  del.sync("" + ID + ".txt");

  // If page is still loading, end it
  NProgress.done();



  if ((tabCount == 1) && (winCount == 1)) { // if there is only one window left

    console.log("This is the last tab and window.");

    $(this).closest(".tab").addClass("active");
    $(targetWebview).attr("src", "file://" + __dirname + "/pages/start.html");
    $(targetWebview).addClass("active");

  } else if ((tabCount > 1) && (winCount > 1)) { // if there is more than one window

    if ($(this).parent().hasClass("active") && $(targetWebview).hasClass("active")) {

      var prevTab = $(this).parent(".tab").prev(".tab");
      var nextTab = $(this).parent(".tab").next(".tab");
      var prevWin = $(targetWebview).prev("webview");
      var nextWin = $(targetWebview).next("webview");

      if (prevTab.length) {
        $(this).parent(".tab").prev(".tab").addClass("active");
      } else if (nextTab.length) {
        $(this).parent(".tab").next(".tab").addClass("active");
      }

      if (prevWin.length) {
        $(targetWebview).prev("webview").addClass("active");
      } else if (nextWin.length) {
        $(targetWebview).next("webview").addClass("active");
      }

    } else {

      $(this).parent(".tab").remove();
      $(targetWebview).remove();

    }

    setTimeout(function () {
      var location = $("webview.active").attr("src");
      $("#url-bar").val(location);
    }, 10);

    $(this).parent(".tab").remove();
    $(targetWebview).remove();

  } else if ((tabCount < 1) && (winCount < 1)) { // just create new tab and window

    console.log("Create new tab and window");
    init();

  }

});

$(document).on("click", ".app-settings", function (e) {

  e.preventDefault();
  e.stopPropagation();

  $("#bt-menu").toggleClass("bt-menu--is-open");

  $(document).one("click", function (e) {
    if ($("#bt-menu").has(e.target).length === 0) {
      $("#bt-menu").removeClass("bt-menu--is-open");
    }
  });

});



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

/*
// Grab favicons for tabs
var getFavicon = function () {

  var favicon, tabID = $(".tab.active").attr("data-tab");
  var nodeList = $("webview" + tabID).contents().find("link");
  // var nodeListII = $("iframe" + tabID).contents().find("meta");

  for (var i = 0; i < nodeList.length; i++) {
    // get any type of icon
    // meta property="og:image" content="http://images.apple.com/home/images/og.jpg"
    if ((nodeList[i].getAttribute("rel") == "icon") || (nodeList[i].getAttribute("rel") == "shortcut icon") || (nodeList[i].getAttribute("rel") == "apple-touch-icon")) {
      favicon = nodeList[i].href; // get absolute path
    } // else { favicon = "resources/images/favicon-default.png"; }

    // if (nodeListII[i].getAttribute("property") == "og:image") { favicon = nodeListII[i].content; }

  };

  return favicon;

};
*/

function pageLoad() {

  $("webview.active").on("load", function () {

    // Inject menus and default styles
    // include("resources/scripts/browser.js");
    // include("resources/scripts/scroll/CustomScrollbar.js");



    // Remove focus from URL bar
    // TODO: focus on first input field in iframe.
    //////// if none exist, focus on iframe.
    $(this).focus();

    // Start progress bar when clicking <a> inside window

    webview.find("a").not("a[href*='#'], a[href*='%'], a[href*='javascript:;']").bind("click", function () {

      // Why do people create <a> with no hrefs? Annoying...
      if ($(this).attr("href").length === 0) { return false; }

      if ($(this).attr("target") === "_blank") {
        console.log("New tab from _blank");
      }

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
        // location?

        setTimeout(function () {
          $("#url-bar").val("");
        }, 100);

      }

      // NProgress.start(); // Hmm, may not need this...

      $("button.active .tab-title").html(currentTitle);
      $("button.active .tab-favicon").attr("src", getFavicon);

      var location = $(this)[0].href;
      $("webview.active").attr("src", location);

      console.log("Hmm, " + location);

    });



    // Mouseover fancy-pants stuff
    webview.find("a").not("a[href*='#'], a[href*='%'], a[href*='javascript:;']").bind("mouseenter", function () {

      $("#url-bar").css("top", "-31px");
      $("#status-bar").text($(this)[0].href).css("top", "0");

    }).bind("mouseleave", function () {

      $("#url-bar").css("top", "0");
      $("#status-bar").css("top", "31px");

    });



    /* DEV
    // Reset positions if hover messes up for some reason
    $("#aries-powerbar").on("mouseenter", function () {

      $("#url-bar").css("top", "0");
      $("#status-bar").css("top", "31px");

      console.log("Reset hover");

    });
    */



    /*
    if ($("a[href*='/pdf']").length > 0) {
      _pagePDF();
    }
    */





    // Don't show anything in address bar if on start page,
    // but put it in focus
    if ($("#url-bar").val() === "app://aries/app.nw/pages/start.html") {
      $("#url-bar").val("").focus();
    }

    // Set webview to start page on blank page
    if ($("#url-bar").val() === "about:blank") {
      $("webview.active").attr("src", "pages/start.html");
    }

    // Notification when on certain sites
    var uri = new URI(baseURL);

    // Uncomment below to find hostname parameter
    // console.log(uri.hostname());

    if (uri.hostname() == "www.facebook.com") {
      var fbNotify = webview.find("#notificationsCountValue").text();

      if (fbNotify > 0) {
        $("button.active .tab-favicon").before("<span class='notification-count'>" + fbNotify + "</span>");
        // $(".notification-count").css("opacity", "1");
      } else {
        $(".notification-count").css("opacity", "0");
      }
    }

    if (uri.hostname() == "www.deviantart.com") {
      var daNotify = $.trim(webview.find("#oh-menu-split .oh-l").text());

      if (daNotify !== "undefined") {
        $("button.active .tab-favicon").before("<span class='notification-count'>" + daNotify + "</span>");
        // $(".notification-count").css("opacity", "1");
      } else {
        // $(".notification-count").css("opacity", "0");
      }
    }

  });

}

function _pageAbout() {

  console.log("Internal Aries link!");

  $("webview.active").attr("src", "pages/about.html");
  $("button.active").attr("data-page", "pages/about.html");

  setTimeout(function () {
    $("#url-bar").val("about");
    $("#aries-titlebar h1").text("Aries /// About");
    $("button.active .tab-title").text("About Aries");
  }, 100);

}

function _pageCredits() {

  console.log("Internal Aries link!");

  $("webview.active").attr("src", "pages/credits.html");
  $("button.active").attr("data-page", "pages/credits.html");

  setTimeout(function () {
    $("#url-bar").val("credits");
    $("#aries-titlebar h1").text("Aries /// Credits");
    $("button.active .tab-title").text("Aries Credits");
  }, 100);

}

function _ghostery() {

  console.log("Internal Aries link!");

  $("webview.active").attr("src", "resources/ghostery/walkthrough.html");
  $("button.active").attr("data-page", "resources/ghostery/walkthrough.html");

  setTimeout(function () {
    $("#url-bar").val("ghostery");
    $("#aries-titlebar h1").text("Aries /// Ghostery");
    $("button.active .tab-title").text("Ghostery");
  }, 100);

}



// Search, using DuckDuckGo
function _searchDDG() {

  // looks like input isn't a URL, so search!
  var encodeSearch = "https://duckduckgo.com/?q=" + encodeURIComponent($("#url-bar").val());

  $("webview.active").attr("src", encodeSearch);
  $("button.active").attr("data-page", encodeSearch);

  // Make sure to mention !bangs in the future readme: https://duckduckgo.com/bang.html
  // Also, try to get my app icon for Aries in DDG's "Add to browser" thing

}



// Go to a website, or search for something
function goThere() {

  // 1103 TLDs!
  // TLD list: https://data.iana.org/TLD/tlds-alpha-by-domain.txt
  // created a custom app to take IANA's list out of caps, and add pipe characters
  // Version 2015111100, Last Updated Wed Nov 11 07:07:01 2015 UTC

  var url = /(\S+\.(aaa|aarp|abb|abbott|abogado|ac|academy|accenture|accountant|accountants|aco|active|actor|ad|ads|adult|ae|aeg|aero|af|afl|ag|agency|ai|aig|airforce|airtel|al|allfinanz|alsace|am|amica|amsterdam|android|ao|apartments|app|apple|aq|aquarelle|ar|aramco|archi|army|arpa|arte|as|asia|associates|at|attorney|au|auction|audio|auto|autos|aw|ax|axa|az|azure|ba|band|bank|bar|barcelona|barclaycard|barclays|bargains|bauhaus|bayern|bb|bbc|bbva|bcn|bd|be|beats|beer|bentley|berlin|best|bet|bf|bg|bh|bharti|bi|bible|bid|bike|bing|bingo|bio|biz|bj|black|blackfriday|bloomberg|blue|bm|bms|bmw|bn|bnl|bnpparibas|bo|boats|bom|bond|boo|boots|boutique|br|bradesco|bridgestone|broker|brother|brussels|bs|bt|budapest|build|builders|business|buzz|bv|bw|by|bz|bzh|ca|cab|cafe|cal|camera|camp|cancerresearch|canon|capetown|capital|car|caravan|cards|care|career|careers|cars|cartier|casa|cash|casino|cat|catering|cba|cbn|cc|cd|ceb|center|ceo|cern|cf|cfa|cfd|cg|ch|chanel|channel|chat|cheap|chloe|christmas|chrome|church|ci|cipriani|cisco|citic|city|cityeats|ck|cl|claims|cleaning|click|clinic|clothing|cloud|club|clubmed|cm|cn|co|coach|codes|coffee|college|cologne|com|commbank|community|company|computer|condos|construction|consulting|contractors|cooking|cool|coop|corsica|country|coupons|courses|cr|credit|creditcard|creditunion|cricket|crown|crs|cruises|csc|cu|cuisinella|cv|cw|cx|cy|cymru|cyou|cz|dabur|dad|dance|date|dating|datsun|day|dclk|de|deals|degree|delivery|dell|delta|democrat|dental|dentist|desi|design|dev|diamonds|diet|digital|direct|directory|discount|dj|dk|dm|dnp|do|docs|dog|doha|domains|doosan|download|drive|durban|dvag|dz|earth|eat|ec|edu|education|ee|eg|email|emerck|energy|engineer|engineering|enterprises|epson|equipment|er|erni|es|esq|estate|et|eu|eurovision|eus|events|everbank|exchange|expert|exposed|express|fage|fail|faith|family|fan|fans|farm|fashion|feedback|ferrero|fi|film|final|finance|financial|firmdale|fish|fishing|fit|fitness|fj|fk|flights|florist|flowers|flsmidth|fly|fm|fo|foo|football|forex|forsale|forum|foundation|fr|frl|frogans|fund|furniture|futbol|fyi|ga|gal|gallery|game|garden|gb|gbiz|gd|gdn|ge|gea|gent|genting|gf|gg|ggee|gh|gi|gift|gifts|gives|giving|gl|glass|gle|global|globo|gm|gmail|gmo|gmx|gn|gold|goldpoint|golf|goo|goog|google|gop|gov|gp|gq|gr|graphics|gratis|green|gripe|group|gs|gt|gu|gucci|guge|guide|guitars|guru|gw|gy|hamburg|hangout|haus|healthcare|help|here|hermes|hiphop|hitachi|hiv|hk|hm|hn|hockey|holdings|holiday|homedepot|homes|honda|horse|host|hosting|hoteles|hotmail|house|how|hr|hsbc|ht|hu|hyundai|ibm|icbc|ice|icu|id|ie|ifm|iinet|il|im|immo|immobilien|in|industries|infiniti|info|ing|ink|institute|insure|int|international|investments|io|ipiranga|iq|ir|irish|is|ist|istanbul|it|itau|iwc|jaguar|java|jcb|je|jetzt|jewelry|jlc|jll|jm|jo|jobs|joburg|jp|jprs|juegos|kaufen|kddi|ke|kg|kh|ki|kia|kim|kinder|kitchen|kiwi|km|kn|koeln|komatsu|kp|kr|krd|kred|kw|ky|kyoto|kz|la|lacaixa|lancaster|land|landrover|lasalle|lat|latrobe|law|lawyer|lb|lc|lds|lease|leclerc|legal|lexus|lgbt|li|liaison|lidl|life|lifestyle|lighting|limited|limo|linde|link|live|lixil|lk|loan|loans|lol|london|lotte|lotto|love|lr|ls|lt|ltd|ltda|lu|lupin|luxe|luxury|lv|ly|ma|madrid|maif|maison|man|management|mango|market|marketing|markets|marriott|mba|mc|md|me|media|meet|melbourne|meme|memorial|men|menu|meo|mg|mh|miami|microsoft|mil|mini|mk|ml|mm|mma|mn|mo|mobi|moda|moe|moi|mom|monash|money|montblanc|mormon|mortgage|moscow|motorcycles|mov|movie|movistar|mp|mq|mr|ms|mt|mtn|mtpc|mtr|mu|museum|mutuelle|mv|mw|mx|my|mz|na|nadex|nagoya|name|navy|nc|ne|nec|net|netbank|network|neustar|new|news|nexus|nf|ng|ngo|nhk|ni|nico|ninja|nissan|nl|no|nokia|np|nr|nra|nrw|ntt|nu|nyc|nz|obi|office|okinawa|om|omega|one|ong|onl|online|ooo|oracle|orange|org|organic|osaka|otsuka|ovh|pa|page|panerai|paris|partners|parts|party|pe|pet|pf|pg|ph|pharmacy|philips|photo|photography|photos|physio|piaget|pics|pictet|pictures|ping|pink|pizza|pk|pl|place|play|playstation|plumbing|plus|pm|pn|pohl|poker|porn|post|pr|praxi|press|pro|prod|productions|prof|properties|property|protection|ps|pt|pub|pw|py|qa|qpon|quebec|racing|re|realtor|realty|recipes|red|redstone|rehab|reise|reisen|reit|ren|rent|rentals|repair|report|republican|rest|restaurant|review|reviews|rich|ricoh|rio|rip|ro|rocher|rocks|rodeo|rs|rsvp|ru|ruhr|run|rw|rwe|ryukyu|sa|saarland|sakura|sale|samsung|sandvik|sandvikcoromant|sanofi|sap|sapo|sarl|saxo|sb|sbs|sc|sca|scb|schmidt|scholarships|school|schule|schwarz|science|scor|scot|sd|se|seat|security|seek|sener|services|seven|sew|sex|sexy|sg|sh|shiksha|shoes|show|shriram|si|singles|site|sj|sk|ski|sky|skype|sl|sm|sn|sncf|so|soccer|social|software|sohu|solar|solutions|sony|soy|space|spiegel|spreadbetting|sr|srl|st|stada|starhub|statoil|stc|stcgroup|stockholm|studio|study|style|su|sucks|supplies|supply|support|surf|surgery|suzuki|sv|swatch|swiss|sx|sy|sydney|systems|sz|taipei|tatamotors|tatar|tattoo|tax|taxi|tc|td|team|tech|technology|tel|telefonica|temasek|tennis|tf|tg|th|thd|theater|theatre|tickets|tienda|tips|tires|tirol|tj|tk|tl|tm|tn|to|today|tokyo|tools|top|toray|toshiba|tours|town|toyota|toys|tr|trade|trading|training|travel|trust|tt|tui|tv|tw|tz|ua|ubs|ug|uk|university|uno|uol|us|uy|uz|va|vacations|vana|vc|ve|vegas|ventures|versicherung|vet|vg|vi|viajes|video|villas|vin|virgin|vision|vista|vistaprint|viva|vlaanderen|vn|vodka|vote|voting|voto|voyage|vu|wales|walter|wang|watch|webcam|website|wed|wedding|weir|wf|whoswho|wien|wiki|williamhill|win|windows|wine|wme|work|works|world|ws|wtc|wtf|xbox|xerox|xin|xn--11b4c3d|xn--1qqw23a|xn--30rr7y|xn--3bst00m|xn--3ds443g|xn--3e0b707e|xn--3pxu8k|xn--42c2d9a|xn--45brj9c|xn--45q11c|xn--4gbrim|xn--55qw42g|xn--55qx5d|xn--6frz82g|xn--6qq986b3xl|xn--80adxhks|xn--80ao21a|xn--80asehdb|xn--80aswg|xn--90a3ac|xn--90ais|xn--9dbq2a|xn--9et52u|xn--b4w605ferd|xn--c1avg|xn--c2br7g|xn--cg4bki|xn--clchc0ea0b2g2a9gcd|xn--czr694b|xn--czrs0t|xn--czru2d|xn--d1acj3b|xn--d1alf|xn--efvy88h|xn--estv75g|xn--fhbei|xn--fiq228c5hs|xn--fiq64b|xn--fiqs8s|xn--fiqz9s|xn--fjq720a|xn--flw351e|xn--fpcrj9c3d|xn--fzc2c9e2c|xn--gecrj9c|xn--h2brj9c|xn--hxt814e|xn--i1b6b1a6a2e|xn--imr513n|xn--io0a7i|xn--j1aef|xn--j1amh|xn--j6w193g|xn--kcrx77d1x4a|xn--kprw13d|xn--kpry57d|xn--kput3i|xn--l1acc|xn--lgbbat1ad8j|xn--mgb9awbf|xn--mgba3a3ejt|xn--mgba3a4f16a|xn--mgbaam7a8h|xn--mgbab2bd|xn--mgbayh7gpa|xn--mgbbh1a71e|xn--mgbc0a9azcg|xn--mgberp4a5d4ar|xn--mgbpl2fh|xn--mgbtx2b|xn--mgbx4cd0ab|xn--mk1bu44c|xn--mxtq1m|xn--ngbc5azd|xn--node|xn--nqv7f|xn--nqv7fs00ema|xn--nyqy26a|xn--o3cw4h|xn--ogbpf8fl|xn--p1acf|xn--p1ai|xn--pgbs0dh|xn--pssy2u|xn--q9jyb4c|xn--qcka1pmc|xn--qxam|xn--rhqv96g|xn--s9brj9c|xn--ses554g|xn--t60b56a|xn--tckwe|xn--unup4y|xn--vermgensberater-ctb|xn--vermgensberatung-pwb|xn--vhquv|xn--vuq861b|xn--wgbh1c|xn--wgbl6a|xn--xhq521b|xn--xkc2al3hye2a|xn--xkc2dl3a5ee0h|xn--y9a3aq|xn--yfro4i67o|xn--ygbi2ammx|xn--zfr164b|xperia|xxx|xyz|yachts|yamaxun|yandex|ye|yodobashi|yoga|yokohama|youtube|yt|za|zara|zip|zm|zone|zuerich|zw)|([0-9])(\/\S+)?)/;

  var a = url.test($("#url-bar").val());



  $("webview.active").on("did-start-loading", function () {
    NProgress.start();
  });

  $("webview.active").on("did-finish-load", function () {
    NProgress.done();

    var url = $(this).attr("src");

    $("#-url-bar-mask").html(url.replace(/(https:\/\/)/g, "<span style='color: green;'>$&</span>")).show();

    if ($(".tab.active .tab-title").html() === "") {
      $(".tab.active .tab-title").html("&nbsp;");
    }



    var ssl = url.split("/")[2] + ":443";

    openssl.exec("s_client", {
      showcerts: true, connect: ssl
    }, function (err, results) {
      console.log(
        // results.toString().match(/subject=\/(.*)/)[1].match(/CN=(.*)/)[1] // Subject Common Name
        // results.toString().match(/subject=\/(.*)/)[1].match(/O=(.*)\//)[1] // Subject Organization Name

        // results.toString().match(/issuer=\/(.*)/)[1].match(/CN=(.*)/)[1] // Issuer Common Name
        // results.toString().match(/issuer=\/(.*)/)[1].match(/O=(.*)\//)[1] // Issuer Organization Name
      );
    });



    /*
    var
      ID = $(this).attr("id").replace(/tab/g, ""),
      url = $(this).attr("src"),

      rl = readline.createInterface({
        input: fs.createReadStream("" + ID + ".txt")
      }),

      current = "",
      prev = ""
    ;



    fs.appendFile("" + ID + ".txt", url + "\n", function (err) {
      if (err) {
        throw err;
      }
    });

    rl.on("line", function (line) {
      prev = current;
      current = line;
    });

    rl.on("close", function () {
      console.log(
        "Prev line: ", prev +
        "\nLast line: ", current
      );
    });
    */
  });



  // check to see if input is a URL
  var encodeURL = encodeURI($("#url-bar").val());

  // Figure out if we need to prepend "http://" to URLs
  function decipher() {

    if (encodeURL.match(/(^http:\/\/)|(^https:\/\/)/) !== null) {

      console.log("This URL already contains 'http://'");

      $("webview.active").attr("src", encodeURL);
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

      $("webview.active").attr("src", "http://" + encodeURL);
      $("button.active").attr("data-page", "http://" + encodeURL);

    }

  }

  decipher();



  // var currentTitle = $("webview.active").contents().find("title").html(); // get current webview title

  // $("button.active .tab-title").html(currentTitle);
  // $("button.active .tab-favicon").attr("src", getFavicon);

  if (encodeURL.match(/(^https:\/\/)/) !== null) {
    $("button.active").addClass("secure-site");
  }

  if (url.test($("#url-bar").val()) === true) {

    console.log(a); // should be true, go to actual site

  } else {

    if (encodeURL.match(/(^aries:\/\/about)/) !== null) {

      _pageAbout();

    } else if (encodeURL.match(/(^aries:\/\/credits)/) !== null) {

      _pageCredits();

    } else if (encodeURL.match(/(^about:blank)/) !== null) {

      $("webview.active").attr("src", "pages/start.html");

    } else {

      console.log(a); // should be false, search DDG
      _searchDDG();

    }

  }

}