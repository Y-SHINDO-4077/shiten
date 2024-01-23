const propertyGroups = require('stylelint-config-recess-order/groups');
module.exports = {
	overrides: [
		{
			files: ['*.astro', '**/*.astro', '*.html', '**/*.html'],
			customSyntax: 'postcss-html',
			rules: {
				'selector-pseudo-class-no-unknown': [
					true,
					{
						ignorePseudoClasses: ['global'],
					},
				],
			},
		},
	],
	plugins: ['stylelint-scss', 'stylelint-declaration-block-no-ignored-properties', 'stylelint-order'],
	extends: ['stylelint-config-standard', 'prettier', 'stylelint-config-recess-order', 'stylelint-config-standard-scss', 'stylelint-config-html/astro'],
	rules: {
		'prettier/prettier': true,
		'plugin/no-unsupported-browser-features': [
			true,
			{
				severity: 'warning',
			},
		],
		'font-family-no-missing-generic-family-keyword': true,
		'declaration-block-no-shorthand-property-overrides': true,
		'selector-pseudo-element-colon-notation': 'double',
		'plugin/declaration-block-no-ignored-properties': true,
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['function', 'if', 'for', 'each', 'include', 'mixin', 'content', 'use'],
			},
		],
		'order/order': ['less-mixins', 'dollar-variables', 'custom-properties', 'declarations', 'rules'],
		'order/properties-order': propertyGroups.map(group => ({
			...group,
			emptyLineBefore: 'always',
			noEmptyLineBetween: true,
		})),
		'selector-class-pattern': [
			'^\\.(c|p|u)-[a-z0-9\\-__]+$',
			{
				resolveNestedSelectors: true,
				message: 'Class names should follow FLOCSS syntax.',
			},
		],
		'declaration-block-no-duplicate-properties': [
			true,
			{
				ignore: ['consecutive-duplicates', 'consecutive-duplicates-with-different-values'],
			},
		],
	},
};
