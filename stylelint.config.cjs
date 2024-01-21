module.exports = {
    customSyntax: 'postcss-html',
    plugins: [
      'stylelint-scss',
      'stylelint-declaration-block-no-ignored-properties',
      'stylelint-no-unsupported-browser-features',
      'stylelint-prettier',
    ],
    extends: ['stylelint-config-recess-order'],
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
        'plugin/declaration-block-no-ignored-properties': true
    }
  }
  