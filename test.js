const merge = require('lodash/merge')
const cssMatcher = require('jest-matcher-css')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')
const customPlugin = require('./index.js')

expect.extend({
	toMatchCss: cssMatcher
})

function generatePluginCss (overrides) {
	const config = {
		content: [{ raw: '<div class="font-variation-opsz font-opsz-14"><div class="font-variation-opsz-wdth-wght font-opsz-16 font-wght-800 font-wdth-75"></div></div>' }],
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
			}
		},
		corePlugins: false,
		plugins: [customPlugin]
	}

	return postcss(tailwindcss(merge(config, overrides)))
		.process('@tailwind components; @tailwind utilities', {
			from: undefined
		})
		.then(({ css }) => css)
}

test('utility classes can be generated', () => {
	return generatePluginCss().then((css) => {
		expect(css).toMatchCss(`    
    .font-variation-opsz {
      font-variation-settings: "opsz" var(--tw-font-variation-opsz)
  }
  .font-variation-opsz-wdth-wght {
      font-variation-settings: "opsz" var(--tw-font-variation-opsz), "wdth" var(--tw-font-variation-wdth), "wght" var(--tw-font-variation-wght)
  }
  .font-wdth-75 {
      --tw-font-variation-wdth: 75;
      *, ::before, ::after {
          --tw-font-variation-wdth: 100;
          --tw-font-variation-opsz: 96;
          --tw-font-variation-wght: 300
      }
      ::backdrop {
          --tw-font-variation-wdth: 100;
          --tw-font-variation-opsz: 96;
          --tw-font-variation-wght: 300
      }
  }
  .font-opsz-14 {
      --tw-font-variation-opsz: 14
  }
  .font-opsz-16 {
      --tw-font-variation-opsz: 16
  }
  .font-wght-800 {
      --tw-font-variation-wght: 800
  }
    `)
	})
})
