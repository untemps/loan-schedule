import ts from '@wessberg/rollup-plugin-ts'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'
import visualizer from 'rollup-plugin-visualizer'

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
		ts({
			tsconfig: (config) => ({
				...config,
				declaration: target === 'cjs',
				declarationDir: './dist/types',
				exclude: ['./src/**/*.test.ts'],
			}),
		}),
		production && terser(),
		filesize(),
		visualizer({
			open: false,
		}),
	],
}
