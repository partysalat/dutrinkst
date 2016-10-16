var
  gulp = require("gulp"),
  awspublish = require('gulp-awspublish'),
  rename = require("gulp-rename");

gulp.task('_aws:deploy',function(){

  var publisher = awspublish.create({
    region: 'eu-west-1',
    params: {
      Bucket: 'dutrinkst',
      ACL: 'public-read'
    }
  }, {
    cacheFileName: './deploy-cache'
  });
  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  return gulp.src("./target/assets/**/*")
    .pipe(rename(function (path) {
      path.dirname += '/assets';
    }))
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());
});

