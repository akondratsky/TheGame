const gulp = require('gulp');
const inject = require('gulp-inject-string');
const remove = require('gulp-remove-content');
const rename = require('gulp-rename');
const merge = require('merge-stream');
const fs = require('fs');

const { generateLevel } = require('./logic/generateLevel');
const { generateLevelHtml } = require('./generateLevelHtml');

/**
 * @typedef {Object} Level
 * @property {string} levelName
 * @property {number} size
 * @property {number} cohesion
 * @property {number} steps
 */

/**
 * @param {Level} params
 */
const createGenerateLevelTask = ({ levelName, size, cohesion, steps }) => () => {
  if (!Number.isInteger(+size)
    || (size < 2)
    || (!Number.isInteger(+cohesion))
    || (cohesion >= size * size)
    || (!Number.isInteger(+steps))
    || (steps < 0)) {
      console.error(
        '\n\n  Use "--size=x --cohesion=y --steps=z" arguments, where "x" is number of cells ' +
        'on side of square field, "x" >= 2. "y" is maximum cohesion for cell and "z" is number of ' +
        ' steps to win \n\n'
      );
      throw new Error('Invalid arguments');
  }

  const level = generateLevel(size, cohesion, steps)
  const { inputs, labels, variables } = generateLevelHtml(level, size);
  const cssLink = `<link rel="stylesheet" href="${levelName}.css">`;

  const generateHtmlTask = gulp.src('src/level.html')
    .pipe(inject.replace('<!--GENERATE-INPUTS:-->', inputs))
    .pipe(inject.replace('<!--GENERATE-LABELS:-->', labels))
    .pipe(inject.replace('<!--GENERATE-LEVEL-NAME:-->', levelName))
    .pipe(inject.replace('<!--GENERATE-CSS-LINK:-->', cssLink))
    .pipe(rename(`${levelName}.html`))
    .pipe(gulp.dest('dist'));

  if (!fs.existsSync('_level-map.scss')) {
    fs.writeFileSync('_level-map.scss', '', 'utf-8');
  }

  const generateLevelMapTask = gulp.src('_level-map.scss')
    .pipe(remove({ match: /[\s\S]+/ }))
    .pipe(inject.append(variables))
    .pipe(gulp.dest('.'));

  return merge(
    generateHtmlTask,
    generateLevelMapTask
  );
};

module.exports = {
  createGenerateLevelTask,
};