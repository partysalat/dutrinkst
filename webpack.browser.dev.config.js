const
  path = require('path'),
  webpack = require('webpack'),
  mkdirp = require("mkdirp"),
  bootstrap = require("bootstrap-styl"),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: './lib/browser/main.jsx'
  },
  output: {
    filename: 'bundle-[hash].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin("styles-[hash].css"),
    function () {
      this.plugin("done", function (stats) {
        mkdirp.sync(path.join(__dirname, "target"));
        require("fs").writeFileSync(
          path.join(__dirname, "target", "rev-manifest.json"),
          JSON.stringify(stats.toJson().assetsByChunkName));
      });
    }

  ],
  stylus: {
    use: [bootstrap()]
  },
  module: {
    loaders: [
      {
        test: /\.styl/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader")
      },

      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  }
};
