(function () {

	var
	triggerBttn = document.getElementById("trigger-overlay"),
	overlay = document.querySelector("div.overlay"),
	closeBttn = overlay.querySelector("button.overlay-close");

	transEndEventNames = {
		"transition": "transitionend",
		"WebkitTransition": "webkitTransitionEnd"
	},
	transEndEventName = transEndEventNames[Modernizr.prefixed("transition")],
	support = { transitions: Modernizr.csstransitions };

	function toggleOverlay() {

		if (classie.has(overlay, "overlay-scale--is-open")) {
			classie.remove(overlay, "overlay-scale--is-open");
			classie.add(overlay, "close");

			var onEndTransitionFn = function (ev) {

				if (support.transitions) {
					if (ev.propertyName !== "visibility") return;
					this.removeEventListener(transEndEventName, onEndTransitionFn);
				}

				classie.remove(overlay, "close");

			};

			if (support.transitions) {
				overlay.addEventListener(transEndEventName, onEndTransitionFn);
			} else {
				onEndTransitionFn();
			}
		} else if (!classie.has(overlay, "close")) {
			classie.add(overlay, "overlay-scale--is-open");
		}

	}

	triggerBttn.addEventListener("click", toggleOverlay);
	closeBttn.addEventListener("click", toggleOverlay);

})();
