var
  webpack = require('webpack'),
  nodeExternals = require('webpack-node-externals')

module.exports = {
  // entry: provided by serverless
  entry: './handler.js',
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
      //'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      'process.env.NODE_ENV': 'production'
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
        exclude: /node_modules/,
        query: {
          presets: ['es2015','stage-2', 'react']
        }
      },
      {
        test: /\.json?$/,
        loader: 'json'
      }, {
        test: /\.pug?$/,
        loader: 'pug'
      },
      {
        test: /\.styl/,
        loader: "ignore-loader"
      }
    ]
  }
};