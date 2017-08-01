var gulp = require('gulp'),  
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    svg2png = require('gulp-svg2png'),
    svgmin = require('gulp-svgmin'),
    pug = require('gulp-pug');

gulp.task('scripts', () => 
    gulp.src('js/flexibility.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
);

gulp.task('styles', () =>
  gulp.src('css/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build/css'))
);

gulp.task('image', () =>
	gulp.src('img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('build/img'))
);

gulp.task('svgpng', () =>
    gulp.src('img/icons/**/*.svg')
        .pipe(svg2png())
        .pipe(gulp.dest('build/img/icons'))
);

gulp.task('minify', () =>
    gulp.src('search1.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('build'))
);
gulp.task('templates', () =>
    gulp.src('./templates/pages/*.pug')
        .pipe(pug({
            pretty: true
        }).on('error', function(error) {
            console.log(error);
        }))
        .pipe(gulp.dest('build'))
);

gulp.task('watch', () =>
    gulp.watch('./templates/*.pug', ['templates'])
);

gulp.task('scripts', () =>
    gulp.src('js/flexibility.js')
       .pipe(uglify())
       .pipe(concat('style.css'))
       .pipe(imagemin())
       .pipe(gulp.dest('build'))
);
gulp.task('build', ['scripts', 'styles', 'image', 'svgpng', 'minify']);

gulp.task('default', ['scripts', 'styles', 'image', 'svgpng', 'minify']);