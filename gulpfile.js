/*
	gulpfile.js
	===========
	Rather than manage one giant configuration file responsible
	for creating multiple tasks, each task has been broken out into
	its own file in gulp/tasks. Any file in that folder gets automatically
	required by the loop in ./gulp/index.js (required below).

	To add a new task, simply add a new task file to gulp/tasks.
*/

const gulp = require('gulp');
const gutil = require('gulp-util');
const mustache = require('gulp-mustache');
const rename  = require('gulp-rename');
// const replace  = require('gulp-replace');

const COMPONENTS_SRC_PATH = 'src/components';

gulp.task('default', () =>
  console.log('Yeap, gulp works')
);

function partialFactory (cName) {
  return {
    cName: cName,
  };
}

gulp.task('cc', () => {
  if (gutil.env.name) {
    const cName = gutil.env.name;
    const newName = function (path) {
      path.basename = path.basename.replace("component", cName);
    }

    gulp.src(['templates/component/component.js'])
      .pipe(mustache(partialFactory(cName)))
      .pipe(rename(newName))
      .pipe(gulp.dest(COMPONENTS_SRC_PATH + '/' + cName + '/'));
    gulp.src(['templates/component/component.scss'])
      .pipe(mustache(partialFactory(cName)))
      .pipe(rename(newName))
      .pipe(gulp.dest(COMPONENTS_SRC_PATH + '/' + cName + '/'));
    gulp.src(['templates/component/component.css'])
      .pipe(mustache(partialFactory(cName)))
      .pipe(rename(newName))
      .pipe(gulp.dest(COMPONENTS_SRC_PATH + '/' + cName + '/'));
  }
});

gulp.task('sc', () => {
  if (gutil.env.name) {
    const cName = gutil.env.name;
    const newName = function (path) {
      path.basename = path.basename.replace("statelessComponent", cName);
    }

    gulp.src(['templates/statelessComponent/statelessComponent.js'])
      .pipe(mustache(partialFactory(cName)))
      .pipe(rename(newName))
      .pipe(gulp.dest(COMPONENTS_SRC_PATH + '/' + cName + '/'));
    gulp.src(['templates/statelessComponent/statelessComponent.scss'])
      .pipe(mustache(partialFactory(cName)))
      .pipe(rename(newName))
      .pipe(gulp.dest(COMPONENTS_SRC_PATH + '/' + cName + '/'));
    gulp.src(['templates/statelessComponent/statelessComponent.css'])
      .pipe(mustache(partialFactory(cName)))
      .pipe(rename(newName))
      .pipe(gulp.dest(COMPONENTS_SRC_PATH + '/' + cName + '/'));
  }
});
