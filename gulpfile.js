'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var nano = require('gulp-cssnano');
var prefix = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var runSeq = require('run-sequence');
var imagemin = require('gulp-imagemin');


gulp.task('bs', function() {
  return gulp.src('./assets/bs/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('sass', function() {
  return gulp.src('./assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('css', function() {
  return gulp.src('./assets/css/*.css')
    .pipe(concat('all.css'))
    .pipe(prefix())
    .pipe(gulp.dest('./assets/dist'));
});

gulp.task('js', function() {
  return gulp.src(['./assets/js/material.min.js', './assets/js/material-kit.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./assets/dist'));
});

gulp.task('img', function() {
  return gulp.src('./assets/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./assets/img'));
});

gulp.task('html', function() {
  return gulp.src('index.dev.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'));
});

gulp.task('watch:sass', function() {
  gulp.watch('./assets/sass/**/*.scss', ['sass']);
});

gulp.task('dist', function() {
  gulp.src('./assets/dist/all.js')
    .pipe(uglify())
    .pipe(gulp.dest('./assets/dist'));

  gulp.src('./assets/dist/all.css')
    .pipe(nano())
    .pipe(gulp.dest('./assets/dist'));
})

gulp.task('build', function() {
  runSeq(['bs', 'sass', 'html'], ['css', 'js'], 'dist');
});
