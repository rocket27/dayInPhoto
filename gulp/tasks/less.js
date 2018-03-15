'use strict';

module.exports = function() {
  $.gulp.task('less', function() {
    return $.gulp.src('./source/styles/main.less')
      .pipe($.gp.sourcemaps.init())
      .pipe($.gp.lessGlob())
      .pipe($.gp.less()).on('error', $.gp.notify.onError({ title: 'Style' }))
      .pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
      .pipe($.gp.cssUnit({
        type: 'em-to-rem',
        rootSize: 16
      }))
      .pipe($.gp.sourcemaps.write())
      .pipe($.gulp.dest($.config.root + '/css'))
      .pipe($.browserSync.stream());
  })
};