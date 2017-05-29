### Using Typescript Definition Files
When these definitions have been published to [npmjs](http://npmjs.org), you should be able to include them by running the following:

```shell
npm install -D @types/hain-plugin
```

### Sample Skeleton w/ Type Support
This code sample uses JSdoc comments and references the `hain-plugin.d.ts` types defined for code completion.  The code also shows
the use of `startup()` and the indexer, the `search()`, `execute()`, and `renderPreview()`

This code was written in [PhpStorm](https://www.jetbrains.com/phpstorm/) by Jet Brains which allows for typescript definition files
mixed within pure javascript and JSDoc markup.

This could easily be writen in TypeScript and compiled down to native javascript if you so desired.

```javascript
'use strict';

/**
 * Setup the plugin, return an object with our hook points
 *
 * @param pluginContext {hain.PluginContext}
 */
function setup(pluginContext) {

	let { toast, indexer } = pluginContext;

	/**
	 * Called by Hain after the plugin is loaded
	 */
	function startup() {
		indexer.set('UniqueID', {
			id     : 1,
			payload: { Sample: 'ABC', Data: 1 },
			title  : 'Sample Result 1',
			desc   : 'Sample Description 1',
		})
	}

	/**
	 * Called by Hain when the user searches using your plugins prefix
	 *
	 * @param {string} 				query
	 * @param {hain.ResponseObject} res
	 */
	function search(query, res) {
		if(query) {
			res.add({
				id     : 2,
				payload: { Sample: 'ABC', Data: 2 },
				title  : 'Sample Result 2',
				desc   : 'Sample Description 2',
			})
		}
	}

	/**
	 * Called by Hain when a user executes an item
	 *
	 * @param {*} 					id
	 * @param {*}					payload
	 * @param {hain.ExecuteData}	extra
	 */
	function execute(id, payload, extra) {
		if(extra.keys.altKey === true)
			toast.enqueue(`You launched ${id} with the alt key pressed.`);
		else
			toast.enqueue(`You launched ${id}.`)
	}

	/**
	 * Called by Hain when an item is selected from the list that included a preview value
	 *
	 * @param {*}           id
	 * @param {*}           payload
	 * @param {function} 	render
	 */
	function renderPreview(id, payload, render) {
		render('Sample <em>HTML</em> code to preview.');
	}

	return { startup, search, execute, renderPreview };
}

module.exports = setup;
```
