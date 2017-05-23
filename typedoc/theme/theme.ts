require('source-map-support').install();

import {Renderer} from "typedoc/dist/lib/output/renderer";
import * as fs from "fs";
import * as Path from "path";
import {UrlMapping} from "typedoc/dist/lib/output/models/UrlMapping";
import {Application, ProjectReflection} from "typedoc";
import {NavigationItem} from "typedoc/dist/lib/output/models/NavigationItem";
import {Component} from "typedoc/dist/lib/output/components";
import {DefaultTheme} from "typedoc/dist/lib/output/themes/DefaultTheme";
import {PageEvent, RendererEvent} from "typedoc/dist/lib/output/events";
import {Comment, CommentTag, DeclarationReflection, Reflection} from "typedoc/dist/lib/models";

console.log('hain/theme.js loaded');

// module.exports = function PluginTheme() {
// 	return HainTheme;
// };

/**
 * Hain theme over-rides for typedoc DefaultTheme
 */
export default class HainTheme extends DefaultTheme {
	// prop: {
	// 	str: string;
	// 	num: number;
	// };
	//
	// func(arg: { str: string; num: number; }, f: (arg: string) => number): { str: string, num: number; } {
	// 	let a = 0;
	// 	return arg;
	// }

	/**
	 * Create a new MarkdownTheme instance.
	 *
	 * @param renderer  The renderer this theme is attached to.
	 * @param basePath  The base path of this theme.
	 */
	constructor(renderer: Renderer, basePath: string) {
		super(renderer, basePath);
		// console.log('theme-renderer-construct');
		this.listenTo(this.owner, {
			[RendererEvent.BEGIN]: this.onBeginRenderer,
			[PageEvent.BEGIN]: this.onBeginPage,
		}, undefined, 512);

		// console.log('hain/theme.js constructed');
		// renderer.removePlugin('assets'); // markdown doesn't need assets
		// renderer.removePlugin('javascriptIndex'); // markdown doesn't need search.js
		// renderer.removePlugin('prettyPrint'); // new lines and spaces have meaning in markdown, don't omit them automatically!
		// Handlebars.registerHelper('newLine', () => '\n');
	}

	private onBeginRenderer(e: RendererEvent) {
		// console.log('theme-render-begin');

		const project: ProjectReflection = e.project;

		for(let id of Object.keys(project.reflections)) {
			let ref: DeclarationReflection = project.reflections[id];

			if(ref.hasComment() && ref.comment.tags) {
				let comment: Comment = ref.comment;

				comment.tags = comment.tags
					.reduce(
						(tags: CommentTag[], tag: CommentTag) => {
							switch(tag.tagName) {
								case 'td:title':
									ref.name = tag.text;
									break;
								case 'td:type':
									ref.cssClasses = ref.cssClasses.replace(/tsd-kind-\S+/, 'tsd-kind-'+tag.text.toLowerCase());
									ref.kindString = tag.text;
									break;
								default:
									tags.push(tag);
							}
							return tags;
						}, []);

				(ref.comment.tags || [])
					.forEach((tag: CommentTag) => {
						// if(tag.tagName.startsWith('td:')) {
						//
						// 	console.log('%s: %s -> %s', ref.name, tag.tagName, tag.text);
						// }
					});
			}
		}
	}

	private onBeginPage(e: PageEvent) {
		// console.log('theme-page-begin');
	}

	// isOutputDirectory(path: string): boolean {
	// 	return fs.existsSync(Path.join(path, 'index.md'));
	// }

	// getUrls(project: ProjectReflection): UrlMapping[] {
	// 	/**
	// 	 * Replace the extensions of the given model and its descendants' url
	// 	 *
	// 	 * @param model
	// 	 */
	// 	function replaceModelUrlExtention(model: any): void {
	// 		if (!model) {
	// 			return;
	// 		}
	// 		model.url = HainTheme.replaceExtention(model.url);
	// 		model.children && model.children.forEach(replaceModelUrlExtention);
	// 	}
	//
	// 	return super.getUrls(project).map(urlMapping => {
	// 		replaceModelUrlExtention(urlMapping.model);
	// 		return new UrlMapping(
	// 			HainTheme.replaceExtention(urlMapping.url),
	// 			urlMapping.model,
	// 			urlMapping.template,
	// 		)
	// 	});
	// }

	getNavigation(project: ProjectReflection): NavigationItem {
		// console.log('getNavigation');
		return super.getNavigation(project);
		/**
		 * Replace the extentions of paths held by the given navigation and its descendants.
		 *
		 * @param navigation The target navigation instance.
		 */
		// 	function replaceNavigationExtention(navigation: NavigationItem): void {
		// 		navigation.url = HainTheme.replaceExtention(navigation.url);
		// 		if (navigation.dedicatedUrls) {
		// 			navigation.dedicatedUrls = navigation.dedicatedUrls.map(HainTheme.replaceExtention);
		// 		}
		// 		navigation.children && navigation.children.forEach(replaceNavigationExtention);
		// 	}
		//
		// 	const navigation = super.getNavigation(project);
		// 	replaceNavigationExtention(navigation);
		// 	return navigation;
	}

	/**
	 * Replace the extension of the path from html to md
	 *
	 * @param path The original path to be replaced.
	 * @returns    The replaced path.
	 * @private
	 */
	// private static replaceExtention(path: string): string {
	// 	return path ? path.replace(/\.html($|#.*$)/, '.md$1') : path;
	// }
}
