$(function () {

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
		_stylesInit += "}";

		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "";
		_stylesInit += "#aries-contextMenu { position: absolute; width: 300px; height: 150px; background-color: #07d0eb; display: none; z-index: 1000; }";

		// Context Menu
		_stylesInit += " .context-menu-list{margin:0;background-color:rgba(25,25,25,.55);color:#fcfcfc;cursor:default;font-family:'Courier New';font-size:12px;display:inline-block;transition:opacity 5s ease-out;padding:.5rem 0;position:absolute;width:auto;min-width:135px}.context-menu-item{line-height:1.5rem;padding:6px 15px;position:relative;user-select:none}.context-menu-item:hover{background-color:rgba(25,25,25,.55);color:#fcfcfc}.context-menu-separator:hover{background-color:transparent}.context-menu-submenu:after{content:'\00a0>';float:right}.context-menu-item>.context-menu-list{top:5px;right:-5px;border-left:5px solid rgba(25,25,25,.55);display:none}.context-menu-item.hover>.context-menu-list{display:block;margin:-8px 0 0!important}.context-menu-active{opacity:1}";

	_stylesInit += "</style>";

});