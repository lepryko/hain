// Type definitions for hain-plugin pluginContext v0.6
// Project: hainproject/hain
// Definitions by: Clint Priest <https://github.com/cpriest>

/**
 * @see https://github.com/simonlast/node-persist
 */
declare namespace NodePersist {

	type milliseconds = number;

	interface InitOptions {
		dir?: string;
		stringify?: (toSerialize: any) => string;
		parse?: (serialized: string) => any;
		encoding?: string;
		logging?: boolean | Function;
		continuous?: boolean;
		interval?: milliseconds | boolean;
		ttl?: milliseconds | boolean;
	}

	interface LocalStorage {
		init(options?: InitOptions, callback?: Function): Promise<any>;

		initSync(options?: InitOptions): void;

		getItem(key: string, callback?: (err: any, value: any) => any): Promise<any>;

		getItemSync(key: string): any;

		setItem(key: string, value: any, callback?: (err: any) => any): Promise<any>;

		setItemSync(key: string, value: any): void;

		removeItem(key: string, callback?: (err: any) => any): Promise<any>;

		removeItemSync(key: string): void;

		clear(callback?: (err: any) => any): Promise<any>;

		clearSync(): void;

		values(): Array<any>;

		valuesWithKeyMatch(match: string): Array<any>;

		keys(): Array<string>;

		length(): number;

		forEach(callback: (key: string, value: any) => void): void;

		persist(callback?: (err: any) => any): Promise<any>;

		persistSync(): void;

		persistKey(key: string, callback?: (err: any) => any): Promise<any>;

		persistKeySync(key: string): void;
	}
}

declare namespace hain_ {
	/**
	 */
	interface BaseResult {
		/**
		 * An identifier (recommended to be unique), used as argument to execute(), default is `undefined`
		 */
		id?: any;

		/**
		 * Extra information, used as second argument to execute(), default is `undefined`
		 */
		payload?: any;

		/**
		 * Icon URL, default is `icon` of [package.json](../modules/guides.package_json_format.html).
		 * See [Icon URL Format](../modules/guides.icon_url_format.html)
		 */
		icon?: string;

		/**
		 * Redirection query, default is undefined
		 */
		redirect?: string;

		/**
		 * Result grouping name, default is `group` of [package.json](../modules/guides.package_json_format.html)
		 **/
		group?: string;

		/**
		 * Whether it has HTML Preview, default is false; used with render().
		 */
		preview?: boolean;
	}
}

/**
 * [[include:README.md]]
 */
export declare namespace hain {


	export type milliseconds = number;
	export type bitfield = number;

	/**
	 * These are the functions your plugin may implement
	 *
	 * Your plugin should return an object with references to the implemented functions.
	 *
	 * Note that your exported function is receiving an argument of [[PluginContext|pluginContext]].
	 *
	 * ### Example
	 * [[include:example-basic.md]]
	 */
	export class Plugin {

		/**
		 *  This function will be invoked once at startup.  Use promises and asynchronous calls to avoid long load times.
		 */
		startup?(): void;

		/**
		 * This function will be invoked when user changes their query. This will be called every `30ms` maximum.
		 *
		 * @param query  The query the user has input so far
		 * @param res    The results of the query should be added to this object
		 *
		 * @since v0.6   `search()` is only called when the query begins with your
		 * 					[package.json](../modules/guides.package_json_format.html) prefix value
		 */
		search(query: string, res: Plugin.ResponseObject): void;

		/**
		 * This function will be invoked when user executes an item you send in the search function.
		 *
		 * @param id       `id` of the selected [[SearchResult]] or [[IndexedResult]]
		 * @param payload  `payload` of the selected [[SearchResult]] or [[IndexedResult]]
		 * @param extra    Contains extra information passed from hain when the execute event ocurred
		 */
		execute?(id: any, payload: any, extra: Plugin.ExecuteData): void;

		/**
		 * If present, is called when an [[SearchResult]] or [[IndexedResult]] is selected from
		 * the list and that result included a `preview` value.
		 *
		 * @param id         id of the selected [[SearchResult]] or [[IndexedResult]]
		 * @param payload    payload of the selected [[SearchResult]] or [[IndexedResult]]
		 * @param render     Call this function with html to be rendered in the preview area
		 */
		renderPreview?(id: any, payload: any, render: (html: string) => void): void;
	}

	export namespace Plugin {

