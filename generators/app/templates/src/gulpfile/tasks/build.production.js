import gulp from 'gulp';
import run_sequence from 'run-sequence';

const build_production = (cb) => {
  return run_sequence(
    [
      'clean:views',
      'clean:images',
      'clean:favicons',
    ],
    [
      'favicons',
      'move:images',
      'move:systemFiles',
      'move:views',
      'svg:sprite',
      'svg:single'
    ],
    cb
  )
}

gulp.task('build:production', build_production);

export default build_production;
