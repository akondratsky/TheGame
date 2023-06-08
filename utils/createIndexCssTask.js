const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

const createIndexCssTask = () => {
  return () => gulp.src('src/scss/styles.scss')
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('dist'));
};

module.exports = {
  createIndexCssTask,
};
