var gulp = require("gulp"),
  ava = require("gulp-ava");

gulp.task('_unit:browser',()=>{
  return gulp.src("./test/browser/**/*.spec.js")
    .pipe(ava(require("./../test/browser/ava.json")))
});

