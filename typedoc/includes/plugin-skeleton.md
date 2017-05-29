# Plugin Skeleton

## Structure of Plugin Folder

```
hain-plugin-something
├─ package.json      - nodejs package.json (required)
├─ preferences.json  - JSONSchema preferences.json (optional)
├─ index.js          - script code (required)
└─ ...
```

## index.js

<!-- [[include:example-basic.md]] -->
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

See [[Plugin]] for detailed information.

## Example Plugin

```javascript
'use strict';

module.exports = (pluginContext) => {
	const toast = pluginContext.toast;
	const logger = pluginContext.logger;

	function startup() {
		logger.log('doing preparation');
	}

	function search(query, res) {
		res.add({
			id:			'1',
			payload:	query,
			title:		`You entered ${query} now`,
			desc:		`<b>${query}</b>`
		});
	}

	function execute(id, payload, extra) {
		if (id === '1') {
			toast.enqueue(`${payload} was entered`);
		}
	}

	function renderPreview(id, payload, render) {
		render('<html><body>Something</body></html>');
	}

	return { startup, search, execute, renderPreview };
};
```
