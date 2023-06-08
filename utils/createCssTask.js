const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

/**
 * @param {string} levelName 
 */
const createCssTask = (levelName) => {
  return () => gulp.src('src/scss/level.scss')
    .pipe(sass())
    .pipe(concat(`${levelName}.css`))
    .pipe(gulp.dest('dist'));
};

module.exports = {
  createCssTask,
};
