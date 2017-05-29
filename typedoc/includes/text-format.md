# Text Format

Hain supports restricted HTML for displaying Text by plugins.

You can use tags like:

* &lt;b&gt;<b>Bold</b>&lt;/b&gt;
* &lt;i&gt;<i>Italic</i>&lt;/i&gt;
* &lt;u&gt;<u>Underline</u>&lt;/u&gt;
* &lt;em&gt;<em>Emphasized</em>&lt;/em&gt;
* &lt;span&gt;<span style="font-name: courier;">Span with style</span>&lt;/span&gt;

You should use these tags carefully to avoid breaking layout.

## Example

```javascript
function search(query, res) {
	res.add({
		title:	'<b>Bold</b> text',
		desc:	'<span style="color: blue">blue</span> text'
	});
}
```
