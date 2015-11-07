/**
 * (c) Michael Zelensky 2015
 *
 * DESCRIPTION
 *
 * Ctrl, Shift, Alt, Cmd buttons detector for Mac
 * to support corresponding event.ctrlKey, event.shiftKey, event.altKey which do not work on Mac
 *
 * LICENSE
 *
 * Distributed under MIT License
 * You can use this code in your project without limitation, no matter if it is commercial or not,
 * with all copyright marks intact
 *
 * USAGE
 *
 * Just include this code into your JS or HTML and then check if key is pressed in your code, e.g.:
 *
 * window.onclick = function (event) {
 *     if (event.ctrlKey || macKeys.ctrlKey) {
 *         //do something
 *     }
 * }
 *
 */

!function(){var e,r,a,o,i,s;r=navigator.platform.toUpperCase().indexOf("MAC")>=0,window.macKeys={cmdKey:!1,ctrlKey:!1,shiftKey:!1,altKey:!1},r&&(e=function(){var e,r=navigator.userAgent,a=r.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[];return/trident/i.test(a[1])?(e=/\brv[ :]+(\d+)/g.exec(r)||[],{browser:"IE",version:e[1]||""}):"Chrome"===a[1]&&(e=r.match(/\b(OPR|Edge)\/(\d+)/),null!=e)?{browser:e.slice(1)[0].replace("OPR","Opera"),version:e.slice(1)[1]}:(a=a[2]?[a[1],a[2]]:[navigator.appName,navigator.appVersion,"-?"],null!=(e=r.match(/version\/(\d+)/i))&&a.splice(1,1,e[1]),{browser:a[0],version:a[1]})}(),a="Chrome"===e.browser||"Safari"===e.browser,o="Firefox"===e.browser,i="Opera"===e.browser,window.onkeydown=function(e){s=e.keyCode,(a||i)&&(91===s||93===s)||o&&224===s?macKeys.cmdKey=!0:16===s?macKeys.shiftKey=!0:17===s?macKeys.ctrlKey=!0:18===s&&(macKeys.altKey=!0)},window.onkeyup=function(e){s=e.keyCode,(a||i)&&(91===s||93===s)||o&&224===s?macKeys.cmdKey=!1:16===s?macKeys.shiftKey=!1:17===s?macKeys.ctrlKey=!1:18===s&&(macKeys.altKey=!1)})}();