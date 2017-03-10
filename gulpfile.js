const gulp = require('gulp'),
      del = require('del'),
      concat = require('gulp-concat'),
      usemin = require('gulp-usemin'),
      uglify = require('gulp-uglify'),
      imagemin = require('gulp-imagemin'),
      pngquant = require('imagemin-pngquant'),
      minifyHtml = require('gulp-minify-html'),
      rev = require('gulp-rev');  // 文件名加言(防缓存)
      // minifyCss = require('gulp-minify-css'),
    //   runSequence = require('run-sequence'),
// var $ = require('gulp-load-plugins')();

gulp.task('clean', del.bind(null, ['dist']));
gulp.task('dist', function() {
    return gulp.src([
        './**/*',
        '!gulpfile.js',
        '!package.json',
        '!README.md'
    ]).pipe(gulp.dest('./dist'));
});

gulp.task('autoprefixer', function () {
    const postcss      = require('gulp-postcss'),
          sourcemaps   = require('gulp-sourcemaps'),
          autoprefixer = require('autoprefixer');

    return gulp.src('./tx/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./tx/dist/css/'));
});

gulp.task('usemin', function() {
    return gulp.src('tx/index.html')
        .pipe(usemin({
            css: [minifyCss(), 'concat', rev()]
            //html: [minifyHtml({empty: true})],
            // js: [uglify(), rev()]
        }))
        .pipe(gulp.dest('tx/dist/'));
});

gulp.task('imagemin', function () {
    return gulp.src('tx/img/*.{png,jpg,jpeg,gif,webp,svg}')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('tx/dist/img/'));
});

gulp.task('clean:tx', del.bind(null, ['tx/dist']));


gulp.task('build:tx', ['clean:tx'], function(cb) {
    runSequence(
        ['usemin', 'imagemin'],
        cb);
});
