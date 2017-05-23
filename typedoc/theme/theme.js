(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "typedoc/dist/lib/output/themes/DefaultTheme", "typedoc/dist/lib/output/events"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require('source-map-support').install();
    const DefaultTheme_1 = require("typedoc/dist/lib/output/themes/DefaultTheme");
    const events_1 = require("typedoc/dist/lib/output/events");
    console.log('hain/theme.js loaded');
    // module.exports = function PluginTheme() {
    // 	return HainTheme;
    // };
    /**
     * Hain theme over-rides for typedoc DefaultTheme
     */
    class HainTheme extends DefaultTheme_1.DefaultTheme {
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
        constructor(renderer, basePath) {
            super(renderer, basePath);
            // console.log('theme-renderer-construct');
            this.listenTo(this.owner, {
                [events_1.RendererEvent.BEGIN]: this.onBeginRenderer,
                [events_1.PageEvent.BEGIN]: this.onBeginPage,
            }, undefined, 512);
            // console.log('hain/theme.js constructed');
            // renderer.removePlugin('assets'); // markdown doesn't need assets
            // renderer.removePlugin('javascriptIndex'); // markdown doesn't need search.js
            // renderer.removePlugin('prettyPrint'); // new lines and spaces have meaning in markdown, don't omit them automatically!
            // Handlebars.registerHelper('newLine', () => '\n');
        }
        onBeginRenderer(e) {
            // console.log('theme-render-begin');
            const project = e.project;
            for (let id of Object.keys(project.reflections)) {
                let ref = project.reflections[id];
                if (ref.hasComment() && ref.comment.tags) {
                    let comment = ref.comment;
                    comment.tags = comment.tags
                        .reduce((tags, tag) => {
                        switch (tag.tagName) {
                            case 'td:title':
                                ref.name = tag.text;
                                break;
                            case 'td:type':
                                ref.cssClasses = ref.cssClasses.replace(/tsd-kind-\S+/, 'tsd-kind-' + tag.text.toLowerCase());
                                ref.kindString = tag.text;
                                break;
                            default:
                                tags.push(tag);
                        }
                        return tags;
                    }, []);
                    (ref.comment.tags || [])
                        .forEach((tag) => {
                        // if(tag.tagName.startsWith('td:')) {
                        //
                        // 	console.log('%s: %s -> %s', ref.name, tag.tagName, tag.text);
                        // }
                    });
                }
            }
        }
        onBeginPage(e) {
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
        getNavigation(project) {
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
    }
    exports.default = HainTheme;
});
//# sourceMappingURL=C:/code/node/hain-docs/typedoc/theme/theme.js.map