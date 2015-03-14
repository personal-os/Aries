/**
 * CustomScrollbar.js
 * A compact scrollbar script that allows a custom styled scrollbar by using browsers' default scroll behavior.
 * Matthias Schuetz, http://matthiasschuetz.com
 *
 * Copyright (C) Matthias Schuetz
 * Free to use under the MIT license
 */
var CustomScrollbar = function(options) {
  var _scrollbar;
  var _scrollbarThumb;
  var _scrollContent;
  var _scrollSizeRatio;
  var _scrollContentOverflowRatio;
  var _scrollContentRawHeight;
  var _scrollbarThumbMouseDown = false;
  var _scrollbarThumbMouseY = 0;
  var _mouseY = 0;
  var _initialScrollTop = 0;
  var _browserInfo;
  var _options = {
    thumbHeight: options && options.thumbHeight,
    bodyPaddingRight: options && options.bodyPaddingRight,
    selectors: options && options.selectors || {
      scrollbar: "scrollbar",
      scrollbarThumb: "scrollthumb"
    }
  };

  function _px(value) {
    return Number(value) + "px";
  }

  function _createDiv(elementId, parent) {
    var divElement = document.createElement("div");
    var parentElement = parent || _scrollContent;

    divElement.id = elementId;
    parentElement.appendChild(divElement);

    return divElement;
  }

  function _createDOM() {
    _scrollContent = document.querySelector("body");
    _scrollbar = _createDiv(_options.selectors.scrollbar);
    _scrollbarThumb = _createDiv(_options.selectors.scrollbarThumb, _scrollbar);
  }

  function _updateScrollbarThumb() {
    if (_scrollContent) {
      if (Math.floor(_scrollContent.scrollTop / _scrollSizeRatio) < (_scrollContent.scrollHeight - _scrollbarThumb.offsetHeight)) {
        _scrollbarThumb.style.top = _px(_scrollContent.scrollTop / _scrollSizeRatio);
      } else {
        _scrollbarThumb.style.top = _px(_scrollContent.scrollHeight - _scrollbarThumb.offsetHeight);
      }
    }
  }

  function _update() {
    if (_options.thumbHeight && _scrollbarThumb) {
      _scrollbarThumb.style.height = _px(_scrollContent.offsetHeight * (_options.thumbHeight / 100));
    }

    if (_scrollContent) {
      if (_browserInfo.isWebkit) {
        _scrollContentOverflowRatio = _scrollContent.scrollHeight - _scrollContent.offsetHeight;
        _scrollContentRawHeight = _scrollContent.scrollHeight - _scrollbarThumb.offsetHeight;

        if (_scrollContent.offsetHeight >= _scrollContent.scrollHeight) {
          _scrollbar.style.visibility = "hidden";
        } else {
          _scrollbar.style.visibility = "visible";
        }
      } else {
        _scrollContent.style.height = _px(window.innerHeight);
        _scrollContentOverflowRatio = _scrollContent.scrollHeight - _scrollContent.offsetHeight;
        _scrollContentRawHeight = _scrollContent.offsetHeight - _scrollbarThumb.offsetHeight;

        if (_scrollContent.offsetHeight >= _scrollContent.scrollHeight) {
          _scrollbarThumb.style.visibility = "hidden";
        } else {
          _scrollbarThumb.style.visibility = "visible";
        }
      }

      _scrollSizeRatio = (_scrollContentOverflowRatio / _scrollContentRawHeight);
      _scrollbarThumb.style.top = _px(_scrollContent.scrollTop / _scrollSizeRatio);
    }
  }

  function _recalculateScrollbarHeight() {
    if (_browserInfo.isWebkit) {
      _scrollbar.style.height = _px(0);
      _scrollbarThumb.style.top = 0;
      _scrollbar.style.height = _px(_scrollContent.scrollHeight);
    }
  }

  function _applyBrowserStyle() {
    var styleElement = document.createElement("style");

    styleElement.type = "text/css";

    if (!_browserInfo.isWebkit) {
      if (_browserInfo.isIE) {
        styleElement.innerHTML = "html, body { overflow: hidden; }";
      } else {
        styleElement.innerHTML = "html, body { overflow: hidden; } body { overflow-y:scroll; }";
      }
    }

    if (_options.bodyPaddingRight) {
      styleElement.innerHTML += "body { padding-right: " + _options.bodyPaddingRight + "px; }";
    }

    _scrollContent.appendChild(styleElement);

    _scrollContent.className += (_scrollContent.className.length > 0 ? " " : "") + "has-customscrollbar" + (_browserInfo.isFirefox ? " has-customscrollbar-firefox" : "");
  }

  function _getBrowserInfo() {
    var isTouch = (("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch);

    return {
      isFirefox: navigator.userAgent.match(/(firefox)/i) ? true : false,
      isIE: navigator.userAgent.match(/(trident)/i) ? true : false,
      isWebkit: navigator.userAgent.match(/(chrome|safari)/i) ? true : false,
      useScrollbar: !isTouch && !navigator.msMaxTouchPoints
    };
  }

  function _init() {
    window.addEventListener("load", function(event) {
      setTimeout(function() {
        _initialScrollTop = window.pageYOffset;

        _createDOM();
        _applyBrowserStyle();
        _update();
        _update();

        _scrollbarThumb.addEventListener("mousedown", function(event) {
          _scrollbarThumbMouseDown = true;
          _scrollbarThumbMouseY = _browserInfo.isWebkit ? event.offsetY : _mouseY - _scrollContent.offsetTop - _scrollbarThumb.offsetTop;

          event.preventDefault();
        });

        if (_browserInfo.isWebkit) {
          _scrollbar.style.height = _px(_scrollContent.scrollHeight);
        } else {
          _scrollContent.addEventListener("scroll", _updateScrollbarThumb);

          if (_browserInfo.isIE) {
            _scrollContent.addEventListener("mousewheel", function(event) {
              _scrollContent.scrollTop -= event.wheelDelta;
            });

            window.addEventListener("keydown", function(event) {
              _scrollContent.scrollTop += (event.keyCode === 32 ? (_scrollContent.offsetHeight / 1.5) : (45 * (event.keyCode === 40 ? 1 : (event.keyCode === 38 ? -1 : 0))));
            });
          }
        }

        if (_browserInfo.isFirefox) {
          setTimeout(function() {
            _scrollContent.scrollTop = _initialScrollTop;
          }, 0);
        }
      }, 0);
    });

    document.addEventListener("mouseup", function(event) {
      _scrollbarThumbMouseDown = false;
    });

    document.addEventListener("mousemove", function(event) {
      _mouseY = event.clientY;

      if (_scrollbarThumbMouseDown) {
        if (_browserInfo.isWebkit) {
          _scrollContent.scrollTop = (_mouseY - _scrollbarThumbMouseY) * (_scrollContentOverflowRatio / (_scrollContent.offsetHeight - _scrollbarThumb.offsetHeight));
        } else {
          _scrollContent.scrollTop = (_mouseY - _scrollContent.offsetTop - _scrollbarThumbMouseY) * _scrollSizeRatio;
        }
      }
    });

    window.addEventListener("scroll", _updateScrollbarThumb);

    window.addEventListener("resize", function() {
      _recalculateScrollbarHeight();

      setTimeout(function() {
        _update();
        _update();
      }, 0);
    });
  }

  _browserInfo = _getBrowserInfo();

  if (_browserInfo.useScrollbar) {
    _init();
  }
};