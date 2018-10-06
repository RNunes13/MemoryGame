const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const clean = require('gulp-clean');
const cssmin = require('gulp-cssmin');
const imagemin = require('gulp-image');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');
const browserify = require('gulp-browserify');

const SRC = './src';
const DIST = './dist';
const assetsSRC = `${SRC}/assets`;
const assetsDIST = `${DIST}/assets`;
const viewsSRC = `${SRC}/views`;

const task = {

  clean: function() {
    return gulp.src('./dist', {read: false})
      .pipe(clean());
  },

  pug: function() {
    return gulp.src([`${viewsSRC}/*.pug`, `${viewsSRC}/_pages/*.pug`])
      .pipe(pug({pretty: true}))
      .pipe(gulp.dest(`${DIST}`));
  },

  sass: function() {
    return gulp.src(`${assetsSRC}/scss/**/*.scss`)
      .pipe(sass())
      .pipe(postcss([autoprefixer()]))
      .pipe(cssmin())
      .pipe(gulp.dest(`${assetsDIST}/css`));
  },

  js: function() {
    return gulp.src([`${assetsSRC}/js/**/*.js`, `!${assetsSRC}/js/common/**/*.js`, `!${assetsSRC}/js/modules/**/*.js`])
      .pipe(browserify({transform: ['babelify']}))
      .pipe(uglify())
      .pipe(gulp.dest(`${assetsDIST}/js`));
  },

  jsGlobal: function() {
    return gulp.src(`${assetsSRC}/js/common/memory_game-common-globals.js`)
      .pipe(browserify({transform: ['babelify']}))
      .pipe(uglify())
      .pipe(gulp.dest(`${assetsDIST}/js/common`));
  },

  img: function() {
    return gulp.src(`${assetsSRC}/img/**/*`)
      // .pipe(imagemin())
      .pipe(gulp.dest(`${assetsDIST}/img`));
  },

  vendor: {
    css: function() {
      return gulp.src(['node_modules/@fortawesome/fontawesome-free/css/all.min.css'])
      .pipe(gulp.dest(`${assetsDIST}/css/vendor/fontawesome/css`));
    },

    webfonts: function() {
      return gulp.src(['node_modules/@fortawesome/fontawesome-free/webfonts/*.*'])
      .pipe(gulp.dest(`${assetsDIST}/css/vendor/fontawesome/webfonts`));
    },

    js: function() {
      return gulp.src(['node_modules/jquery/dist/jquery.min.js'])
      .pipe(gulp.dest(`${assetsDIST}/js/vendor`));
    },
  },
};

gulp.task('clean', task.clean);
gulp.task('pug', task.pug);
gulp.task('sass', task.sass);
gulp.task('cssVendor', task.vendor.css);
gulp.task('jsVendor', task.vendor.js);
gulp.task('webfontsVendor', task.vendor.webfonts);
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
  runSequence('clean', ['pug', 'sass', 'js', 'jsGlobal', 'cssVendor', 'webfontsVendor', 'jsVendor', 'img'], callback);
});
