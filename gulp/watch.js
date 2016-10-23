var gulp = require("gulp");
var path = require("path");
var bs = require("browser-sync");

gulp.task('_watch', ["_start:bs",'_scripts:watch'], function () {
  gulp.watch(path.resolve(__dirname + "/../handler.js"), ["_reload"]);
  gulp.watch(path.resolve(__dirname + "/../lib/server/**/*"), ["_reload"]);
});

gulp.task("_reload", function () {
  console.log("Reload browser-sync");
  bs.reload();
});

gulp.task("_start:bs", function () {
  bs({
    proxy: "http://localhost:2999",
    open: false
  });
});
