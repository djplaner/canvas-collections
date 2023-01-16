import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import metablock from 'rollup-plugin-userscript-metablock';
import svelte from 'rollup-plugin-svelte';
import css from 'rollup-plugin-css-only';
import sveltePreprocess from 'svelte-preprocess';
import MagicString from 'magic-string';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.ts',
	output: {
		file: 'dist/canvas-collections.js',
		format: 'iife',
		name: 'app',
	},
	plugins: [

		svelte({
			preprocess: sveltePreprocess({
				sourceMap: !production,
				preserve: ['module']
			}),
			compilerOptions: {
				dev: !production
			}
		}),

		css({
			output: 'bundle.css'
		}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs({
			include: 'node_modules/**',
			esmExternals: true
		}),

		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),

		//metablock({ file: './meta.js' }),
	],

}