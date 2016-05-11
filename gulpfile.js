'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var nano = require('gulp-cssnano');

gulp.task('sass', function() {
  return gulp.src('./assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
})

gulp.task('watch:sass', function() {
  gulp.watch('./assets/sass/**/*.scss', ['sass']);
});
