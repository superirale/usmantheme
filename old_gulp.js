// Include gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

var config = {
    nodeDir: './node_modules'
}


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  });
});

gulp.task('sass', function(cb) {

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
console.table(config.nodeDir)
gulp.task('compress', function (cb) {
  pump([
        gulp.src([
                config.nodeDir + '/jquery/dist/jquery.min.js',
                './app/scripts/script.js',
                config.nodeDir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js',
                ]),
        plumber(),
        uglify(),
        concat({ path: 'app.min.js', stat: { mode: 0666 }}),
        gulp.dest('app/js')
    ],
    cb
  );
});

gulp.task('watch', ['browserSync'], function (){
  gulp.watch(['app/script/*.js'], ['compress']);
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