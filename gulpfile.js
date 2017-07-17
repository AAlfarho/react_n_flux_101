'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var browserify = require('browserify'); // Bundle JS
var reactify = require('reactify'); //transfor jsx to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with gulp
var concat = require('gulp-concat'); // concatenates files

var config = {
    port: process.env.PORT || 3000, 
    devBaseUrl: process.env.IP || "0.0.0.0",
    paths: {
        html: './src/*.html',
        js: '.src/**/*.js',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css '
            ],
        dist: './dist',
        mainJS: './src/main.js'
    }
}

gulp.task('connect', function() {
   connect.server({
       root: ['dist'],
       port: config.port,
       base: config.devBaseUrl,
       livereload: false
   }); 
});

gulp.task('open', ['connect'], function() {
    gulp.src('dist/index.html').pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function() {
    gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload())
});

gulp.task('js', function() {
    browserify(config.paths.mainJS)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(connect.reload());
});

gulp.task('css', function() {
   gulp.src(config.paths.css)
   .pipe(concat('bundle.css'))
   .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('watch', function() {
   gulp.watch(config.paths.html, ['html']);
   gulp.watch(config.paths.js, ['js']) 
});

gulp.task('default', ['html', 'js', 'css', 'open', 'watch']);