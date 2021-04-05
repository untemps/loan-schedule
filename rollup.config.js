import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'
import visualizer from 'rollup-plugin-visualizer'
import generateDeclarations from 'rollup-plugin-generate-declarations'

const production = process.env.NODE_ENV === 'production'
const target = process.env.BABEL_ENV

export default {
	input: 'src/index.ts',
	output: {
		name: 'loan-schedule',
		file: {
			cjs: 'dist/index.js',
			es: 'dist/index.es.js',
			umd: 'dist/index.umd.js',
		}[target],
		format: target,
		sourcemap: 'inline',
	},
	plugins: [
		typescript({
			tsconfig: 'tsconfig.json',
		}),
		resolve(),
		commonjs(),
		filesize(),
		production && terser(),
		visualizer({
			sourcemap: true,
			open: true,
		}),
		generateDeclarations()
	],
}
