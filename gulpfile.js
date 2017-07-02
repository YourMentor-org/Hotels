// в этой секции подключаем все необходимые плагины
var gulp = require('gulp'),  
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin');

// здесь вызываем необходимую задачу
gulp.task('scripts', function () {  
    gulp.src('js/main.js')
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
// Можно ли так поставить одну задачу, что бы одновременно картинки из корневой папки img минифицировлись и складывались в build/img, а иконки из img/icons, соответственно в build/img/icons? Или только делить на две задачи, как у меня?
gulp.task('icons', () =>
	gulp.src('img/icons/*')
		.pipe(imagemin())
		.pipe(gulp.dest('build/img/icons'))
);