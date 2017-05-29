# package.json Format

A Hain plugin is just a nodejs module.  Plugin configuration is located in the package.json file.

<div class="htsd-table-hide"></div>

|                               |                                                                                                                            |
|:------------------------------|:---------------------------------------------------------------------------------------------------------------------------|
| ● name: _string_              | Plugin name, must be prefixed `hain-plugin-`                                                                               |
| ● author: _string_ ⏐ _object_ | Plugin Author Name                                                                                                         |
| ● version: _string_           | [Semantic Plugin Version](http://semver.org/) e.g. 'x.y.z'                                                                 |
| ● dependencies?: _string[]_   | If your plugin has external dependencies, include them here. <span class="tsd-flag ts-flagOptional">Optional</span>        |
| ● hain: _object_              |                                                                                                                            |
|   ⚪ prefix: _string_         | Plugin command prefix which starts with one of `?@=\/#`                                                                    |
|   ⚪ usage?: _string_         | Plugin usage to be displayed with an empty query with your `prefix` <span class="tsd-flag ts-flagOptional">Optional</span> |
|   ⚪ icon: _string_           | Icon URL, see [Icon URL Format](guides.icon_url_format.html)                                                               |
|   ⚪ redirect?: _string_      | Query to redirect user input when user did select intro help <span class="tsd-flag ts-flagOptional">Optional</span>        |
|   ⚪ group?: _string_         | Default result group name _(defaults to `name` value)_ <span class="tsd-flag ts-flagOptional">Optional</span>              |
|   ⚪ keywords: _string[]_     | Add Base API version `hain-0.6.0` for sharing your plugin                                                                  |

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
