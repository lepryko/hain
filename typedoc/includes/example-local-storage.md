```javascript
'use strict';

module.exports = (pluginContext) => {
	const localStorage = pluginContext.localStorage;
    const logger       = pluginContext.logger;

	function startup() { ... }

	function search(query, res) { ... }

	function execute(id, payload, extra) {
		const last = localStorage.getItemSync('last_execute_time');
		const now  = DateTime.now();

		logger.log('Last execution time: %d, updating to %d', last, now);

		localStorage.setItemSync('last_execute_time', now);

		// ...
	}

	return { startup, search, execute};
};
```