		/**
		 * Use this interface to add or remove [[SearchResult]] entries.
		 *
		 * This interface is always provided as the second argument to [[Plugin.search]]().
		 *
		 * ### Example
		 * ```
		 * function search(query, res) {
		 *	 // Add an entry to the result set
		 *	 res.add({
		 *	 	id:    'temp',
		 *	 	title: 'Fetching...',
		 *	 	desc:  'Please wait a second',
		 *	 });
		 *
		 *	 // Remove entry 'temp' after `1000ms`
		 *	 setTimeout(() =>
		 *	 	res.remove('temp'),
		 *	 1000);
		 * }
		 * ```
		 */
		export interface ResponseObject {
			/**
			 * Add a [[SearchResult]] to the result-set
			 *
			 * @param result  The result to be added to the list of searchable values
			 */
			add(result: SearchResult | SearchResult[]): void;

			/**
			 * You can remove a [[SearchResult]] from the result-set that you previously added
			 *
			 * @param id	The `id` property of the [[SearchResult]] previously added
			 */
			remove(id: string): void;
		}

		/**
		 * This data structure includes additional information from an activation event.
		 */
		export interface ExecuteData {
			/** The modifier keys that were active during an activation event. */
			keys: ExecuteKeyData;
		}

		/**
		 * This data structure represents the state of modifier keys at a specific point in time.
		 */
		export interface ExecuteKeyData {
			/** True if the alt was pressed along with execute key/click */
			altKey: boolean;

			/** True if the ctrl was pressed along with execute key/click */
			ctrlKey: boolean;

			/** True if the shift was pressed along with execute key/click */
			shiftKey: boolean;

			/** True if the meta was pressed along with execute key/click */
			metaKey: boolean;

			/**
			 * A bit field containing the state of all four modifier keys
			 *
			 * | Bit | Modifier  |
			 * |-----|-----------|
			 * | 1   | ctrlKey   |
			 * | 2   | altKey    |
			 * | 4   | shiftKey  |
			 * | 8   | metaKey   |
			 *
			 * @example: The ctrl + shift keys were being pressed (and no others), then modifierBitfield = (1 + 4) = 5
			 * @example: The alt key was being pressed (and no others), then modifierBitfield = 2
			 * @example: Check that the shift key was being pressed (regardless of others), then (modifierBitfield & 4) > 0
			 **/
			modifierBitfield: KeyBitfield;
		}

		export enum KeyBitfield {
			CTRL  = 1,
			ALT   = 2,
			SHIFT = 4,
			META  = 8,
		}

		/**
		 */
		export interface SearchResult extends hain_.BaseResult {
			/**
			 * Title text for item.
			 *
			 * See [Text Format](../modules/guides.text_format.html)
			 */
			title: string;

			/**
			 * Description text for item.
			 *
			 * See [Text Format](../modules/guides.text_format.html)
			 */
			desc: string;
		}

		/**
		 * IndexedResult is used as a return value for [[Indexer]]
		 *
		 * [[Indexer]] is used for synchronous searching items.
		 *
		 * Both `primaryText` and `secondaryText` are used for user query matching.
		 * `primaryText` has higher priority. `secondaryText` has lower priority.
		 */
		export interface IndexedResult extends hain_.BaseResult {
			/**
			 * Title text for item.
			 *
			 * See [Text Format](../modules/guides.text_format.html)
			 */
			primaryText: string;

			/**
			 * Description text for item.
			 *
			 * See [Text Format](../modules/guides.text_format.html)
			 */
			secondaryText: string;
		}
	}

		/**
		 * The main pluginContext parameter your plugin is passed when loaded
		 *
		 * ### Example
		 * ```
		 * 'use strict';
		 *
		 * module.exports = (pluginContext) => {
		 * 	const app = pluginContext.app;
		 * 	const toast = pluginContext.toast;
		 * 	const logger = pluginContext.logger;
		 *
		 * 	function startup() { ... }
		 *
		 * 	function search(query, res) { ... }
		 *
		 * 	function execute(id, payload, extra) {
		 * 		if (id === '1') {
		 * 			toast.enqueue('This is message', 1500);
		 * 		} else if (id == '2') {
		 * 			app.close();
		 * 		} else if (id == '3') {
		 * 			logger.log('this is log');
		 * 		}
		 * 	}
		 *
		 * 	return { startup, search, execute };
		 * };
		 * ```
		 **/
		export class PluginContext {
			/** Directory of hain managed plugins */
			MAIN_PLUGIN_REPO: string;

