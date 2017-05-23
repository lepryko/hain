# package.json Format

A Hain plugin is just a nodejs module.  Plugin configuration is located in the package.json file.  

* `name` `string` - Plugin name, must be prefixed with `hain-plugin-` (**required**)
* `author` `string` or `object` - Name of Plugin Author (**required**)
* `version` `string` - Plugin version 'x.y.z' (**required**)
* `dependencies` `string[]` - If your plugin has external dependencies, include them here. (required if applicable)
* `hain` `object` - (**required**)
  - `prefix` `string` - Plugin command prefix which starts with one of `?@=\/#`, e.g. '/g' (**required**)
  - `usage` `string` - Plugin usage to be displayed in the empty ResultList. e.g. 'type /g' (optional, default is `prefix` value)
  - `icon` `string` - Icon URL, see [Icon URL Format]({{ site.baseurl }}/docs/icon-url-format/) (**required**)
  - `redirect` `string` - Query to redirect user input when user did select intro help (optional)
  - `group` `string` - Default result group name (optional, default is `name` value)

**And...**

* `keywords` `string[]` - Add Base API version `hain-0.6.0` for sharing your plugin (**required**)

## Example package.json  

```json
{
  "name": "hain-plugin-google",
  "author": "Heejin Lee",
  "version": "0.0.1",
  "keywords": [
    "hain-0.6.0"
  ],
  "hain": {
    "prefix": "/g",
    "usage": "type /g something to google it",
    "icon": "#fa fa-google",
    "redirect": "/g "
  }
}
```
