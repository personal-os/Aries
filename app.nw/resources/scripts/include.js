// include.js
// @IdeasNeverCease
// ========================================================
// ScriptInclude
// Evan Hahn (https://github.com/EvanHahn/ScriptInclude)
// Unlicensed

include=function(){function e(){var e=this.readyState;(!e||/ded|te/.test(e))&&(n--,!n&&d&&r())}var a=arguments,t=document,n=a.length,r=a[n-1],d=r.call;d&&n--;for(var c,o=0;n>o;o++)c=t.createElement("script"),c.src=arguments[o],c.async=!0,c.onload=c.onerror=c.onreadystatechange=e,(t.head||t.getElementsByTagName("head")[0]).appendChild(c)};