			/** Directory of development plugins (local / manually installed) */
			DEV_PLUGIN_REPO: string;

			/** Current version of the API that is available */
			CURRENT_API_VERSION: string;

			/** Array of API versions that are still compatible with current version */
			COMPATIBLE_API_VERSIONS: string[];

			INTERNAL_PLUGIN_REPO: string;

			__PLUGIN_PREINSTALL_DIR: string;

			__PLUGIN_PREUNINSTALL_FILE: string;


			/** Access to application functions */
			app: PluginContext.App;

			/** Access to clipboard functions */
			clipboard: PluginContext.Clipboard;

			/** Access to toast functionality */
			toast: PluginContext.Toaster;

			/** Access to shell functionality */
			shell: PluginContext.Shell;

			/** Access to logging functionality */
			logger: PluginContext.Logger;

			/**
			 * Access to matching utility functions
			 * @deprecated
			 **/
			matchUtil: PluginContext.MatchUtil;

			/** Access to plugin local storage */
			localStorage: PluginContext.PluginLocalStorage;

			/** Access to hain plugin indexer */
			indexer: PluginContext.Indexer;

			/** Access to hain global preferences */
			globalPreferences: PluginContext.Preferences;

			/** Access to plugin preferences */
			preferences: PluginContext.Preferences;
		}

	/**
	 */
	export namespace PluginContext {

		/**
		 */
		export interface App {
			/**
			 * Restarts Hain
			 */
			restart(): void;

			/**
			 * Quits Hain
			 */
			quit(): void;

			/**
			 * Open the window with a new query
			 *
			 * @param query - Query text
			 */
			open(query?: string): void;

			/**
			 * Close the window
			 *
			 * @param dontRestoreFocus - If true, Hain doesn’t restore focus to previous window
			 */
			close(dontRestoreFocus?: boolean): void;

			/**
			 * Change query (similar to `redirect` property in [[SearchResult]])
			 *
			 * @param query Change query
			 */
			setQuery(query: string): void;

			/**
			 * Open preferences window
			 *
			 * @param pluginId    - Open to a given plugin section.
			 */
			openPreferences(pluginId?: string): void;

			/**
			 * Reloads the plugins
			 */
			reloadPlugins(): void;

			/**
			 */
			setSelectionIndex(): void;
		}

		/**
		 * See [Electron Documentation](http://electron.atom.io/docs/api/clipboard/) for clipboard for details
		 *
		 * ### Example
		 *
		 * ```
		 * 'use strict'
		 *
		 * module.exports = (pluginContext) => {
		 * 	const clipboard = pluginContext.clipboard;
		 *
		 * 	function startup() { ... }
		 * 	function search(query, res) { ... }
		 *
		 * 	function execute(id, payload, extra) {
		 * 		clipboard.readText().then((result) => {
		 * 			console.log('Text from clipboard: ' + result);
		 * 		});
		 * 	}
		 *
		 * 	return { startup, search, execute };
		 * };
		 * ```
		 */
		export interface Clipboard {
			/**
			 * Read the clipboard in text format
			 *
			 * @param type The clipboard type to read
			 */
			readText(type?: string): Promise<string>;

			/**
			 * Write to the clipboard in text format
			 *
			 * @param text The content to place on the clipboard
			 * @param type The clipboard type to write
			 */
			writeText(text: string, type?: string): void;

			/**
			 * Read the clipboard in HTML format
			 *
			 * @param type The clipboard type to read
			 */
			readHTML(type?: string): Promise<string>;

			/**
			 * Write to the clipboard in HTML format
			 *
			 * @param html The html content to place on the clipboard
			 * @param type The clipboard type to clear
			 */
			writeHTML(html: string, type?: string): void;

			/**
			 * Clear the clipboard of contents
			 *
			 * @param type The clipboard type to clear
			 */
			clear(type: string): void;
		}

		/**
		 * You can show notifications to user by using Toast.
		 *
		 * @note Enqueued notifications are processed in order and will not be processed while the window isn’t visible.
		 */
		export interface Toaster {
			/**
			 * You can enqueue your notifications by using this function.
			 *
			 * @param message    Notification message
			 * @param duration    Duration to display message, default is 2000ms
			 */
			enqueue(message: string, duration: milliseconds): void;
		}

