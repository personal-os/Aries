/* jshint undef: true, unused: true */
/* global require, document, window */



var ipc = require("ipc");



document.addEventListener("mouseover", function (e) {
  var hoveredElement = e.target;

  if (hoveredElement.tagName !== "A") {
    return;
  }

  ipc.sendToHost("mouseover-href", hoveredElement.href);
});



document.addEventListener("click", function (e) {
  var clickedElement = e.target;

  if (clickedElement.getAttribute("target") === "_blank") {
    // console.log("New tab from _blank");
    ipc.sendToHost("clicked-href", clickedElement.href);
  }
});



/*
document.addEventListener("load", function () {
  var headContent = document.getElementsByTagName("head")[0].innerHTML;

  headContent.prepend(
    // "<meta http-equiv=\"Content-Security-Policy\" content=\"default-src *; script-src 'self'; style-src 'self' 'unsafe-inline';\">"
    "<meta http-equiv=\"Content-Security-Policy\" content=\"script-src 'self' 'unsafe-inline';\">"
  );
});
*/



document.addEventListener("DOMContentLoaded", function () {
  var data = {
    "title": document.title,
    "url": window.location.href,
    // need to make my own version, can't rely on Google forever
    // maybe have this URL fetcher hosted on hikar.io?
    "favicon": "https://www.google.com/s2/favicons?domain=" + window.location.href
    // "headContent": document.getElementsByTagName("head")[0].innerHTML
  };



  // var m = document.createElement("meta");
  // document.querySelector('link[rel="prev"]').href;
  // m.httpEquiv = "content-security-policy";
  // m.content = "default-src *; script-src 'self'; style-src 'self' 'unsafe-inline'";
  // m.content = "script-src 'self' 'unsafe-inline' *.google.com platform.twitter.com https://facebook.com *.facebook.net *.skimresources.com *.ytimg.com;";



  ipc.sendToHost("window-data", data);
});