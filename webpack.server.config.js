var
  webpack = require('webpack'),
  nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './lib/server/handlers/indexHandler.js',
  // output: provided by serverless
  target: 'node',
  externals: [
    'aws-sdk',
    nodeExternals()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  // devtool: 'source-map',
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        drop_debugger: true
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json?$/,
        loader: 'json'
      },
      {
        test: /\.styl/,
        loader: "ignore-loader"
      }
    ]
  }
};