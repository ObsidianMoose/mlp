var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var gulpConcat = require('gulp-concat');
var clean = require('gulp-clean');
var async = require('async');
var runSequence = require('run-sequence').use(gulp);


gulp.runSync = function (tasks, cb) {
  var sync = tasks.map(function (t) {
    if (Array.isArray(t)) {
      return gulp.run.bind.apply(gulp.run, [gulp].concat(t));
    }
    return gulp.run.bind(gulp, t);
  });
  async.series(sync, cb);
  return gulp;
};

gulp.task('sass', function () {
  return gulp.src('./client/scss/*.scss')
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('./client/dist'));
});

gulp.task('js', function () {
  gulp.src([
      // angular-file-upload-shim.min.js must be place before angular.min.js
      './client/lib/lodash/dist/lodash.min.js',
      './client/lib/ng-file-upload/angular-file-upload-shim.min.js',
      './client/lib/moment/min/moment.min.js',
      './client/lib/angular/angular.min.js',
      './client/lib/ng-file-upload/angular-file-upload.min.js',
      './client/lib/angular-momentjs/angular-momentjs.js',
      './client/lib/angular-ui-router/release/angular-ui-router.min.js',
      './client/lib/ngFx/dist/ngFx.js',
      './client/app/app.js',
      './client/app/loading/loading.js',
      './client/app/logIn/logIn.js',
      './client/app/signUp/signUp.js',
      './client/app/photo/photo.js',
      './client/app/prompts/create_prompt.js',
      './client/app/prompts/prompts.js',
      './client/app/prompts/prompt.js',
      './client/app/suggestions/suggestions.js',
      './client/app/suggestions/suggestions_prompts.js',
      './client/app/services/services.js'
    ])
    .pipe(gulpConcat('main.js'))
    // .pipe(uglify()) // Takes a long time
    .pipe(gulp.dest('./client/dist/'));
});



gulp.task('cordova-build', function () {
  gulp.src(['./client/**/*'])
    .pipe(gulp.dest('./cordova/www/'));
});

gulp.task('cordova-clean', function () {
  return gulp.src('./cordova/www/')
    .pipe(clean({
      force: true
    }));
});

gulp.task('default', ['js', 'sass']);
gulp.task('cordova', function (cb) {
  return runSequence('cordova-clean', 'cordova-build', cb);
});

gulp.task('watch', ['js', 'sass'], function () {
  gulp.watch('./client/scss/**/*.scss', ['sass']);
  gulp.watch('./client/**/*.js', ['js']);
});

gulp.task('cordova-watch', ['js', 'sass', 'cordova'], function () {
  gulp.watch('./client/scss/**/*.scss', function () {
    return runSequence('sass', 'cordova');
  });
  gulp.watch('./client/**/*.js', function () {
    return runSequence('js', 'cordova');
  });
});