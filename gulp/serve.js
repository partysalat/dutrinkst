var gulp = require("gulp"),
  serve = require("gulp-serve");

gulp.task('_serve',serve({
  root:["./targets/assets"],
  port:9211
}));

