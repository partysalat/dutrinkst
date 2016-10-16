'use strict';

var gulp = require("gulp");
var bs = require("browser-sync"),
  webpack = require("webpack"),
  _ = require("lodash"),
  gulpWebpack = require("webpack-stream");
var webpackRawConfig = require('./../webpack.client.config.js');

gulp.task('_scripts:watch', function () {
  let webpackConfig = _.assign({}, webpackRawConfig, {
    watch: true
  });
  compile(webpackConfig, bs.reload);
});

gulp.task('_scripts:dev', function () {
  return compile(webpackRawConfig, _.noop);
});

gulp.task('_scripts', function () {
  let webpackConfig = _.cloneDeep(webpackRawConfig)
  webpackConfig.plugins = webpackConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        drop_debugger: true
      }
    })
  );
  return compile(webpackConfig);
});

function compile(webpackConfig, callback) {
  return gulp.src("I_DOnT_EXisST")
    .pipe(gulpWebpack(webpackConfig, webpack, callback || _.noop))
    .on("error",console.error)
    .pipe(gulp.dest('target/assets'));
}