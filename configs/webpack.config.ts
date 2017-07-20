import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as OpenBrowserPlugin from 'open-browser-webpack-plugin';
import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import { devServer, lintTypeScript } from './parts';
import * as merge from 'webpack-merge';

const PATHS = {
  app: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../build'),
  nodeModules: path.join(__dirname, '../node_modules'),
};

const commonConfig: webpack.Configuration = merge([
  {
    entry: [
      'react-hot-loader/patch', // activate HMR for React, should always go first
      './index.tsx' // the entry point of our app
    ],
    output: {
      filename: 'bundle.js',
      path: PATHS.build
    },
    context: PATHS.app,
    plugins: [
      new HtmlWebpackPlugin({
        // Required
        inject: false,
        template: '!!pug-loader!./public/index.pug'
      }),
      // new OpenBrowserPlugin({ url: `http://${process.env.HOST}:${process.env.PORT}` }),
      new FriendlyErrorsWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ],
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      modules: [PATHS.app, 'node_modules'],
    },
  },
  lintTypeScript({ include: PATHS.app }),
]);

const productionConfig: webpack.Configuration = merge([
]);

const developmentConfig: webpack.Configuration = merge([
  {
    devServer: devServer({ host: process.env.HOST, port: +process.env.PORT }),
    devtool: 'source-map',

    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        {
          test: /\.tsx?$/,
          use: ['babel-loader', 'awesome-typescript-loader'],
          exclude: [PATHS.nodeModules]
        },

        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader'
        },
      ]
    },
  }
]);


const config = (env: string): webpack.Configuration => {
  const chooseConfig = (mode: string) => {
    return (mode === 'production')
      ? productionConfig
      : developmentConfig;
  };

  return merge(commonConfig, chooseConfig(env));
};

export default config; // tslint:disable-line
