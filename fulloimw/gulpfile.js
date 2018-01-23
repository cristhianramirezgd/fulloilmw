var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
gp_concat = require('gulp-concat'),
gp_rename = require('gulp-rename'),
gp_uglify = require('gulp-uglify'),
minifyCSS = require('gulp-minify-css'), 
autoprefixer = require('gulp-autoprefixer'),
gp_sourcemaps = require('gulp-sourcemaps'),
sass = require('gulp-sass'),
watch = require('gulp-watch');

var sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/*.scss')
    .pipe(gp_sourcemaps.init())
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(minifyCSS())
    .pipe(gp_concat('app.min.css'))
    .pipe(gp_sourcemaps.write('./'))
    .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});
