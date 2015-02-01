/********************************************************************************************************************/

/*
///
$("#-aries-history-back").one("click", function() {

	$.each($("iframe.active"), function() {
		window.history.back();
		console.log("--- Went back");
	});

});

$("#-aries-history-forth").one("click", function() {

	$.each($("iframe.active"), function() {
		window.history.forward();
		console.log("--- Went forward");
	});

});
///
*/

/********************************************************************************************************************/

/*
// Live Reload
// https://github.com/rogerwang/node-webkit/wiki/Livereload-node-webkit-on-changes
var path = "./";
var fs = require("fs");

fs.watch(path, function() {
	if (location)
	location.reload();
});
*/

/********************************************************************************************************************/

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

/********************************************************************************************************************/

var historyManager = function () {

	// fs.writeFile("system/account/githubProfile.json", JSON.stringify(profile));
	/*
	var fs = require("fs");
	fs.writeFile("cache/session.json");
	*/

	/*
	function getHistory() {
		console.log(baseURL);
		console.log(currentTitle);
	}
	*/

	var tabID = $(".tab.active").attr("data-tab");
	var dataPage = $(".tab.active").attr("data-page");

	// get iframe ID
	var iframeID = $("iframe.active").attr("id");
	var iframeSrc = $("iframe.active").attr("src");

	// var obj = { "ID":[iframeID], "URL":[iframeSrc] }

	/*
	{
		"data": [
			{
				"DeviceName": "AND1",
				"IPAddress": "10.10.12.1221"
			},
			{
				"DeviceName": "AND2",
				"IPAddress": "10.10.12.1222"
			},
			{
				"DeviceName": "AND3",
				"IPAddress": "10.10.12.1223"
			}
		]
	}
	*/

	/*
	var historyDatabase = [
		// { "ID": iframeID, "URL": iframeSrc }
		{
			"data": [
				{
					// "iframe ID": iframeID,
					"iframe URL": iframeSrc
				}
			]
		}
	]
	*/

	var historyDatabase = { "iframe URL": iframeSrc };

	// console.log("Does this work? " + dataPage);
	// $('#chance').val($('#slider').val());

	var fs = require("fs");

	var os = require("os");
	// var jsonText = iframeSrc;
	var jsonText = ',"' + iframeSrc + '"\n';

	var dataArr = [];

	var data = JSON.stringify({
		"iframe ID": iframeID,
		"iframe URL": iframeSrc
	});

	// dataArr.push(data);

	// fs.appendFile("app.nw/cache/session.json", jsonText, function(err) {
	// \t \n
	// fs.appendFile("app.nw/cache/session.json", JSON.stringify(jsonText, null, "\n"), function(err) {

	// fs.writeFile('message.txt', 'Hello Node', function (err) {

	fs.appendFile("app.nw/cache/session.json", jsonText, function (err) {

		if (err) {
			console.log("Failed to write file: ", err);
		} else {
			console.log("File written.");
		}

	});

	// console.log("Huh");

};

/********************************************************************************************************************/

/*
console.log("Node version: " + process.version); // v.0.11.13-pre
console.log("OS type: " + os.type()); // Darwin
console.log("OS: " + os.platform()); // darwin
console.log("Arch: " + os.arch()); // x64
console.log("Release: " + os.release()); // 14.0.0
console.log("Hostname: " + os.hostname()); // HQ.home
console.log("Temp dir: " + os.tmpdir()); // /var/folders/3l/sfgsfdsfdfssdfsdf/T/
*/

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

// process.on("net::ERR_NAME_NOT_RESOLVED", function (error) { console.log("Aries Error: " + error); });