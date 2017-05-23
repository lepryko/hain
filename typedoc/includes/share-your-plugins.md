# Share your plugins

## Some Rules!
In short, you can share your plugin by publishing it on public [npmjs](http://npmjs.org) registry, but there are few rules.

1. You plugin should be prefixed with `hain-plugin-` so that hpm(hain-package-manager) can find your plugin in [npmjs](http://npmjs.org) registry.
2. You should add `hain-0.6.0` keyword in your package.json, then hpm can decide api compatibility.

## Publishing
In your plugin directory:

```
npm publish
```

After that, you can find your plugin in few seconds if you follow the rules above properly.
