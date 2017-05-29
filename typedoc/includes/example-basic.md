```javascript
'use strict';

module.exports = (pluginContext) => {
	function startup() {
		// You can do any initialization here
	}

	function search(query, res) {
		// You can return your search results here
	}

	function execute(id, payload, extra) {
		// When your result is selected, you can run something here
	}

	function renderPreview(id, payload, render) {
		// You can render preview with HTML
	}

	return { startup, search, execute, renderPreview };
};
```
