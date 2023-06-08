const gulp = require('gulp');
const inject = require('gulp-inject-string');

/**
 * @param {import('./createGenerateLevelTask').Level[]} levels 
 */
const createGenerateIndexTask = (levels) => () => {
  const links = levels.reduce((str, { levelName }) => {
    return str + `<div class="list-item"><a class="link" href="${levelName}.html">Level ${levelName}</a></div>\n`
  }, '\n');

  const generateHtmlTask = gulp.src('src/index.html')
    .pipe(inject.replace('<!--GENERATE-LEVEL-LINKS:-->', links))
    .pipe(gulp.dest('dist'));

  return generateHtmlTask;
};

module.exports = {
  createGenerateIndexTask,
};
