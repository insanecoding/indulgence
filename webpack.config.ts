import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
};

const nodeModules = path.resolve(__dirname, 'node_modules');

const config: webpack.Configuration = {
  entry: PATHS.app,
  output: {
    filename: 'bundle.js',
    path: PATHS.build
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    inline: true,
  },
  devtool: 'source-map',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [PATHS.app, 'node_modules'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Required
      inject: false,
      template: '!!pug-loader!./public/index.pug'
    })
  ],
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
        exclude: [nodeModules]
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  }
};

export default config; // tslint:disable-line
