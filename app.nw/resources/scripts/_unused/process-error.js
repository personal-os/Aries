var process; // added this for JSHint

if (!process.mainModule.filename || process.mainModule.filename === "blank") {

	var root = "[path to Aries dev folder]";
	process.mainModule.filename = decodeURIComponent(window.location.pathname);

	if (window.location.href.indexOf("app://") === 0) {
		process.mainModule.filename = root + "/" + process.mainModule.filename;
	}

	process.mainModule.paths = global.require("module")._nodeModulePaths(process.cwd());
	process.mainModule.loaded = true;

}