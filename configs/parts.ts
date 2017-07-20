import * as webpack from 'webpack';

interface ServerOptions {
  host?: string;
  port?: number;
}

interface IncludeExclude {
  include?: string;
  exclude?: string;
}

const devServer = (params: ServerOptions = {}): object => ({
  // Enable history API fallback so HTML5 History API based
  // routing works. Good for complex setups.
  historyApiFallback: true,

  // Display only errors to reduce the amount of output.
  stats: 'errors-only',

  // Don't refresh if hot loading fails. Good while
  // implementing the client interface.
  hotOnly: true,

  // Parse host and port from env to allow customization.
  //
  // If you use Docker, Vagrant or Cloud9, set
  // host: options.host || '0.0.0.0';
  //
  // 0.0.0.0 is available to all network devices
  // unlike default `localhost`.
  host: params.host || 'localhost', // Defaults to `localhost`
  port: params.port || 8080, // Defaults to 8080
  // maybe, use polling instead of watching?

  // overlay with errors/warnings
  overlay: {
    errors: true,
    warnings: true,
  },
});

const lintTypeScript = (params: IncludeExclude = {}): webpack.Configuration => ({
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: params.include,
        exclude: params.exclude,
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
    ],
  },
});

export { devServer, lintTypeScript };