		/**
		 */
		export interface Shell {
			/**
			 * Show the given file in a file manager.
			 *
			 * @param fullPath    The full path to the item to be shown
			 */
			showItemInFolder(fullPath: string): void;

			/**
			 * Open the given file in the operating systems' default manner.
			 *
			 * @param fullPath    The full path to the item to be shown
			 */
			openItem(fullPath: string): void;

			/**
			 * Open the given external protocol URL in the desktop’s default manner.
			 *
			 * @param fullPath    The full path to the item to be opened
			 */
			openExternal(fullPath: string): void;
		}

		/**
		 * Send log messages out to various endpoints.
		 *
		 * Logging messages are sent to:
		 *   - The `Chrome Developer Tools` in the app (F12 to open).
		 *   - The hain-debug.log located along with hain.exe
		 *   - Standard output if run from a command prompt.
		 */
		export interface Logger {
			/**
			 * Logs your messages to stdout as well as the `Chrome Developer Tools` console.
			 *
			 * @param message    The message to be shown (compatible with [Chrome console.log](https://developers.google.com/web/tools/chrome-devtools/console/console-reference#log))
			 * @param args       Additional arguments to be shown
			 */
			log(message: string, ...args: any[]): void;
		}

		/**
		 */
		export interface MatchUtil {
			/**
			 * @deprecated
			 */
			fuzzy(): void;

			/**
			 * @deprecated
			 */
			fwdfuzzy(): void;

			/**
			 * @deprecated
			 */
			head(): void;

			/**
			 * @deprecated
			 */
			makeStringBoldHtml(): void;
		}

		/**
		 * ### Example
		 *
		 * ```
		 * 'use strict'
		 *
		 * module.exports = (pluginContext) => {
		 * 	const prefObj = pluginContext.preferences;
		 * 	let useProxy = false;
		 *
		 * 	function onPrefUpdate(pref) {
		 * 		useProxy = pref.useProxy;
		 * 	}
		 *
		 * 	function startup() {
		 * 		useProxy = prefObj.get('useProxy');
		 * 		prefObj.on('update', onPrefUpdate);
		 * 	}
		 *
		 * 	function search(query, res) { ... }
		 * 	function execute(id, payload, extra) { ... }
		 *
		 * 	return { startup, search, execute };
		 * };
		 * ```
		 */
		export interface Preferences {
			/**
			 * Returns raw preferences object if path is undefined, otherwise it returns the value at path of object,
			 *
			 * @param path    See path rules at @see https://lodash.com/docs#get
			 */
			get(path?: string): any;

			/**
			 * Add a listener to PreferencesObject.
			 *
			 * @param eventName    The `update` event is emitted when plugin preferences have changed
			 * @param listener     The call back to be used.
			 *
			 * @note: Currently, `update` is the only supported event; it will be emitted when the preference has changed.
			 */
			on(eventName: string, listener: (pref: string) => void): void;
		}

		/**
		 * Use this to persist non-preference data for your plugin
		 *
		 * This object is an instance of [simonlast/node-persist](https://github.com/simonlast/node-persist)
		 *
		 * @note: The interface listed here should be up to date, but the github repository is the final implementation.
		 *
		 * ### Example
		 * [[include:example-local-storage.md]]
		 */
		export interface PluginLocalStorage extends NodePersist.LocalStorage {

		}
		/**
		 * Add items to the Indexer that are known ahead of time.  e.g. Shortcuts, urls, files, etc.
		 *
		 * These are added to the global list of [[IndexedResult]] items and are searched automatically by Hain.
		 * @since v0.6
		 */
		export interface Indexer {
			/**
			 * Adds a set of results to the built-in indexer to be searchable, execute() is called with the id and payload provided.
			 *
			 * @param key       A unique ID which you can later use to remove or modify this addition
			 * @param value        The entry or entries to be added
			 */
			set(key: string, value: Plugin.IndexedResult | Plugin.IndexedResult[]): void;

			/**
			 * Adds a synchronous callback function to the built-in indexer, should return dynamic values to be used with the indexer
			 *
			 * @param key       A unique ID which you can later use to remove or modify this addition
			 * @param callback    The callback function, this will be called synchronously
			 */
			set(key: string, callback: (query: string) => Plugin.IndexedResult | Plugin.IndexedResult[]): void;

			/**
			 * Removes the set of results added with the given key
			 *
			 * @param key       A unique ID which you can later use to remove or modify this addition
			 */
			unset(key: string): void;
		}
	}
}
