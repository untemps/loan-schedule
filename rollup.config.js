import typescript from '@wessberg/rollup-plugin-ts'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
import visualizer from 'rollup-plugin-visualizer'

const production = process.env.NODE_ENV === 'production'

export default {
	input: 'src/index.ts',
	output: [
		{
			name: 'loan-schedule',
			file: 'dist/index.js',
			format: 'cjs',
			sourcemap: 'inline',
		},
		{
			name: 'loan-schedule',
			file: 'dist/index.es.js',
			format: 'es',
			sourcemap: 'inline',
		},
		{
			name: 'loan-schedule',
			file: 'dist/index.umd.js',
			format: 'umd',
			sourcemap: 'inline',
		},
	],
	plugins: [
		typescript(),
		production && terser(),
		filesize(),
		visualizer({
			open: false,
		}),
	],
}
