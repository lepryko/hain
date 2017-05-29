/**
 * [[include:plugins-on-github.md]]
 *
 * @td:Type Guide
 * @td:Title Guides
 */
export namespace Guides {

	/**
	 * [[include:plugin-skeleton.md]]
	 *
	 * @td:Type Guide
	 * @td:Title Plugin Skeleton
	 **/
	export namespace Plugin_Skeleton { }

	/**
	 * [[include:plugin-directories.md]]
	 *
	 * @td:Type Guide
	 * @td:Title Plugin Directories
	 **/
	export namespace Plugin_Directories { }

	/**
	 * [[include:package-json-format.md]]
	 *
	 * @td:Type Guide
	 * @td:Title package.json Format
	 **/
	export namespace package_json_Format { }

	/**
	 * [[include:preferences-json-format.md]]
	 *
	 * @td:Type Guide
	 * @td:Title preferences.json Format
	 **/
	export namespace preferences_json_Format { }

	/**
	 * [[include:icon-url-format.md]]
	 *
	 * @td:Type Guide
	 * @td:Title Icon URL Format
	 **/
	export namespace Icon_URL_Format { }

	/**
	 * [[include:text-format.md]]
	 *
	 * @td:Type Guide
	 * @td:Title Text Format
	 **/
	export namespace Text_Format { }

	/**
	 * [[include:share-your-plugins.md]]
	 *
	 * @td:Type Guide
	 * @td:Title Share your plugins
	 **/
	export namespace Share_your_plugins { }

	/**
	 * [[include:limitations.md]]
	 *
	 * @td:Type Guide
	 * @td:Title Limitations
	 **/
	export namespace Limitations { }

	/**
	 * @td:Type Guide
	 * @td:Title package.json Format 2
	 */
	namespace package_json_Format2 {
	}

	interface package_json_Format2 {
		/** Plugin name, must be prefixed with `hain-plugin` */
		name: string;

		/** Name of Plugin Author */
		author: string | object;

		/** [Semantic Plugin Version](http://semver.org/) e.g. 'x.y.z' */
		version: string;

		/** If your plugin has external dependencies, include them here. (required if applicable) */
		dependencies?: string[];

		/** */
		hain: {
			/** Plugin command prefix which starts with one of `?@=\/#`, e.g. '/g' */
			prefix: string;

			/** Plugin usage to be displayed in the empty ResultList. e.g. 'type /g' (Default is `prefix` value if not specified) */
			usage?: string;

			/** Icon URL, see [Icon URL Format]({{ site.baseurl }}/docs/icon-url-format/) */
			icon: string;

			/** Query to redirect user input when user did select intro help */
			redirect?: string;

			/** Default result group name (Defaults to `name` value if not specified) */
			group?: string;
		};

		/** Add Base API version `hain-0.6.0` for sharing your plugin */
		keywords: string[];
	}
}
