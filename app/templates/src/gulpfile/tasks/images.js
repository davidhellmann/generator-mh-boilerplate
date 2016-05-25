import gulp from 'gulp'
import runSequence from 'run-sequence';
import yargs from 'yargs';

const argv = yargs.argv;

const imagesTask = (cb) => {
    const env = argv.env || 'development'
    if(env == 'production') {
        runSequence(
            ['copy:images'],
            ['minify:images'],
            cb
        )
    } else {
        runSequence(
            'copy:images',
            cb
        )
    }
}

gulp.task('images', imagesTask);
module.exports = imagesTask;
