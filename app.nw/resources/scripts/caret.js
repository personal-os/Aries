
	// Caret.js
	// @IdeasNeverCease
	// ========================================================

	/*
	function $(elid) {
		return document.getElementById(elid);
	}

	var caret;
	window.onload = init;

	function init() {

		caret = $("caret");
		caret.style.left = "0";

	}

	function nl2br(txt) {
		return txt.replace(/\n/g, "<br/>");
	}

	function writeit(from, e) {

		e = e || window.event;

		var w = $("writer");
		var tw = from.value;

		w.innerHTML = nl2br(tw);

	}

	function moveIt(count, e) {

		e = e || window.event;
		var keycode = e.keyCode || e.which;

		if(keycode == 37 && parseInt(caret.style.left) >= (0-((count-1)*10))) {
			caret.style.left = parseInt(caret.style.left) - 10 + "px";
		} else if(keycode == 39 && (parseInt(caret.style.left) + 10) <= 0) {
			caret.style.left = parseInt(caret.style.left) + 10 + "px";
		}

		if(e.ctrlKey && e.keyCode == 65) {
			$("writer").style.backgroundColor = "#99ccff";
		} else {
			$("writer").style.backgroundColor = "";
		}

	}
	*/

	/*
	var fake_area = document.getElementById("fake-bar").firstChild;
	var fake_caret = document.getElementById("caret");
	var real_area = document.getElementById("url-bar");

	$("#url-bar").on("input keydown keyup propertychange click", function () {

		// Fill the clone with textarea content from start to the position of the caret.
		// The replace /\n$/ is necessary to get position when cursor is at the beginning of empty new line.
		doStuff();

	});

	var timeout;

	function doStuff() {

		if(timeout) clearTimeout(timeout);

		timeout=setTimeout(function() {
			fake_area.innerHTML = real_area.value.substring(0, getCaretPosition(real_area)).replace(/\n$/, '\n\u0001');
			setCaretXY(fake_area, real_area, fake_caret, getPos("url-bar"));
		}, 10);

	}

	function getCaretPosition(el) {

		if (el.selectionStart) return el.selectionStart;

		else if (document.selection) {
			// el.focus();
			var r = document.selection.createRange();
			if (r == null) return 0;

			var re = el.createTextRange(), rc = re.duplicate();
			re.moveToBookmark(r.getBookmark());
			rc.setEndPoint('EndToStart', re);

			return rc.text.length;
		}

		return 0;

	}

	function setCaretXY(elem, real_element, caret, offset) {

		var rects = elem.getClientRects();
		var lastRect = rects[rects.length - 1];

		var
		x = lastRect.left + lastRect.width - offset[0] + document.body.scrollLeft,
		y = lastRect.top - real_element.scrollTop - offset[1] + document.body.scrollTop;

		caret.style.cssText = "top: " + y + "px; left: " + x + "px";
		// console.log(x, y, offset);

	}

	function getPos(e) {

		e = document.getElementById(e);

		var x = 0;
		var y = 0;

		while (e.offsetParent !== null) {
			x += e.offsetLeft;
			y += e.offsetTop;
			e = e.offsetParent;
		}

		return [x, y];

	}
	*/
