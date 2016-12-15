'use strict'

const gulp = require('gulp'),
      minifycss = require('gulp-minify-css'),
      uglify = require('gulp-uglify'),
      webpack = require('webpack'),
      rename = require('gulp-rename'),
      del = require('del'),
      rev = require('gulp-rev'),
      revCollector = require('gulp-rev-collector'),
      gulpCopy = require('gulp-copy'),
      runSequence = require('run-sequence'),
      mergeStream = require('merge-stream');;

const config = require('./webpack.config');

const Production = () => process.env.NODE_ENV === 'production'

/**
 *  清理生产目录文件
 */
gulp.task('clean', function(cb) {
    del(['./dist/*','./rev/*']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
        cb();
    });
});

/**
 *  执行webpack打包
 */
gulp.task('webpack',['clean'], function(cb) {
    webpack(config, cb);
});

gulp.task('rev',function(){
  const revCssJs = gulp.src(['./dist/*.css','./dist/*.js'])
             .pipe(rev())
             .pipe(gulp.dest('./dist'))
             .pipe(rev.manifest())
             .pipe(gulp.dest('./rev'))

   const revImg = gulp.src(['./src/public/img/*'])
              .pipe(rev())
              .pipe(gulp.dest('./dist/public/img'))
              .pipe(rev.manifest())
              .pipe(gulp.dest('./rev'))

  return mergeStream(revCssJs,revImg)
})

gulp.task('revCollector',['rev'],function(){
  gulp.src(['./rev/rev-manifest.json','./src/*.html'])
      .pipe(revCollector())
      .pipe(gulp.dest('./dist/'))
})

gulp.task('copy',function(){
  gulp.src(['./src/**'])
      .pipe(gulp.dest('./dist/'))
})

/**
 *  压缩css文件
 */
gulp.task('style',function() {
    gulp.src('./dist/*.css')
    // .pipe(rename({suffix:'.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist'));
});

/**
 *  压缩js文件
 */
gulp.task('script',function(){
    gulp.src('./dist/*.js')
    // .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

/**
 *  构建 build
 */
 gulp.task('build',function(){
 if(Production()){
    // runSequence(['style','script'],'copy','rev','revCollector')
    gulp.run('uglify')
    gulp.run('copy')
    gulp.run('rev')
    gulp.run('revCollector')
  }
  else{
    // runSequence('copy','rev','revCollector')
    gulp.run('copy')
    gulp.run('rev')
    gulp.run('revCollector')
  }
  // gulp.run('copy')
  // gulp.run('rev')
  // gulp.run('revCollector')
 })

 /**
  *  压缩
  */
gulp.task('uglify', function() {
    //console.log(process.env.NODE_ENV);
    gulp.start('style','script')
})
