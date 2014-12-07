$(function () {

	_requireInit = "";
	_requireInit += "<script>";
	_requireInit += 'var requirejs,require,define; (function(ca){function G(b){return"[object Function]"===M.call(b)}function H(b){return"[object Array]"===M.call(b)}function v(b,c){if(b){var d;for(d=0;d<b.length&&(!b[d]||!c(b[d],d,b));d+=1);}}function U(b,c){if(b){var d;for(d=b.length-1;-1<d&&(!b[d]||!c(b[d],d,b));d-=1);}}function s(b,c){return ga.call(b,c)}function j(b,c){return s(b,c)&&b[c]}function B(b,c){for(var d in b)if(s(b,d)&&c(b[d],d))break}function V(b,c,d,g){c&&B(c,function(c,h){if(d||!s(b,h))g&&"object"===typeof c&&c&&!H(c)&&!G(c)&&!(c instanceof RegExp)?(b[h]||(b[h]={}),V(b[h],c,d,g)):b[h]=c});return b}function t(b,c){return function(){return c.apply(b,arguments)}}function da(b){throw b;}function ea(b){if(!b)return b;var c=ca;v(b.split("."),function(b){c=c[b]});return c}function C(b,c,d,g){c=Error(c+"\nhttp://requirejs.org/docs/errors.html#"+b);c.requireType=b;c.requireModules=g;d&&(c.originalError=d);return c}function ha(b){function c(a,e,b){var f,n,c,d,g,h,i,I=e&&e.split("/");n=I;var m=l.map,k=m&&m["*"];if(a&&"."===a.charAt(0))if(e){n= I.slice(0,I.length-1);a=a.split("/");e=a.length-1;l.nodeIdCompat&&R.test(a[e])&&(a[e]=a[e].replace(R,""));n=a=n.concat(a);d=n.length;for(e=0;e<d;e++)if(c=n[e],"."===c)n.splice(e,1),e-=1;else if(".."===c)if(1===e&&(".."===n[2]||".."===n[0]))break;else 0<e&&(n.splice(e-1,2),e-=2);a=a.join("/")}else 0===a.indexOf("./")&&(a=a.substring(2));if(b&&m&&(I||k)){n=a.split("/");e=n.length;a:for(;0<e;e-=1){d=n.slice(0,e).join("/");if(I)for(c=I.length;0<c;c-=1)if(b=j(m,I.slice(0,c).join("/")))if(b=j(b,d)){f=b; g=e;break a}!h&&(k&&j(k,d))&&(h=j(k,d),i=e)}!f&&h&&(f=h,g=i);f&&(n.splice(0,g,f),a=n.join("/"))}return(f=j(l.pkgs,a))?f:a}function d(a){z&&v(document.getElementsByTagName("script"),function(e){if(e.getAttribute("data-requiremodule")===a&&e.getAttribute("data-requirecontext")===i.contextName)return e.parentNode.removeChild(e),!0})}function g(a){var e=j(l.paths,a);if(e&&H(e)&&1<e.length)return e.shift(),i.require.undef(a),i.require([a]),!0}function u(a){var e,b=a?a.indexOf("!"):-1;-1<b&&(e=a.substring(0, b),a=a.substring(b+1,a.length));return[e,a]}function m(a,e,b,f){var n,d,g=null,h=e?e.name:null,l=a,m=!0,k="";a||(m=!1,a="_@r"+(M+=1));a=u(a);g=a[0];a=a[1];g&&(g=c(g,h,f),d=j(p,g));a&&(g?k=d&&d.normalize?d.normalize(a,function(a){return c(a,h,f)}):c(a,h,f):(k=c(a,h,f),a=u(k),g=a[0],k=a[1],b=!0,n=i.nameToUrl(k)));b=g&&!d&&!b?"_unnormalized"+(Q+=1):"";return{prefix:g,name:k,parentMap:e,unnormalized:!!b,url:n,originalName:l,isDefine:m,id:(g?g+"!"+k:k)+b}}function q(a){var e=a.id,b=j(k,e);b||(b=k[e]=new i.Module(a)); return b}function r(a,e,b){var f=a.id,n=j(k,f);if(s(p,f)&&(!n||n.defineEmitComplete))"defined"===e&&b(p[f]);else if(n=q(a),n.error&&"error"===e)b(n.error);else n.on(e,b)}function w(a,e){var b=a.requireModules,f=!1;if(e)e(a);else if(v(b,function(e){if(e=j(k,e))e.error=a,e.events.error&&(f=!0,e.emit("error",a))}),!f)h.onError(a)}function x(){S.length&&(ia.apply(A,[A.length,0].concat(S)),S=[])}function y(a){delete k[a];delete W[a]}function F(a,e,b){var f=a.map.id;a.error?a.emit("error",a.error):(e[f]= !0,v(a.depMaps,function(f,c){var d=f.id,g=j(k,d);g&&(!a.depMatched[c]&&!b[d])&&(j(e,d)?(a.defineDep(c,p[d]),a.check()):F(g,e,b))}),b[f]=!0)}function D(){var a,e,b=(a=1E3*l.waitSeconds)&&i.startTime+a<(new Date).getTime(),f=[],c=[],h=!1,k=!0;if(!X){X=!0;B(W,function(a){var i=a.map,m=i.id;if(a.enabled&&(i.isDefine||c.push(a),!a.error))if(!a.inited&&b)g(m)?h=e=!0:(f.push(m),d(m));else if(!a.inited&&(a.fetched&&i.isDefine)&&(h=!0,!i.prefix))return k=!1});if(b&&f.length)return a=C("timeout","Load timeout for modules: "+ f,null,f),a.contextName=i.contextName,w(a);k&&v(c,function(a){F(a,{},{})});if((!b||e)&&h)if((z||fa)&&!Y)Y=setTimeout(function(){Y=0;D()},50);X=!1}}function E(a){s(p,a[0])||q(m(a[0],null,!0)).init(a[1],a[2])}function K(a){var a=a.currentTarget||a.srcElement,e=i.onScriptLoad;a.detachEvent&&!Z?a.detachEvent("onreadystatechange",e):a.removeEventListener("load",e,!1);e=i.onScriptError;(!a.detachEvent||Z)&&a.removeEventListener("error",e,!1);return{node:a,id:a&&a.getAttribute("data-requiremodule")}}function L(){var a; for(x();A.length;){a=A.shift();if(null===a[0])return w(C("mismatch","Mismatched anonymous define() module: "+a[a.length-1]));E(a)}}var X,$,i,N,Y,l={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},k={},W={},aa={},A=[],p={},T={},ba={},M=1,Q=1;N={require:function(a){return a.require?a.require:a.require=i.makeRequire(a.map)},exports:function(a){a.usingExports=!0;if(a.map.isDefine)return a.exports?p[a.map.id]=a.exports:a.exports=p[a.map.id]={}},module:function(a){return a.module? a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){return j(l.config,a.map.id)||{}},exports:a.exports||(a.exports={})}}};$=function(a){this.events=j(aa,a.id)||{};this.map=a;this.shim=j(l.shim,a.id);this.depExports=[];this.depMaps=[];this.depMatched=[];this.pluginMaps={};this.depCount=0};$.prototype={init:function(a,e,b,f){f=f||{};if(!this.inited){this.factory=e;if(b)this.on("error",b);else this.events.error&&(b=t(this,function(a){this.emit("error",a)}));this.depMaps=a&&a.slice(0);this.errback=b;this.inited=!0;this.ignore=f.ignore;f.enabled||this.enabled?this.enable():this.check()}},defineDep:function(a,e){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=e)},fetch:function(){if(!this.fetched){this.fetched=!0;i.startTime=(new Date).getTime();var a=this.map;if(this.shim)i.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],t(this,function(){return a.prefix?this.callPlugin():this.load()}));else return a.prefix?this.callPlugin():this.load()}},load:function(){var a=this.map.url;T[a]||(T[a]=!0,i.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,e,b=this.map.id;e=this.depExports;var f=this.exports,c=this.factory;if(this.inited)if(this.error)this.emit("error",this.error);else{if(!this.defining){this.defining=!0;if(1>this.depCount&&!this.defined){if(G(c)){if(this.events.error&&this.map.isDefine||h.onError!==da)try{f=i.execCb(b,c,e,f)}catch(d){a=d}else f=i.execCb(b,c,e,f);this.map.isDefine&&void 0===f&&((e=this.module)?f=e.exports:this.usingExports&&(f=this.exports));if(a)return a.requireMap=this.map,a.requireModules=this.map.isDefine?[this.map.id]:null,a.requireType=this.map.isDefine?"define":"require",w(this.error=a)}else f=c;this.exports=f;if(this.map.isDefine&&!this.ignore&&(p[b]=f,h.onResourceLoad))h.onResourceLoad(i,this.map,this.depMaps);y(b);this.defined=!0}this.defining=!1;this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var a=this.map,b=a.id,d=m(a.prefix);this.depMaps.push(d);r(d,"defined",t(this,function(f){var d,g;g=j(ba,this.map.id);var J=this.map.name,u=this.map.parentMap?this.map.parentMap.name:null,p=i.makeRequire(a.parentMap,{enableBuildCallback:!0});if(this.map.unnormalized){if(f.normalize&&(J=f.normalize(J,function(a){return c(a,u,!0)})||""),f=m(a.prefix+"!"+J,this.map.parentMap),r(f,"defined",t(this,function(a){this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),g=j(k,f.id)){this.depMaps.push(f); if(this.events.error)g.on("error",t(this,function(a){this.emit("error",a)}));g.enable()}}else g?(this.map.url=i.nameToUrl(g),this.load()):(d=t(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),d.error=t(this,function(a){this.inited=!0;this.error=a;a.requireModules=[b];B(k,function(a){0===a.map.id.indexOf(b+"_unnormalized")&&y(a.map.id)});w(a)}),d.fromText=t(this,function(f,c){var g=a.name,J=m(g),k=O;c&&(f=c);k&&(O=!1);q(J);s(l.config,b)&&(l.config[g]=l.config[b]);try{h.exec(f)}catch(j){return w(C("fromtexteval", "fromText eval for "+b+" failed: "+j,j,[b]))}k&&(O=!0);this.depMaps.push(J);i.completeLoad(g);p([g],d)}),f.load(a.name,p,d,l))}));i.enable(d,this);this.pluginMaps[d.id]=d},enable:function(){W[this.map.id]=this;this.enabling=this.enabled=!0;v(this.depMaps,t(this,function(a,b){var c,f;if("string"===typeof a){a=m(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap);this.depMaps[b]=a;if(c=j(N,a.id)){this.depExports[b]=c(this);return}this.depCount+=1;r(a,"defined",t(this,function(a){this.defineDep(b,a);this.check()}));this.errback&&r(a,"error",t(this,this.errback))}c=a.id;f=k[c];!s(N,c)&&(f&&!f.enabled)&&i.enable(a,this)}));B(this.pluginMaps,t(this,function(a){var b=j(k,a.id);b&&!b.enabled&&i.enable(a,this)}));this.enabling=!1;this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=[]);c.push(b)},emit:function(a,b){v(this.events[a],function(a){a(b)});"error"===a&&delete this.events[a]}};i={config:l,contextName:b,registry:k,defined:p,urlFetched:T,defQueue:A,Module:$,makeModuleMap:m,nextTick:h.nextTick,onError:w,configure:function(a){a.baseUrl&&"/"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+="/");var b=l.shim,c={paths:!0,bundles:!0,config:!0,map:!0};B(a,function(a,b){c[b]?(l[b]||(l[b]={}),V(l[b],a,!0,!0)):l[b]=a});a.bundles&&B(a.bundles,function(a,b){v(a,function(a){a!==b&&(ba[a]=b)})});a.shim&&(B(a.shim,function(a,c){H(a)&&(a={deps:a});if((a.exports||a.init)&&!a.exportsFn)a.exportsFn=i.makeShimExports(a);b[c]=a}),l.shim=b);a.packages&&v(a.packages,function(a){var b,a="string"===typeof a?{name:a}:a;b=a.name;a.location&&(l.paths[b]=a.location);l.pkgs[b]=a.name+"/"+(a.main||"main").replace(ja,"").replace(R,"")});B(k,function(a,b){!a.inited&&!a.map.unnormalized&&(a.map=m(b))});if(a.deps||a.callback)i.require(a.deps||[],a.callback)},makeShimExports:function(a){return function(){var b;a.init&&(b=a.init.apply(ca,arguments));return b||a.exports&&ea(a.exports)}},makeRequire:function(a,e){function g(f,c,d){var j,l;e.enableBuildCallback&&(c&&G(c))&&(c.__requireJsBuild=!0);if("string"===typeof f){if(G(c))return w(C("requireargs","Invalid require call"),d);if(a&&s(N,f))return N[f](k[a.id]);if(h.get)return h.get(i,f,a,g);j=m(f,a,!1,!0);j=j.id;return!s(p,j)?w(C("notloaded",+j+ +b+(a?"":". Use require([])"))):p[j]}L();i.nextTick(function(){L();l=q(m(null,a));l.skipMap=e.skipMap;l.init(f,c,d,{enabled:!0});D()});return g}e=e||{};V(g,{isBrowser:z,toUrl:function(b){var e,d=b.lastIndexOf("."),g=b.split("/")[0];if(-1!==d&&(!("."===g||".."===g)||1<d))e=b.substring(d,b.length),b=b.substring(0,d);return i.nameToUrl(c(b,a&&a.id,!0),e,!0)},defined:function(b){return s(p,m(b,a,!1,!0).id)},specified:function(b){b=m(b,a,!1,!0).id;return s(p,b)||s(k,b)}});a||(g.undef=function(b){x();var c=m(b,a,!0),e=j(k,b);d(b);delete p[b];delete T[c.url];delete aa[b];U(A,function(a,c){a[0]===b&&A.splice(c,1)});e&&(e.events.defined&&(aa[b]=e.events),y(b))});return g},enable:function(a){j(k,a.id)&&q(a).enable()},completeLoad:function(a){var b,c,f=j(l.shim,a)||{},d=f.exports;for(x();A.length;){c=A.shift();if(null===c[0]){c[0]=a;if(b)break;b=!0}else c[0]===a&&(b=!0);E(c)}c=j(k,a);if(!b&&!s(p,a)&&c&&!c.inited){if(l.enforceDefine&&(!d||!ea(d)))return g(a)?void 0:w(C("nodefine","No define call for "+a,null,[a]));E([a,f.deps||[],f.exportsFn])}D()},nameToUrl:function(a,b,c){var f,d,g;(f=j(l.pkgs,a))&&(a=f);if(f=j(ba,a))return i.nameToUrl(f,b,c);if(h.jsExtRegExp.test(a))f=a+(b||"");else{f=l.paths;a=a.split("/");for(d=a.length;0<d;d-=1)if(g=a.slice(0,d).join("/"),g=j(f,g)){H(g)&&(g=g[0]);a.splice(0,d,g);break}f=a.join("/");f+=b||(/^data\:|\?/.test(f)||c?"":".js");f=("/"===f.charAt(0)||f.match(/^[\w\+\.\-]+:/)?"":l.baseUrl)+f}return l.urlArgs?f+((-1===f.indexOf("?")?"?":"&")+l.urlArgs):f},load:function(a,b){h.load(i,a,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if("load"===a.type||ka.test((a.currentTarget||a.srcElement).readyState))P=null,a=K(a),i.completeLoad(a.id)},onScriptError:function(a){var b=K(a);if(!g(b.id))return w(C("scripterror","Script error for: "+b.id,a,[b.id]))}};i.require=i.makeRequire();return i}var h,x,y,D,K,E,P,L,q,Q,la=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,ma=/[^.]\s*require\s*\(\s*["=]([^"\s]+)["]\s*\)/g,R=/\.js$/,ja=/^\.\//;x=Object.prototype;var M=x.toString,ga=x.hasOwnProperty,ia=Array.prototype.splice,z=!!("undefined"!==typeof window&&"undefined"!==typeof navigator&&window.document),fa=!z&&"undefined"!==typeof importScripts,ka=z&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/, Z="undefined"!==typeof opera&&"[object Opera]"===opera.toString(),F={},r={},S=[],O=!1;if("undefined"===typeof define){if("undefined"!==typeof requirejs){if(G(requirejs))return;r=requirejs;requirejs=void 0}"undefined"!==typeof require&&!G(require)&&(r=require,require=void 0);h=requirejs=function(b,c,d,g){var u,m="_";!H(b)&&"string"!==typeof b&&(u=b,H(c)?(b=c,c=d,d=g):b=[]);u&&u.context&&(m=u.context);(g=j(F,m))||(g=F[m]=h.s.newContext(m));u&&g.configure(u);return g.require(b,c,d)};h.config=function(b){return h(b)};h.nextTick="undefined"!==typeof setTimeout?function(b){setTimeout(b,4)}:function(b){b()};require||(require=h);h.version="2.1.11";h.jsExtRegExp=/^\/|:|\?|\.js$/;h.isBrowser=z;x=h.s={contexts:F,newContext:ha};h({});v(["toUrl","undef","defined","specified"],function(b){h[b]=function(){var c=F._;return c.require[b].apply(c,arguments)}});if(z&&(y=x.head=document.getElementsByTagName("head")[0],D=document.getElementsByTagName("base")[0]))y=x.head=D.parentNode;h.onError=da;h.createNode=function(b){var c=b.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");c.type=b.scriptType||"text/javascript";c.charset="utf-8";c.async=!0;return c};h.load=function(b,c,d){var g=b&&b.config||{};if(z)return g=h.createNode(g,c,d),g.setAttribute("data-requirecontext",b.contextName),g.setAttribute("data-requiremodule",c),g.attachEvent&&!(g.attachEvent.toString&&0>g.attachEvent.toString().indexOf("[native code"))&&!Z?(O=!0,g.attachEvent("onreadystatechange",b.onScriptLoad)):(g.addEventListener("load",b.onScriptLoad,!1),g.addEventListener("error",b.onScriptError,!1)),g.src=d,L=g,D?y.insertBefore(g,D):y.appendChild(g),L=null,g;if(fa)try{importScripts(d),b.completeLoad(c)}catch(j){b.onError(C("importscripts","importScripts failed for "+c+" at "+d,j,[c]))}};z&&!r.skipDataMain&&U(document.getElementsByTagName("script"),function(b){y||(y=b.parentNode);if(K=b.getAttribute("data-main"))return q=K,r.baseUrl||(E=q.split("/"),q=E.pop(),Q=E.length?E.join("/")+"/":"./",r.baseUrl=Q),q=q.replace(R,""),h.jsExtRegExp.test(q)&&(q=K),r.deps=r.deps?r.deps.concat(q):[q],!0});define=function(b,c,d){var g,h;"string"!==typeof b&&(d=c,c=b,b=null);H(c)||(d=c,c=null);!c&&G(d)&&(c=[],d.length&&(d.toString().replace(la,"").replace(ma,function(b,d){c.push(d)}),c=(1===d.length?["require"]:["require","exports","module"]).concat(c)));if(O){if(!(g=L))P&&"interactive"===P.readyState||U(document.getElementsByTagName("script"),function(b){if("interactive"===b.readyState)return P=b}),g=P;g&&(b||(b=g.getAttribute("data-requiremodule")),h=F[g.getAttribute("data-requirecontext")])}(h?h.defQueue:S).push([b,c,d])};define.amd={jQuery:!0};h.exec=function(b){return eval(b)};h(r)}})(this);';
	_requireInit += "</script>";

	_stylesInit = "";
	_stylesInit += "<style>";

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
			_stylesInit += "font-size: 12px; ";
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
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";

	_stylesInit += "</style>";

	_scriptInit = "";
	_scriptInit += "<script>";
		_scriptInit += '(function(e,t){if(typeof define==="function"&&define.amd){define(t)}else if(typeof exports==='object'){module.exports=t()}else{e.NProgress=t()}})(this,function(){function n(e,t,n){if(e<t)return t;if(e>n)return n;return e}function r(e){return(-1+e)*100}function i(e,n,i){var s;if(t.positionUsing==='translate3d'){s={transform:'translate3d('+r(e)+'%,0,0)'}}else if(t.positionUsing==='translate'){s={transform:'translate('+r(e)+'%,0)'}}else{s={'margin-left':r(e)+"%"}}s.transition='all "+n+"ms "+i;return s}function u(e,t){var n=typeof e=='string'?e:l(e);return n.indexOf(" "+t+" ")>=0}function a(e,t){var n=l(e),r=n+t;if(u(n,t))return;e.className=r.substring(1)}function f(e,t){var n=l(e),r;if(!u(e,t))return;r=n.replace(" "+t+" "," ");e.className=r.substring(1,r.length-1)}function l(e){return(" "+(e.className||"")+" ").replace(/\s+/gi," ")}function c(e){e&&e.parentNode&&e.parentNode.removeChild(e)}var e={};e.version="0.1.6";var t=e.settings={minimum:.08,easing:'ease',positionUsing:"",speed:200,trickle:true,trickleRate:.02,trickleSpeed:800,showSpinner:true,barSelector:'[role='bar']',spinnerSelector:'[role='spinner']',parent:'#showcase__loader',template:'<div class='bar' role='bar'><div class='peg'></div></div><div class='spinner' role='spinner'><div class='spinner-icon'></div></div>'};e.configure=function(e){var n,r;for(n in e){r=e[n];if(r!==undefined&&e.hasOwnProperty(n))t[n]=r}return this};e.status=null;e.set=function(r){var u=e.isStarted();r=n(r,t.minimum,1);e.status=r===1?null:r;var a=e.render(!u),f=a.querySelector(t.barSelector),l=t.speed,c=t.easing;a.offsetWidth;s(function(n){if(t.positionUsing==="")t.positionUsing=e.getPositioningCSS();o(f,i(r,l,c));if(r===1){o(a,{transition:'none',opacity:1});a.offsetWidth;setTimeout(function(){o(a,{transition:'all '+l+'ms linear',opacity:0});setTimeout(function(){e.remove();n()},l)},l)}else{setTimeout(n,l)}});return this};e.isStarted=function(){return typeof e.status==='number'};e.start=function(){if(!e.status)e.set(0);var n=function(){setTimeout(function(){if(!e.status)return;e.trickle();n()},t.trickleSpeed)};if(t.trickle)n();return this};e.done=function(t){if(!t&&!e.status)return this;return e.inc(.3+.5*Math.random()).set(1)};e.inc=function(t){var r=e.status;if(!r){return e.start()}else{if(typeof t!=='number'){t=(1-r)*n(Math.random()*r,.1,.95)}r=n(r+t,0,.994);return e.set(r)}};e.trickle=function(){return e.inc(Math.random()*t.trickleRate)};(function(){var t=0,n=0;e.promise=function(r){if(!r||r.state()=='resolved'){return this}if(n==0){e.start()}t++;n++;r.always(function(){n--;if(n==0){t=0;e.done()}else{e.set((t-n)/t)}});return this}})();e.render=function(n){if(e.isRendered())return document.getElementById('nprogress');a(document.documentElement,'nprogress-busy');var i=document.createElement('div');i.id='nprogress';i.innerHTML=t.template;var s=i.querySelector(t.barSelector),u=n?"-100":r(e.status||0),f=document.querySelector(t.parent),l;o(s,{transition:'all 0 linear',transform:'translate3d('+u+'%,0,0)'});if(!t.showSpinner){l=i.querySelector(t.spinnerSelector);l&&c(l)}if(f!=document.body){a(f,'nprogress-custom-parent')}f.appendChild(i);return i};e.remove=function(){f(document.documentElement,'nprogress-busy');f(document.querySelector(t.parent),'nprogress-custom-parent');var e=document.getElementById('nprogress');e&&c(e)};e.isRendered=function(){return!!document.getElementById('nprogress')};e.getPositioningCSS=function(){var e=document.body.style;var t='WebkitTransform'in e?'Webkit':'MozTransform'in e?'Moz':'msTransform'in e?'ms':'OTransform'in e?'O':"";if(t+'Perspective'in e){return'translate3d'}else if(t+'Transform'in e){return'translate'}else{return'margin'}};var s=function(){function t(){var n=e.shift();if(n){n(t)}}var e=[];return function(n){e.push(n);if(e.length==1)t()}}();var o=function(){function n(e){return e.replace(/^-ms-/,'ms-').replace(/-([\da-z])/gi,function(e,t){return t.toUpperCase()})}function r(t){var n=document.body.style;if(t in n)return t;var r=e.length,i=t.charAt(0).toUpperCase()+t.slice(1),s;while(r--){s=e[r]+i;if(s in n)return s}return t}function i(e){e=n(e);return t[e]||(t[e]=r(e))}function s(e,t,n){t=i(t);e.style[t]=n}var e=['Webkit','O','Moz','ms'],t={};return function(e,t){var n=arguments,r,i;if(n.length==2){for(r in t){i=t[r];if(i!==undefined&&t.hasOwnProperty(r))s(e,r,i)}}else{s(e,n[1],n[2])}}}();return e})';
	_scriptInit += "</script>";

	_loaderInit = "";
	_loaderInit += "<div id='showcase__loader'></div>";

	_contextInit = "";

	_contextInit += "<ul id='aries-contextMenu__default'>";
		_contextInit += "<li id='acMd__back' class='aries-contextMenu__item'>Back</li>";
		_contextInit += "<li id='acMd__forward' class='aries-contextMenu__item'>Forward</li>";
		_contextInit += "<li id='acMd__reload' class='aries-contextMenu__item'>Reload</li>";
		_contextInit += "<li id='acMd__copy' class='aries-contextMenu__item'>Copy</li>";
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

});