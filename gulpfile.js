'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var nano = require('gulp-cssnano');
var purify = require('gulp-purifycss');
var uncss = require('gulp-uncss');

gulp.task('bs', function() {
  return gulp.src('./assets/bs/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('sass', function() {
  return gulp.src('./assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
})

gulp.task('css', function() {
  return gulp.src('./assets/css/*.css')
    .pipe(concat('pure.css'))
    // .pipe(concat('main.css'))
    // .pipe(uncss({
    //   html: ['index.html'],
    //   javascript: ['./assets/js/*.js']
    // }))
    .pipe(purify(['./assets/js/*.js', './index.html']))
    .pipe(gulp.dest('./assets/dist'));
});

gulp.task('watch:sass', function() {
  gulp.watch('./assets/sass/**/*.scss', ['sass']);
});
