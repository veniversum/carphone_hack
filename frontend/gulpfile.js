var gulp = require("gulp");
var concat = require("gulp-concat");
var sass = require('gulp-sass');

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
        .pipe(gulp.dest('./build/js/'));
});

gulp.task("copy", function() {
    gulp.src('./dev/html/**/*.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('build', ['js', 'copy']);

gulp.task('watch', function() {
    gulp.watch(jsSources, ['js']);
    gulp.watch('./dev/html/**/*.html', ['copy']);
    gulp.watch('./dev/sass/**/*.scss', ['sass']);
});

gulp.task('sass', function() {
    return gulp.src('./dev/sass/stylesheet.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(concat('stylesheet.css'))
        .pipe(gulp.dest('./build/css'));
});