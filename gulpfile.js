const gulp = require('gulp');
const { createGenerateLevelTask } = require('./utils/createGenerateLevelTask');
const { createCssTask } = require('./utils/createCssTask');
const { createGenerateIndexTask } = require('./utils/createGenerateIndexTask');
const { cleanTask } = require('./utils/cleanTask');
const { createIndexCssTask } = require('./utils/createIndexCssTask');

/**
 * @type {import('./utils/createGenerateLevelTask').Level[]}
 */
const levels = [
  // easy
  {
    levelName: '1 (easy)',
    size: 3,
    cohesion: 2,
    steps: 3,
  },
  {
    levelName: '2 (easy)',
    size: 3,
    cohesion: 2,
    steps: 5,
  },
  {
    levelName: '3 (easy)',
    size: 3,
    cohesion: 3,
    steps: 5,
  },
  {
    levelName: '4 (normal)',
    size: 5,
    cohesion: 4,
    steps: 7,
  },
  {
    levelName: '5 (normal)',
    size: 5,
    cohesion: 4,
    steps: 9,
  },
  {
    levelName: '6 (normal)',
    size: 5,
    cohesion: 5,
    steps: 11,
  },
  {
    levelName: '7 (hard)',
    size: 7,
    cohesion: 5,
    steps: 15,
  },
  {
    levelName: '8 (hard)',
    size: 7,
    cohesion: 6,
    steps: 17,
  },
  {
    levelName: '9 (hard)',
    size: 7,
    cohesion: 6,
    steps: 20,
  },
  {
    levelName: '10 (calc overload - level does not work)',
    size: 8,
    cohesion: 3,
    steps: 1,
  },
];

const indexFileTask = gulp.series(
  createGenerateIndexTask(levels),
  createIndexCssTask(),
);

const copyStaticTask = () => gulp.src(['favicon.png', 'img.png'])
  .pipe(gulp.dest('dist'));

gulp.task('build', gulp.series(
  cleanTask,
  ...levels.map((level) => gulp.series(
    createGenerateLevelTask(level),
    createCssTask(level.levelName),
  )),
  indexFileTask,
  copyStaticTask,
));
