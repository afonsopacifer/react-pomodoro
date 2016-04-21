// Modules :)
// ===========================================
var gulp     = require('gulp'),
    babel    = require('gulp-babel'),
    connect  = require('gulp-connect');

// Babel
// ===========================================
gulp.task('babel', () => {
  gulp.src('app.js')
    .pipe(babel({
      presets: ['es2015']
     }))
    .pipe(gulp.dest('assets/scripts/'))
    .pipe(connect.reload());
});

// Watch
// ===========================================
gulp.task('watch', () => {
  gulp.watch(['app.js'], ['babel']);
});

// Static server
// ===========================================
gulp.task('connect', () => {
  connect.server({
    root: '',
    livereload: true
  });
});

// More Tasks
// ===========================================
gulp.task('serve', ['connect', 'watch']);
gulp.task('build', ['babel']);
