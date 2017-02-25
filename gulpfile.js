const gulp = require('gulp')
const path = require('path')
const fs = require('fs')
const inject = require('gulp-inject');
const runSequence = require('run-sequence')

const folders = {
  app: path.resolve(__dirname, 'app'),
  components: path.resolve(__dirname, 'app', 'components'),
  schemas: path.resolve(__dirname, 'shared', 'schemas'),
  css: path.resolve(__dirname, 'app', 'css'),
  views: path.resolve(__dirname, 'app', 'views'),
  root: path.resolve(__dirname),
  shared: {
    app: path.resolve(__dirname, 'shared'),
    components: path.resolve(__dirname, 'shared', 'components'),
    css: path.resolve(__dirname, 'shared', 'css'),
    views: path.resolve(__dirname, 'shared', 'views'),
    root: path.resolve(__dirname),
  },
  admin: {
    app: path.resolve(__dirname, 'admin'),
    components: path.resolve(__dirname, 'admin', 'components'),
    css: path.resolve(__dirname, 'admin', 'css'),
    views: path.resolve(__dirname, 'admin', 'views'),
    root: path.resolve(__dirname),
  }
}

function generateInject(injectTo, outputFolder, arrayOfFilesToInject, startTag, importStatement, extractFileName) {
  var importStatement = importStatement || 'import'
  return gulp.src(injectTo)
    .pipe(inject(gulp.src(arrayOfFilesToInject, {
      read: false
    }), {
      relative: true,
      starttag: "// " + startTag,
      endtag: "// end " + startTag,
      transform: function(filepath, file, i, length) {
        if(extractFileName) {
          var title = filepath.replace(/^.*[\\\/]/, '')
          title = title.substr(0, title.lastIndexOf('.')).replace('-', '_')
          if(importStatement !== 'require') {
            if (filepath.indexOf('..') !== -1) {
              return importStatement + ' ' + title + ' from "' + filepath + '"'
            } else {
              return importStatement + ' ' + title + ' from "./' + filepath + '"'
            }
          } else {
            if (filepath.indexOf('..') !== -1) {
              return title + ': require("' + filepath + '"),'
            } else {
              return title + ': require("./' + filepath + '"),'
            }
          }

        } else {
          if (filepath.indexOf('..') !== -1) {
            return importStatement + ' "' + filepath + '"'
          } else {
            return importStatement + ' "./' + filepath + '"'
          }
        }
      }
    }))
    .pipe(gulp.dest(outputFolder))
}

gulp.task('inject-component-js', function() {
  return generateInject(
    path.join(folders.components, 'index.js'),
    folders.components,
    [
      folders.components + '/**/*.js',
      '!**/*spec.js',
      '!**/*mock.js',
    ],
    'inject component js'
  )
})

gulp.task('inject-shared-component-js', function() {
  return generateInject(
    path.join(folders.shared.components, 'index.js'),
    folders.shared.components,
    [
      folders.shared.components + '/**/*.js',
      '!**/*spec.js',
      '!**/*mock.js',
    ],
    'inject shared components js'
  )
})

gulp.task('inject-vue', function() {
  return generateInject(
    path.join(folders.views, 'index.js'),
    folders.views,
    [
      folders.app + '/views/**/*.vue',
    ],
    'inject vue'
  )
})

gulp.task('inject-css', function() {
  return generateInject(
    path.join(folders.css, 'app.styl'),
    folders.css,
    [
      folders.app + '/components/**/*.css',
      folders.app + '/css/**/*.css',
      folders.app + '/components/**/*.styl',
      folders.app + '/css/**/*.styl',
      folders.shared.app + '/**/*.styl',
      folders.shared.app + '/**/*.css',
      "!**/vendor.scss",
      "!**/app.styl",
    ],
    'inject css',
    '@import'
  )
})

gulp.task('inject-views', function() {
  return generateInject(
    path.join(folders.shared.app, 'routes.js'),
    folders.shared.app,
    [
      folders.views + '/**/*.vue',
      folders.admin.views + '/**/*.vue',
      '!' + folders.views + '/**/app.vue',
      '!' + folders.admin.views + '/**/app.vue',
    ],
    'inject views',
    'import',
    true
  )
})

gulp.task('inject-admin-component-js', function() {
  return generateInject(
    path.join(folders.admin.components, 'index.js'),
    folders.admin.components,
    [
      folders.admin.components + '/**/*.js',
      '!' + folders.admin.components + '/index.js',
      '!**/*spec.js',
      '!**/*mock.js',
    ],
    'inject component js'
  )
})

gulp.task('inject-admin-vue', function() {
  return generateInject(
    path.join(folders.admin.views, 'index.js'),
    folders.admin.views,
    [
      folders.admin.views + '/**/*.vue',
    ],
    'inject vue'
  )
})

gulp.task('inject-admin-css', function() {
  return generateInject(
    path.join(folders.admin.css, 'app.styl'),
    folders.admin.css,
    [
      folders.admin.app + '/components/**/*.css',
      folders.admin.app + '/css/**/*.css',
      folders.admin.app + '/components/**/*.styl',
      folders.admin.app + '/css/**/*.styl',
      folders.shared.app + '/**/*.styl',
      folders.shared.app + '/**/*.css',
      "!**/vendor.scss",
      "!**/app.styl",
    ],
    'inject css',
    '@import'
  )
})

// gulp.task('inject-admin-views', function() {
//   return generateInject(
//     path.join(folders.admin.app, 'routes.js'),
//     folders.admin.app,
//     [
//       folders.admin.views + '/**/*.vue',
//       '!' + folders.admin.views + '/**/app.vue',
//     ],
//     'inject views',
//     'import',
//     true
//   )
// })

gulp.task('inject-schemas', function() {
  return generateInject(
    path.join(folders.schemas, 'index.js'),
    folders.schemas,
    [
      folders.schemas + '/**/*.js',
      '!' + folders.schemas + '/**/index.js',
      '!' + folders.schemas + '/**/mongoose.js',
    ],
    'inject schemas',
    'require',
    true
  )
})

gulp.task('default', function(done) {
  runSequence('inject-css', 'inject-component-js', 'inject-shared-component-js', 'inject-vue', 'inject-views', 'inject-schemas', 'inject-admin-css', 'inject-admin-component-js', 'inject-admin-vue', done)
})
