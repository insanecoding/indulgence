import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as OpenBrowserPlugin from 'open-browser-webpack-plugin';
import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import { devServer } from './devServer';

const PATHS = {
  app: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../build'),
  nodeModules: path.join(__dirname, '../node_modules'),
};

const commonConfig: webpack.Configuration = {
  entry:   [
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
};

const productionConfig = (): webpack.Configuration => commonConfig;

const developmentConfig = (): webpack.Configuration => {
  const cfg: webpack.Configuration = {
    devServer,
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

        {
          test: /\.tsx?$/,
          enforce: 'pre',
          loader: 'tslint-loader',
          options: {
            // tslint errors are displayed by default as warnings
            // set emitErrors to true to display them as errors
            emitErrors: true,
            // tslint does not interrupt the compilation by default
            // if you want any file with tslint errors to fail
            // set failOnHint to true
            failOnHint: true,
          }
        }
      ]
    },
  };

  return { ...commonConfig, ...cfg };
};


const config = (env: string): webpack.Configuration => {
  if (env === 'production') {
    return productionConfig();
  }

  return developmentConfig();
};

export default config; // tslint:disable-line
