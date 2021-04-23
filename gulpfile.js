// Include gulp
var { dest, series, src, watch } = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

var config = {
    nodeDir: './node_modules'
}
function browserSyncServe(cb){
    browserSync.init({
      server: {
        baseDir: './app'
      }    
    });
    cb();
  }

function browserSyncReload(cb){
    browserSync.reload();
    cb();
}

function scssTask(cb) {

    pump([
      src(['app/scss/**/*.scss', 'app/scss/*.scss']),
      plumber(),
      sass(),
      dest('app/css'),
      browserSync.reload({
        stream: true
      })
      ], cb);
  }
  function compressTask(cb) {
    pump([
          src([
                  config.nodeDir + '/jquery/dist/jquery.min.js',
                  './app/scripts/script.js',
                  config.nodeDir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js',
                  ]),
          plumber(),
          uglify(),
          concat({ path: 'app.min.js', stat: { mode: 0666 }}),
          dest('app/js')
      ],
      cb
    );
  }




// gulp.task('default', gulp.series('sass', 'compress', 'browserSync'))

//   gulp.task('watch', gulp.series('browserSync', (done) => {

//     // compress changes
//     gulp.watch(['app/script/*.js'], gulp.series('compress'));
  
//     // CSS changes
//     gulp.watch(['app/scss/**/*.scss', 'app/scss/*.scss'], gulp.series('sass'));

//     gulp.watch(['app/scss/**/*.scss', 'app/scss/*.scss', 'app/*.html']).on('change', browserSync.reload);
  
//     done();
  
//   }));

function watchTask(){
    watch('app/*.html', browserSyncReload);
    watch([
        'app/script/*.js', 
        'app/scss/**/*.scss', 
        'app/scss/*.scss', 
        'app/scss/**/*.scss', 
        'app/scss/*.scss'
    ], series(scssTask, compressTask, browserSyncReload));
}

// Default Gulp Task
exports.default = series(
    scssTask,
    compressTask,
    browserSyncServe,
    watchTask
  );