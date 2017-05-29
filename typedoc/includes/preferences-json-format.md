# preferences.json Format

Hain supports Plugin Preferences defined by `preferences.json` using **JSONSchema**.

Put a `preferences.json` file into your plugin folder and you can open Preferences by entering `open preferences` in Hain.

See <http://json-schema.org/> for full details on JSONSchema

## Example

```json
{
	"type": "object",
	"properties": {
		"testStr": {
			"type": "string",
			"title": "Test string",
			"default": "this is default"
		},
		"testBool": {
			"type": "boolean",
			"title": "Test boolean",
			"default": true
		}
	}
}
```

Will show in Hain preferences like this:

<p align="center">
  <img src="../assets/images/pref-sample1.png" />
</p>

## Accessing From Code

You can access the preferences via `pluginContext.preferences` such as:

```javascript
'use strict'

module.exports = (pluginContext) => {
	const logger = pluginContext.logger;
	const prefObj = pluginContext.preferences;

	const pref = prefObj.get();
	logger.log(pref.testStr);
	logger.log(pref.testBool);

	// or
	logger.log(prefObj.get('testStr'));
	logger.log(prefObj.get('testBool'));

	function startup() { ... }
	function search(query, res) { ... }
	function execute(id, payload) { ... }

	return { startup, search, execute };
};
```
See [[hain.PluginContext.Preferences]] for details.

## Non-Standard Options

### Error Messages
You can customize error messages for various conditions.

#### Example

```json
{
	"type": "string",
	"minLength": 3,
	"errorMessages": "This is error!"
}
```

  **- or -**

```json
{
	"type": "string",
	"minLength": 3,
	"maxLength": 5,
	"errorMessages": {
		"minLength": "This is Error for minLength",
		"maxLength": "This is Error for maxLength"
	}
}
```

### Enum Values
You can define a set of values for string property

#### Example

```json
{
	"type": "string",
	"enum": [
		"a",
		"b",
		"c"
	]
}
```

## Limitations
Currently, the type of root object must be `object`.
