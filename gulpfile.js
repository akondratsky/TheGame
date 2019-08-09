const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const inject = require('gulp-inject-string');
const remove = require('gulp-remove-content');
const merge = require('merge-stream');
const argv = require('yargs').argv;

const { generateStringsToInject, generateLevelMap } = require('./utils');

gulp.task('css', () => {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build'));
});

gulp.task('generate-level', () => {
  const { size = 7, cohesion = 6, steps = 42 } = argv;

  if (!Number.isInteger(+size)
    || (size < 2)
    || (!Number.isInteger(+cohesion))
    || (cohesion >= size * size)
    || (!Number.isInteger(+steps))
    || (steps < 0)) {
      console.log(
        '\n\n  Use "--size=x --cohesion=y --steps=z" arguments, where "x" is number of cells ' +
        'on side of square field, "x" >= 2. "y" is maximum cohesion for cell and "z" is number of ' +
        ' steps to win \n\n'
      );
      process.exit();
  }

  const { inputs, labels, variables } = generateStringsToInject(
    generateLevelMap(size, cohesion, steps),
  )

  const generateHtmlTask = gulp.src('src/index.html')
    .pipe(inject.after('<!--GENERATE-INPUTS:-->', inputs))
    .pipe(inject.after('<!--GENERATE-LABELS:-->', labels))
    .pipe(gulp.dest('build'));

  const generateLevelMapTask = gulp.src('src/scss/base/_level-map.scss')
    .pipe(remove({ match: /[\s\S]+/ }))
    .pipe(inject.append(variables))
    .pipe(gulp.dest('src/scss/base/'));

  return merge(
    generateHtmlTask,
    generateLevelMapTask
  );
});

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', ['css']);
});

gulp.task('new', gulp.series('generate-level', 'css'));



