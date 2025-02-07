import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginNode from 'eslint-plugin-node';

export default [
	{ languageOptions: { globals: globals.node } },
	pluginJs.configs.recommended,
	{
		plugins: {
			node: pluginNode,
		},
		rules: {},
		ignores: ['**/*.test.js', 'test/**/*.js'],
	},
];
