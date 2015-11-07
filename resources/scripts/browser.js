/* jshint undef: true, unused: true */
/* global require, document, window */



var ipc = require("ipc");



document.addEventListener("mouseover", function (e) {
  var hoveredEl = e.target;

  if (hoveredEl.tagName !== "A") {
    return;
  }

  ipc.sendToHost("mouseover-href", hoveredEl.href);
});



document.addEventListener("DOMContentLoaded", function () {
  var data = {
    "title": document.title,
    "url": window.location.href,
    "favicon": "https://www.google.com/s2/favicons?domain=" + window.location.href
  };

  ipc.sendToHost("window-data", data);
});