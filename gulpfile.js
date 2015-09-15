/////////////////////////////////////////////
// Variables
/////////////////////////////////////////////
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var src = {
    scss: 'app/scss/*.scss',
    css:  'app/css',
    html: 'app/*.html',
    js: 'app/*.js'
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
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(reload({stream: true}));
});

gulp.task('reload', ['sass'], function() {
  browserSync({
      server: {
        baseDir: 'app'
      }
  });
  gulp.watch(src.scss, ['sass']);
  gulp.watch(src.html).on('change', reload);
  gulp.watch(src.js).on('change', reload);
});
