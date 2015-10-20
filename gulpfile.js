var gulp = require('gulp');
var elm  = require('gulp-elm');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var nodemon = require('nodemon');
 
gulp.task('elm-init', elm.init);
 
gulp.task('elm', ['elm-init'], function(){
  return gulp.src('src/ui/*.elm')
    .pipe(plumber())
    .pipe(elm())
    .pipe(gulp.dest('dist/'))
    .pipe(livereload());
});

gulp.task('default',['elm', 'watch']);

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('src/ui/*.elm',['elm']);
  nodemon({
    script: 'src/index.js',
    stdout: false
  }).on('readable', function() {
    this.stdout.on('data', function(chunk) {
      if (/^listening/.test(chunk)) {
        livereload.reload();
      }
      process.stdout.write(chunk);
    });
  });
});
