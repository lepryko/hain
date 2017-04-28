'use strict';

const gulp              = require('gulp');
const del               = require('del');
// const replace           = require('gulp-replace');
const typedoc           = require('gulp-typedoc');

gulp.task('deps', () => {
  // return gulp.src('./hain-plugin.d.ts')
  //   .pipe(gulp.dest('./tmp'));
  // return gulp.src('./app/package.json')
  //   .pipe(install({ production: true }));
});

gulp.task('clean', () => {
  return del(['./html/**']);
});

gulp.task('typedoc', ['deps', 'clean'], () => {
  return gulp
    .src(["./src/*.d.ts"])
    .pipe(typedoc({
      mode: 'file',
      target: 'ES2015',

      out: './html',
      rootDir: './src',

      theme: './theme',
      name: 'hain Documentation',

      entryPoint: 'hain',

      version: true,

      includeDeclarations: true,
      excludeExternals: true,
      excludeNotExported: true,
      hideSources: true,
      readme: 'none',
    }))
});

gulp.task('watch', ['typedoc'], () => {
  const opts = {
    debounceDelay: 2000
  };
  gulp.watch(['./theme/**','./src/**'], opts, ['typedoc']);
});

gulp.task('default', ['typedoc']);
