import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy'
import css from 'rollup-plugin-css-only';
const resolveIngredients = require("./scripts/resolveIngredients.js");
const bundleConfigs = require("./scripts/bundleConfigs.js");
const glob = require("glob");

const production = !process.env.ROLLUP_WATCH;

const recipeConfigs = glob.sync("./configs/**/{Ingredients.*.yml,Recipes.*.yml}");

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'build/bundle.js'
	},
	plugins: [
		bundleConfigs({
			targets: recipeConfigs,
			outputFile: 'build/recipes.json',
		}),
		//resolveIngredients({
		//	targets: recipeConfigs
		//}),

		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('build'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),

		copy({
			"targets": [
				{ "src": "public/index.html", "dest": "build" },
				{ "src": "public/global.css", "dest": "build" },
			]
		})
	],
	watch: {
		clearScreen: false
	}
};
