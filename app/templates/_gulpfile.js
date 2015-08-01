var pkg = require('./package.json');
var config = require('./config.json');

/*------------------------------------*\
    Inhalte

    1. #Config
    2. #Directories
    3. #init Modules
    4. #browserSync
    5. #templates
    6. #sass
    7. #js
    8. #images
    9. #svg
\*------------------------------------*/

// Config

var vhost = config.proxy;

var autoprefixer_browsers = [
  'ie >= 9',
  'last 2 version',
];

/*------------------------------------*\
    $directories
\*------------------------------------*/


var src = config.src.src,
    srcAssets = src;
    srcBower = src + config.src.bower,
    srcTemplates = srcAssets + config.src.templates
    srcCss = srcAssets + config.src.css,
    srcJs = srcAssets + config.src.js.base,
    srcJsMySource = srcJs + config.src.js.mysource,
    srcJsJson = srcJs + config.src.js.json,
    srcImages = srcAssets + config.src.images.base,
    srcSvg = srcImages + config.src.images.svg.base,
    srcSvgSingle = srcSvg + config.src.images.svg.single,
    srcSvgSprite = srcSvg + config.src.images.svg.sprite,
    dist = config.dist.dist,
    distAssets = dist + 'assets/',
    distCss = distAssets + config.dist.css,
    distJs = distAssets + config.dist.js,
    distImages = distAssets + config.dist.images.base,
    distHtmlImages = distImages + config.dist.images.bitmap.htmlimages,
    distCssImages = distImages + config.dist.images.bitmap.cssimages,
    distSvg = distImages + config.dist.images.svg.base,
    distSvgSingle = distSvg + config.dist.images.svg.single,
    distSvgSprite = distSvg + config.dist.images.svg.sprite;

/**
 like:
 srcBower + 'package',
 srcJs + 'package'
 etc...
*/
var jsSources = {
  // copy Single JS Files which will not be combined
  copyjs: [
  ],

  // Copy and Combine JS Files (Bower and other Plugins)
  combinejs: [
  ]
};


// modernizr tests
var modernizrTests = [
  'flexbox',
  'flexboxlegacy'
]

/*------------------------------------*\
  #init modules
\*------------------------------------*/


var gulp    = require('gulp');

var $       = require('gulp-load-plugins')(),
browserSync = require('browser-sync'),
del         = require('del'),
runSequence = require('run-sequence'),
reload      = browserSync.reload,
argv        = require('yargs').argv;


var errorLog = function(err) {
  $.util.beep();
  console.log(err);
  if (this.emit) {
    this.emit('end');
  };
  return $.notify().write(err);
}



/*------------------------------------*\
  #browserSync
\*------------------------------------*/

