/* 
 * The MIT License
 *
 * Copyright 2017 Marius Runde.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

// -----------------------------------------------------------------------------
// Imports
// -----------------------------------------------------------------------------

// Required modules
const babelify = require('babelify');
const browserify = require('browserify');
const gulp = require('gulp');
const clean = require('gulp-clean');
const concatCss = require('gulp-concat-css');
const source = require('vinyl-source-stream');

// -----------------------------------------------------------------------------
// Gulp Tasks
// -----------------------------------------------------------------------------

// Clean the dist directory
gulp.task('clean', function() {
  return gulp.src('dist', { read: false })
      .pipe(clean());
});

// Copy the HTML file into the dist directory
gulp.task('copy_html', ['clean'], function() {
  return gulp.src(['src/index.html'])
      .pipe(gulp.dest('dist'));
});

// Bundle the CSS files
gulp.task('bundle_css', ['copy_html'], function() {
  return gulp.src('src/**/*.css')
      .pipe(concatCss('bundle.css'))
      .pipe(gulp.dest('dist'));
});

// Copy the bower components into the dist/lib directory
gulp.task('copy_bower_components', ['bundle_css'], function() {
  return gulp.src(['bower_components/**/*'])
      .pipe(gulp.dest('dist/lib'));
});

// Bundle the JSX components
gulp.task('bundle_jsx', ['copy_bower_components'], function() {
  return browserify({
    entries: 'src/main.jsx',
    extensions: ['.jsx'],
    debug: true
  })
      .transform('babelify', { presets: ['es2015', 'react'] })
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('dist'));
});

// Default gulp task to start the toolchain
gulp.task('default', ['bundle_jsx']);

// -----------------------------------------------------------------------------
// Gulp Tasks without Dependencies
// -----------------------------------------------------------------------------

// Update the CSS file in the dist directory
gulp.task('update_style', function() {
  return gulp.src('src/**/*.css')
      .pipe(concatCss('bundle.css'))
      .pipe(gulp.dest('dist'));
});
