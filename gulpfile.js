var gulp = require('gulp'),  
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    svg2png = require('gulp-svg2png'),
    svgmin = require('gulp-svgmin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create(),
    environments = require('gulp-environments');

var dev = environments.development;
var prod = environments.production;

gulp.task('scripts', function () {
    return gulp.src('js/*.js')
        .pipe(prod(concat('main.min.js')))
        .pipe(prod(uglify()))
        .pipe(gulp.dest('build/js'));
});

gulp.task('styles', function () {
    gulp.src('css/*.css')
        .pipe(prod(autoprefixer({
          browsers: ["last 2 versions"]
        })))
        .pipe(gulp.dest("build/css"))
        .pipe(prod(cssnano()))
        .pipe(prod(concat('style.css')))
        .pipe(prod(rename('style.min.css')))
        .pipe(gulp.dest('build/css'));
});

gulp.task('lint-css', function lintCssTask() {
    const gulpStylelint = require('gulp-stylelint');

    return gulp
        .src('css/*.css')
        .pipe(dev(gulpStylelint({
            reporters: [
                {formatter: 'string', console: true}
            ]
        })));
});

gulp.task('image', function () {
	  return gulp.src('img/*')
    		.pipe(prod(imagemin()))
    		.pipe(gulp.dest('build/img'));
});

gulp.task('minify', function () {
    return gulp.src('img/icons/*.svg')
        .pipe(prod(svgmin()))
        .pipe(gulp.dest('build/img/icons'))
});

gulp.task('templates', function buildHTML() {
    return gulp.src('./templates/pages/*.pug')
        .pipe(prod(pug({
            pretty: true 
        }).on('error', function(error) {
            console.log(error);
        })))
        .pipe(gulp.dest('build'));
});

gulp.task('html', function() {
    gulp.src('./*.html')
        .pipe(prod(gulp.dest('build/')))
});

gulp.task('clean', function () {
    return gulp.src('build/', {read: false})
        .pipe(dev(clean()));
});

gulp.task('browser-sync', function() {
    return browserSync.init(dev({
        server: {
            baseDir: './build/'
        },
        port: 3003,
        host: 'localhost',
        logPrefix: 'frontend',
        open: false
    }));
});

gulp.task('default', ['clean'], function() {
    gulp.run('scripts');
    gulp.run('styles');
    gulp.run('image');
    gulp.run('minify');
    gulp.run('html');
    gulp.run('browser-sync');
});

gulp.task('watch', function() {
    gulp.watch('./js/*.js', ['scripts']);
    gulp.watch('./css/*.css', ['styles']);
    gulp.watch('./img/*', ['image']);
    gulp.watch('./img/icons/*.svg', ['minify']);
    gulp.watch('./*.html', ['html']);
});