var browserSyncConfig = {
  proxy: vhost,
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

gulp.task('browser-sync', function() {
  browserSync(browserSyncConfig);
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

/*------------------------------------*\
 /#browserSync
\*------------------------------------*/


/*------------------------------------*\
  #templates
\*------------------------------------*/


gulp.task('templates', function() {
  gulp.src(srcTemplates + '**/*.php')
  .pipe($.changed(dist, {
    extension: '.php'
  }))
  .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
  .pipe(gulp.dest(dist))
  .pipe($.notify('moved Template Files'))
  .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
});

/*------------------------------------*\
  #SASS
\*------------------------------------*/


gulp.task('sass', function() {
  gulp.src(srcCss + 'style.scss')
  .pipe($.plumber())
  .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
  .pipe($.sourcemaps.init())
  .pipe($.sass.sync({
    outputStyle: 'compressed',
    precision: 10,
    includePaths: [
      srcCss + '**/*.scss'
    ]
  })
  .on('error', $.sass.logError)
  .on('error', $.notify.onError('Sass Compile Error!'))
  )
  .pipe($.autoprefixer({
    browsers: autoprefixer_browsers
  }))
  .pipe($.sourcemaps.write('.'))
  .pipe(gulp.dest(distCss))
  .pipe($.filter('**/*.css'))
  .pipe($.notify('Compiled <% file.relative %>'))
  .pipe($.size({
    title: 'styles'
  }))
  .pipe(reload({
    stream: true
  }));
});


/*------------------------------------*\
  #JS tasks
\*------------------------------------*/


// modernizr task

gulp.task('js-modernizr', function() {
  gulp.src([srcCss + '**/*.scss', srcJs + '**/*.js'])
  .pipe($.modernizr({
    crawl: true,
    excludeTests: ['hidden'],
    options: [
      'setClasses',
      'addTest'
    ],
    tests: modernizrTests
  }))
  .pipe($.uglify())
  .pipe($.rename({ suffix: '-custom.min' }))
  .pipe(gulp.dest(distJs + 'vendor/'));
});

// combine bower components and other Plugins
gulp.task('js-plugins', function() {
  gulp.src(jsSources.combinejs)
  .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
  .pipe($.concat('plugins.js'))
  // .pipe($.uglify())
  .pipe(gulp.dest(distJs))
  .pipe($.size({
    title: 'combined JS Plugins'
  }))
  .pipe($.notify('combined JS Plguins'));
});

// move single js or json Files
gulp.task('js-move', function() {
  jsSources.copyjs.forEach(function(item) {
    gulp.src(item.src)
    .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
    .pipe($.if('**/*.js', $.uglify()))
    .pipe($.uglify())
    .pipe(gulp.dest(distJs))
    .pipe($.size({
      title: 'Single JS Files Size:'
    }))
    .pipe($.notify('moved Single JS Files'));
  });
});

// combine my own scripts
gulp.task('js-scripts', function() {
  gulp.src(srcJsMySource + '**/*.js')
  .pipe($.jshint())
  .pipe($.jshint.reporter('jshint-stylish'))
  .pipe($.sourcemaps.init())
  .pipe($.concat('scripts.min.js'))
  .pipe($.uglify())
  .pipe($.sourcemaps.write('.'))
  .pipe(gulp.dest(distJs))
  .pipe($.size({
    title: 'JS'
  }))
  .pipe($.notify('compiled JS'));
});


/*------------------------------------*\
  /#JS tasks
\*------------------------------------*/


/*------------------------------------*\
  #images
\*------------------------------------*/

gulp.task('images', function() {
  gulp.src([srcImages + '**/*.{jpg,png}'])
  .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
  .pipe($.changed(distImages))
  .pipe($.size({
    title: 'images before'
  }))
  .pipe($.imagemin({
    progressive: true,
    interlaces: true
  }))
  .pipe(gulp.dest(distImages))
  .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
  .pipe($.size({
    title: 'images after'
  }));
});

/*------------------------------------*\
  /#images
\*------------------------------------*/



/*------------------------------------*\
  #svg
\*------------------------------------*/

gulp.task('svg-single', function() {
  gulp.src(srcSvgSingle + '**/*.svg')
    .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
    .pipe($.changed(distSvgSingle))
    .pipe($.size({
      title: 'Single SVG Images before'
    }))
    .pipe($.imagemin({
      svgoPlugins: [{
        removeViewBox: false
      }]
    }))
    .on('error', errorLog)
    .pipe(gulp.dest(distSvgSingle))
    .pipe($.size({
      title: 'single SVG Images after'
    }));
});

gulp.task('svg-sprite', function() {
  gulp.src(srcSvgSprite + '**/*.svg')
    .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
    .pipe($.changed(distSvgSprite))
    .pipe($.size({
      title: 'Sprite SVG Images before'
    }))
    .pipe($.imagemin({
      svgoPlugins: [{
        removeViewBox: false
      }]
    }))
    .on('error', errorLog)
    .pipe($.svgSprite({
      mode: {
        symbol: {
          dest: 'sprite',
          sprite: 'svgsprite.svg',
          inline: true
        }
      }
    }))
    .on('error', errorLog)
    .pipe(gulp.dest(distSvg))
    .pipe($.size({
      title: 'Sprite SVG Images after'
    }));
});

/*------------------------------------*\
  /#svg
\*------------------------------------*/



/*------------------------------------*\
  #clean
\*------------------------------------*/

gulp.task('clean:dist', function(cb) {
  del([
    dist + '**/*'
  ], {
    force: true
  }, cb);
});

/*------------------------------------*\
  /#clean
\*------------------------------------*/

// init tasks

gulp.task('init', function() {
  runSequence(
    'templates',
    'js-modernizr',
    'sass',
    'js-plugins',
    'js-move',
    'js-scripts',
    'images',
    'svg-single',
    'svg-sprite'
);
});

//watch task

gulp.task('watch', function() {

  // watch template files
  gulp.watch(srcTemplates + '**/*.php', ['templates']);

  // watch scss files
  gulp.watch(srcCss + '**/*.scss', ['sass']);

  // watch JS Task
  gulp.watch(srcJsMySource + '**/*.js', ['js-scripts']);
  gulp.watch(srcJs + 'single/**/*', ['js-move']);

  // watch images
  gulp.watch(srcImages + '**/*.{jpg,png}', ['images']);

  // watch SVG
  gulp.watch(srcSvgSingle + '**/*.svg', ['svg-single']);
  gulp.watch(srcSvgSprite + '**/*.svg', ['svg-sprite']);

 // reload task
  gulp.watch(dist + '**/*.{php,html,js,jpg,png,svg}', ['bs-reload']);
});

// default task

gulp.task('default', ['browser-sync', 'watch']);
