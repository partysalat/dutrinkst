var gulp = require("gulp");
require("require-dir")("./gulp");

gulp.task("serve",["_serve"]);
gulp.task("watch",["_watch"]);