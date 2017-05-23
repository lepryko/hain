module.exports = {
	name: 'hain Documentation',

	mode  : 'file',
	target: 'ES5',

	out     : './html/',
	rootDir : './src/',
	theme   : './theme/',
	includes: './includes/',
	readme  : './index.md',

	// entryPoint: 'hain',

	includeDeclarations: true,
	excludeExternals   : true,
	excludeNotExported : true,
	hideSources        : true,
};

/**
 mode  : 'file',
 target: 'ES2015',

 out    : './html',
 rootDir: './src',

 theme   : './theme',
 includes: './includes',
 name    : 'hain Documentation',

 // entryPoint: 'hain',

 version            : true,
 includeDeclarations: true,
 excludeExternals   : true,
 excludeNotExported : true,
 hideSources        : true,
 readme             : 'index.md',
 **/
