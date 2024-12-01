module.exports = {
	extends: ['klayr-base/ts-jest'],
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	rules: {
		'@typescript-eslint/no-unsafe-assignment': ['off'],
		'@typescript-eslint/no-unsafe-member-access': ['off'],
		'@typescript-eslint/no-unsafe-call': ['off'],
		'@typescript-eslint/no-unsafe-return': ['off'],
		'@typescript-eslint/no-extraneous-class': ['off'],
		'@typescript-eslint/member-ordering': ['off'],
		'no-console': ['off'],
		'@typescript-eslint/explicit-member-accessibility': ['off'],
		'@typescript-eslint/no-namespace': ['off'],
		'@typescript-eslint/no-non-null-assertion': ['off'],
		'prefer-promise-reject-errors': ['off'],
		'@typescript-eslint/no-explicit-any': ['off'],
		'no-useless-constructor': ['off'],
		'import/no-unresolved': ['off'],
		'import/extensions': ['off'],
		'@typescript-eslint/prefer-nullish-coalescing': ['off'],
	},
};
