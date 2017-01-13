var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: ".",
        index: "player.html"
    });

    gulp.watch("**/scss/*.scss", ['sass']);
    // gulp.watch("**/*.html").on('change', browserSync.reload);
    gulp.watch(["player.html","js/**/*.js"]).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("styles/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("styles/css"))
        .pipe(browserSync.stream());
});

// gulp.task('jasmine', function() {
//   var filesForTest = ['js/**/*.js', 'test/spec/**/*.js']
//   return gulp.src(filesForTest)
//     .pipe(watch(filesForTest))
//     .pipe(jasmineBrowser.specRunner())
//     .pipe(jasmineBrowser.server({port: 8888}));
// });

gulp.task('default', ['serve']);
