const plugin = require('tailwindcss/plugin')
require('lodash.permutations')
const _ = require('lodash')

module.exports = plugin(function ({ matchUtilities, addUtilities, theme }) {
	const axes = theme('fontVariation')
	const allAxes = Object.keys(axes)

	const allCombos = _.flatMap(allAxes, (v, i, a) => _.permutations(a, i + 1))

	const utilities = {}

	allCombos.forEach((combo) => {
		utilities[`.font-variation-${combo.join('-')}`] = {
			'font-variation-settings': combo.map((axis) => `"${axis}" var(--tw-font-variation-${axis})`).join(', ')
		}
	})

	addUtilities(utilities)

	const fontVariationSettingsDefaults = {}

	Object.keys(axes).forEach((axis) => {
		fontVariationSettingsDefaults[`--tw-font-variation-${axis}`] = `${axes[axis].default}`
	})

	Object.keys(axes).forEach((axis) => {
		const values = {}

		axes[axis].values.forEach((v) => {
			values[v] = `${v}`
		})

		matchUtilities({
			[`font-${axis}`]: (value) => {
				return {
					[`--tw-font-variation-${axis}`]: value,
					'@defaults font-variation-settings': fontVariationSettingsDefaults
				}
			}
		}, {
			values
		})
	})
}, {
	theme: {
		fontVariation: {
			wght: {
				values: [100, 200, 300, 400, 500, 600, 700, 900],
				default: 300
			}
		}
	}
})
