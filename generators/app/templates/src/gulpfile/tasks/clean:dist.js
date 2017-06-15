import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';

import config from '../../package.json';

gulp.task('clean:views', (cb) => {
  return del([
    config.distPaths.views + '**/*.{php,html}'
  ]).then(paths => {
    console.log('Deleted View files and folder:\n', paths.join('\n'));
  });
});

gulp.task('clean:images', (cb) => {
  return del([
    config.distPaths.images.base + '**/*.{png,PNG,jpg,JPG,jpeg,JPEG,svg,SVG,webp,WEBP,bmp,BMP,tif,TIF,gif,GIF}'
  ]).then(paths => {
    console.log('Deleted Image files and folder:\n', paths.join('\n'));
  });
});

gulp.task('clean:favicons', (cb) => {
  return del([
    config.distPaths.images.base + '**/*.{png,PNG,jpg,JPG,jpeg,JPEG,svg,SVG,webp,WEBP,bmp,BMP,tif,TIF,gif,GIF}'
  ]).then(paths => {
    console.log('Deleted Image files and folder:\n', paths.join('\n'));
  });
});


