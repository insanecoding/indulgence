import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
  nodeModules: path.join(__dirname, 'node_modules'),
};

const commonConfig: webpack.Configuration = {
  entry: PATHS.app,
  output: {
    filename: 'bundle.js',
    path: PATHS.build
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Required
      inject: false,
      template: '!!pug-loader!./public/index.pug'
    })
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
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. Good for complex setups.
      historyApiFallback: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env to allow customization.
      //
      // If you use Docker, Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: process.env.HOST, // Defaults to `localhost`
      port: process.env.PORT, // Defaults to 8080
    },
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