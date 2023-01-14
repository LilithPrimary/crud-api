import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';

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
    clean: true,
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
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.NormalModuleReplacementPlugin(/.*/, function (resource) {
      const lowerCaseRequest = resource.request.toLowerCase();

      if (
        !lowerCaseRequest.includes('node_modules') &&
        lowerCaseRequest.endsWith('.js') &&
        lowerCaseRequest[0] === '.' &&
        resource.context.startsWith(resolve(__dirname)) &&
        !resource.context.toLowerCase().includes('node_modules')
      ) {
        resource.request =
          resource.request.substr(0, resource.request.length - 3) + '.ts';
        resource.request;
      }
    }),
  ],
});
