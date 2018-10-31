const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const clean = require('gulp-clean');
const cssmin = require('gulp-cssmin');
const imagemin = require('gulp-image');
const uglify = require('gulp-uglify');
const notify = require('gulp-notify');
const runSequence = require('run-sequence');
const browserify = require('gulp-browserify');
const gulpif = require('gulp-if');
const minimist = require('minimist');

const SRC = './src';
const DIST = './dist';
const assetsSRC = `${SRC}/assets`;
const assetsDIST = `${DIST}/assets`;
const viewsSRC = `${SRC}/views`;

const args = {
  string: 'env',
  default: {env: process.env.NODE_ENV || 'development'}, // 'production'
};

const options = minimist(process.argv.slice(2), args);

const utils = {
  error: function(error) {
    console.log(error.toString());
    utils.alert(error.toString());
    this.emit('end');
  },

  alert: function(msg) {
    gulp.src('./src').pipe(notify(msg));
  },
};

const task = {

  clean: function() {
    return gulp.src('./dist', {read: false})
      .pipe(clean());
  },

  pug: function() {
    return gulp.src([`${viewsSRC}/*.pug`, `${viewsSRC}/_pages/*.pug`])
      .pipe(pug({pretty: true}))
      .on('error', utils.error)
      .pipe(gulp.dest(`${DIST}`));
  },

  sass: function() {
    return gulp.src(`${assetsSRC}/scss/**/*.scss`)
      .pipe(sass())
      .on('error', utils.error)
      .pipe(postcss([autoprefixer()]))
      .pipe(cssmin())
      .pipe(gulp.dest(`${assetsDIST}/css`));
  },

  js: function() {
    return gulp.src([`${assetsSRC}/js/**/*.js`, `!${assetsSRC}/js/common/**/*.js`, `!${assetsSRC}/js/modules/**/*.js`])
      .pipe(browserify({transform: ['babelify']}))
      .pipe(uglify())
      .on('error', utils.error)
      .pipe(gulp.dest(`${assetsDIST}/js`));
  },

  jsGlobal: function() {
    return gulp.src(`${assetsSRC}/js/common/memory_game-common-globals.js`)
      .pipe(browserify({transform: ['babelify']}))
      .pipe(uglify())
      .on('error', utils.error)
      .pipe(gulp.dest(`${assetsDIST}/js/common`));
  },

  img: function() {
    return gulp.src(`${assetsSRC}/img/**/*`)
      .pipe(gulpif(options.env === 'production', imagemin()))
      .on('error', utils.error)
      .pipe(gulp.dest(`${assetsDIST}/img`));
  },
};

gulp.task('clean', task.clean);
gulp.task('pug', task.pug);
gulp.task('sass', task.sass);
gulp.task('js', task.js);
gulp.task('jsGlobal', task.jsGlobal);
gulp.task('img', task.img);

gulp.task('watch', function() {
  gulp.watch([`${viewsSRC}/*.pug`, `${viewsSRC}/_pages/*.pug`], function() {
    gulp.run('pug');
  });

  gulp.watch([`${assetsSRC}/scss/**/*.scss`], function() {
    gulp.run('sass');
  });

  gulp.watch([`${assetsSRC}/js/**/*.js`], function() {
    gulp.run('js');
    gulp.run('jsGlobal');
  });

  gulp.watch(`${assetsSRC}/img/**/*`, function() {
    gulp.run('img');
  });
});

gulp.task('default', function(callback) {
  runSequence('clean', ['pug', 'sass', 'js', 'jsGlobal', 'img'], callback);
});
