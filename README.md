# tailwind-variable-font

> Use variable fonts with Tailwind CSS classes

Install the plugin from npm:

```
$ npm install tailwind-variable-font
```

Then add the plugin to your `tailwind.config.js` file. Under `fontVariation` list each axis (here, `wdth`, `opsz` and `wght`) you would like to be able to control and give the `values` you want available as well as a default value.

```js
// tailwind.config.js
module.exports = {
  theme: {
    fontVariation: {
      wdth: {
				values: [75, 80, 85, 90, 95, 100],
				default: 100
			},
			opsz: {
				values: [12, 14, 16, 18, 21, 24, 28, 32, 36, 42, 48, 55, 63, 73, 84, 96],
				default: 96
			},
			wght: {
				values: [100, 200, 300, 400, 500, 600, 700, 800, 900],
				default: 300
			}
    },
  },
  plugins: [
    require('tailwind-variable-font'),
  ],
};
```

That configuration will generate all combinations of axis under `font-variation` (e.g. `font-variation-opsz`, `font-variation-opsz-wdth`, `font-variation-opsz-wdth-wght` but also `font-variation-wdth-opsz-wght` so the order doesn't matter). You can set each axis using `font-[axisname]-[value]` (e.g. `font-wdth-75`, `font-wght-800` but also use them with arbitrary values `font-wght-[456]`).

This plugin provides no fallback for non-variable fonts and assumes support for `font-variation-settings`.

With the above configuration you can use the plugin like so:

```html
<div class="font-variation-opsz font-opsz-[21]">
  <p>Hello</p>
  <div class="font-variation-opsz-wdth-wght font-opsz-16 font-wght-800 font-wdth-75">World</div>
</div>
```

## Note

Unfortunately, because of the lack of inheritance for `font-variation-settings` and the lack of support for `auto`/`none`, we have to always specificy which axis we want to control first and we can't have a nice API similar to Tailwind's CSS transforms where setting one property can automatically write the correct transform string.

## License

This project is licensed under the MIT License.

