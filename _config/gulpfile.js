'use strict';
// Include Plugins
const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const mergeStream = require('merge-stream');
const browserSync = require('browser-sync').create();
const config = require('./config.json');

// Compile Sass
gulp.task('sass', function() {
   return gulp
      .src(config.css.pathSrc)
      .pipe(sourcemaps.init())
      .pipe(
         sass({
            outputStyle: 'expanded',
            errLogToConsole: true,
         }).on('error', sass.logError)
      )
      .pipe(sourcemaps.write(config.css.pathDestMaps))
      .pipe(gulp.dest(config.css.pathDest))
      .pipe(browserSync.stream());
});

// Minify & PostCSS
gulp.task('css', function() {
   return gulp
      .src(config.css.pathSrcForMinify)
      .pipe(
         postcss([
            autoprefixer(),
            cssnano(),
         ])
      )
      .pipe(
         rename({
            suffix: '.min',
         })
      )
      .pipe(gulp.dest(config.css.pathDest));
});

// Watch Files For Changes
gulp.task('watch', function() {
   browserSync.init({
      proxy: config.settings.host,
   });
   gulp.watch(
      '../src/scss/**/*.scss',
      gulp.series('sass')
   );
   gulp.watch('../*.html').on('change', browserSync.reload);
});

// Default task
gulp.task(
   'default',
   gulp.series(
      'sass',
      'css',
      'watch'
   )
);
