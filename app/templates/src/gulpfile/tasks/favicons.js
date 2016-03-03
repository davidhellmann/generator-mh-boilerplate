import config from '../../config.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

import errorHandler from '../lib/errorHandler';

const $ = gulpLoadPlugins();

const favicons = () => {
    return gulp
        .src(config.src.src + config.src.favicons + '*.{png,jpg,svg}')
        .pipe($.favicons({
            appName: config.favicon.appName,// Your application's name. `string`
            appDescription: config.favicon.appDescription,// Your application's description. `string`
            developerName: config.favicon.developerName,// Your (or your developer's) name. `string`
            developerURL: config.favicon.developerUrl,// Your (or your developer's) URL. `string`
            background: config.favicon.background,// Background colour for flattened icons. `string`
            path: config.favicon.path,// Path for overriding default icons path. `string`
            display: "standalone",// Android display: "browser" or "standalone". `string`
            orientation: "portrait",// Android orientation: "portrait" or "landscape". `string`
            version: "1.0",// Your application's version number. `number`
            logging: config.favicon.logging,// Print logs to console? `boolean`
            online: config.favicon.online,// Use RealFaviconGenerator to create favicons? `boolean`
            icons: {
                android: config.favicon.icons.android,// Create Android homescreen icon. `boolean`
                appleIcon: config.favicon.icons.appleIcon,// Create Apple touch icons. `boolean`
                appleStartup: config.favicon.icons.appleStartup,// Create Apple startup images. `boolean`
                coast: config.favicon.icons.coast,// Create Opera Coast icon. `boolean`
                favicons: config.favicon.icons.favicons,// Create regular favicons. `boolean`
                firefox: config.favicon.icons.firefox,// Create Firefox OS icons. `boolean`
                opengraph: config.favicon.icons.opengraph,// Create Facebook OpenGraph image. `boolean`
                twitter: config.favicon.icons.twitter,// Create Twitter Summary Card image. `boolean`
                windows: config.favicon.icons.windows,// Create Windows 8 tile icons. `boolean`
                yandex: config.favicon.icons.yandex// Create Yandex browser icon. `boolean`
            }
        }))
        .on('error', errorHandler)
        .pipe(gulp.dest(config.dist.dist + config.dist.favicons))
        .pipe($.notify({
            onLast: true,
            message: 'created Favicons'
        }))
}

gulp.task('favicons', favicons);
module.exports = favicons;