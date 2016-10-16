var
  gulp = require("gulp"),
  awspublish = require('gulp-awspublish');

gulp.task('_aws:deploy',function(){

  var publisher = awspublish.create({
    region: 'eu-west-1',
    params: {
      Bucket: 'klavega.web.assets',
      ACL: 'public-read'
    }
  }, {
    cacheFileName: './deploy-cache'
  });
  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
    // ...
  };

  return gulp.src("./target/assets/**/*")
    //.pipe(awspublish.gzip({ ext: '.gz' }))
    .pipe(publisher.publish(headers))
    //.pipe(publisher.cache())

    // print upload updates to console 
    .pipe(awspublish.reporter());
});

