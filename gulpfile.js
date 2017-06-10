var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var minifyIMG = require('gulp-imagemin');
var prefix = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

//minify all javascript files.
gulp.task('scripts', function(){
  gulp.src('src/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('production/js'))
  .pipe(browserSync.reload({stream: true}));
});
//minify all images.
gulp.task('minIMG', function(){
  gulp.src('src/images/*')
  .pipe(minifyIMG())
  .pipe(gulp.dest('production/images'));
});
//convert scss to css and prefix,minify.
gulp.task('styles', function(){
  gulp.src('src/scss/*.scss')
  .pipe(sass())
  .on('error', console.error.bind(console))
  .pipe(prefix('last 2 versions'))
  .pipe(cleanCSS({compatibility: 'ie9'}))
  .pipe(gulp.dest('production/css'))
  .pipe(browserSync.reload({stream: true}));
});
//copyHTML
gulp.task('copyHTML', function(){
  gulp.src('src/*.html')
  .pipe(gulp.dest('production'));
});
//watch task
gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: 'production/'
    }
  });
gulp.watch('src/scss/*.scss', ['styles']);
gulp.watch('src/js/*.js', ['scripts']);
gulp.watch('src/*.html', ['copyHTML']);
gulp.watch('src/*.html').on('change', browserSync.reload);
});

//default task
gulp.task('default', ['scripts', 'minIMG', 'styles', 'copyHTML', 'serve']);
