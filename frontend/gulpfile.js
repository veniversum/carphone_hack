var gulp = require("gulp");
var concat = require("gulp-concat");
var sass = require('gulp-sass');
var connect = require('gulp-connect');

var bowerSources = [
    "./bower_components/jquery/dist/jquery.js",
    "./bower_components/bootstrap-sass/assets/javascripts/bootstrap.js"
];

var sassSources = [
    './dev/sass/**/*.scss'];


var jsSources = './dev/js/**/*.js';

gulp.task("js", function() {
    var srcs = bowerSources.concat(jsSources);
    console.log(srcs);
    gulp.src(srcs)
        .pipe(concat("app.js"))
        .pipe(gulp.dest('./build/js/'))
        .pipe(connect.reload());
});

gulp.task("copy", function() {
    gulp.src('./dev/html/**/*.html')
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
});

gulp.task('build', ['js', 'copy', 'sass']);

gulp.task('watch', ['build' ],function() {
    gulp.watch(jsSources, ['js']);
    gulp.watch('./dev/html/**/*.html', ['copy']);
    gulp.watch('./dev/sass/**/*.scss', ['sass']);
});

gulp.task('sass', function() {
    return gulp.src('./dev/sass/stylesheet.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(concat('stylesheet.css'))
        .pipe(gulp.dest('./build/css'))
        .pipe(connect.reload());
});

gulp.task('serve', ['watch'], function() {
    connect.server({
        root: 'build',
        livereload: true
    });
});