import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default ({ mode }) => ({
  target: 'node',
  mode: mode === 'prod' ? 'production' : 'development',
  entry: {
    main: resolve(__dirname, 'src', 'index.ts'),
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].bundle.cjs',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
});
