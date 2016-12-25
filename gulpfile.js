// Include gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  });
});

gulp.task('sass', function(cb) {
//   return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
//     .pipe(sass())
//     .pipe(gulp.dest('app/css'))
//     .pipe(browserSync.reload({
//       stream: true
//     }));
// }
  pump([
    gulp.src(['app/scss/**/*.scss', 'app/scss/*.scss']),
    plumber(),
    sass(),
    gulp.dest('app/css'),
    browserSync.reload({
      stream: true
    })
    ], cb);
});

gulp.task('watch', ['browserSync'], function (){
  gulp.watch(['app/scss/**/*.scss', 'app/scss/*.scss'], ['sass']);
  gulp.watch(['app/scss/**/*.scss', 'app/scss/*.scss', 'app/*.html']).on('change', browserSync.reload);
});

// gulp.task('default', function(cb){
//   pump([
//         gulp.src(['app/scss/style.scss']),
//           plumber(),
//           sass({outputStyle: 'compressed'}),
//           gulp.dest('dist/stylesheet')
//       ], cb);
// });