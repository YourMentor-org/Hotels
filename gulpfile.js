var gulp = require('gulp'),  
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    svg2png = require('gulp-svg2png'),
    svgmin = require('gulp-svgmin'),
    pug = require('gulp-pug');

gulp.task('scripts', function () {  
    gulp.src('js/flexibility.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
        
});
gulp.task('styles', function() {
  return gulp.src('css/*.css')
    .pipe(concat('out.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('image', () =>
	gulp.src('img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('build/img'))
);

gulp.task('svgpng', function () {
    gulp.src('img/icons/**/*.svg')
        .pipe(svg2png())
        .pipe(gulp.dest('build/img/icons'));
});
gulp.task('minify', function () {
    return gulp.src('search1.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('build'));
});
gulp.task('templates', function buildHTML() {  
    return gulp.src('./templates/pages/*.pug') // возьми все файлы по этому адресу  
        .pipe(pug({
            pretty: true // в объекте указываются дополнительные настройки для pug; в данном случае говорим "сделай html-файл красивым, с отступами"
        }).on('error', function(error) {
            console.log(error); // если нашел ошибку при компиляции, покажи ее
        }))
        .pipe(gulp.dest('build')); // положи результат в эту папку
});
gulp.task('default', ['scripts', 'styles', 'image', 'svgpng', 'minify']);