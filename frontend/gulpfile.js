var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var connect = require('gulp-connect');

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src',
  'bower_components/font-awesome/scss'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'))
      .pipe(connect.reload());
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});
gulp.task('default', ['sass'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});

gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  })
});

gulp.task('serve', ['watch', 'connect']);