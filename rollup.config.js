import typescript from '@wessberg/rollup-plugin-ts'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
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
		typescript({
			tsconfig: (config) => ({
				...config,
				declaration: target === 'cjs'
			}),
		}),
		production && terser(),
		filesize(),
		visualizer({
			open: false,
		}),
	],
}
