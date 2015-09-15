/////////////////////////////////////////////
// Variables
/////////////////////////////////////////////
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var gulpIf = require('gulp-if');
var reload = browserSync.reload;
var src = {
    scss: 'src/scss/*.scss',
    css:  'src/css',
    html: 'src/*.html',
    js: 'src/js/*.js'
};
/////////////////////////////////////////////
// Basic structure of a Gulp task
/////////////////////////////////////////////
// gulp.task('task-name', function() {
//   // Stuff here
// });
//
// gulp.task('prepo', function(){
//   return gulp.src('source-files')
//     .pipe(sass()) // Using gulp-sass
//     .pipe(gulp.dest('destination'));
// });
//
// gulp.watch('files-to-watch', ['tasks', 'to', 'run']);
/////////////////////////////////////////////
// Starts here
/////////////////////////////////////////////
gulp.task('hello', function() {
  console.log('Hello world');
});

gulp.task('sass', function(){
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(reload({stream: true}));
});

gulp.task('reload', ['sass'], function() {
  browserSync({
      server: {
        baseDir: 'src'
      }
  });
  gulp.watch(src.scss, ['sass']);
  gulp.watch(src.html).on('change', reload);
  gulp.watch(src.js).on('change', reload);
});

gulp.task('useref', function(){
  var assets = useref.assets();

  return gulp.src('src/*.html')
    .pipe(assets)
    .pipe(gulpIf('*.css', minifyCss()))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});
