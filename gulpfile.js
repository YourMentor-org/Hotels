// в этой секции подключаем все необходимые плагины
var gulp = require('gulp'),  
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

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
