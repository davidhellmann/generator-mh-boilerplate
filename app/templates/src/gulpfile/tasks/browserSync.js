/**
 * Browser Sync
 * @description Refresh the Brwoser after File Change.
 */

import config from '../../config.json';
import gulp from 'gulp';
import browserSync from 'browser-sync';

const browserSyncTask = () => {
    var browserSyncWatch = [
        config.dist.dist + config.dist.views + '**/*.{php,html}',
        config.dist.dist + config.dist.images.base + '**/*.{jpg,png,gif,svg}',
        config.dist.dist + config.dist.css + '**/*.css',
        config.dist.dist + config.dist.js + '**/*.js'
    ];

    var browserSyncConfig = {
        proxy: config.proxy,
        ghostMode: {
            clicks: false,
            forms: true,
            scroll: false
        },
        logLevel: 'info', // info, debug, warn, silent
        watchTask: true,
        open: false, // false if you don't want to automatically open the browser
        stream: true,
        ui: {
            port: 8080
        }
    }

    browserSync.init(browserSyncWatch, browserSyncConfig);
}

const browserSyncReload = () => {
    browserSync.reload();
}

gulp.task('browser-sync', browserSyncTask);
gulp.task('bs-reload', browserSyncReload);

module.exports = { browserSyncTask, browserSyncReload }