var pkg = require('./package.json');
var config = require('./config.json');

/*------------------------------------*\
    Inhalte

    1. #Config
    2. #Directories
    3. #init Modules
    4. #browserSync
    5. #views
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
    srcAssets = src,
    srcBower = src + config.src.bower,
    srcViews = srcAssets + config.src.views,
    srcCss = srcAssets + config.src.css,
    srcFonts = srcAssets + config.src.fonts,
    srcJs = srcAssets + config.src.js.base,
    srcJsMySource = srcJs + config.src.js.mysource,
    srcJsJson = srcJs + config.src.js.json,
    srcImages = srcAssets + config.src.images.base,
    srcSvg = srcImages + config.src.images.svg.base,
    srcSvgSingle = srcSvg + config.src.images.svg.single,
    srcSvgSprite = srcSvg + config.src.images.svg.sprite,
    dist = config.dist.dist,
    distAssets = dist + 'assets/',
    distViews = config.dist.views,
    distCss = distAssets + config.dist.css,
    distFonts = distAssets + config.dist.fonts,
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
  copyjs: [//{
    // example: src: srcJs + 'single/file.js'
  //   }
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
prefix      = require('autoprefixer'),
quantity    = require('postcss-quantity-queries'),
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
  #views
\*------------------------------------*/


gulp.task('views', function() {
  return gulp.src(srcViews + '**/*.php')
  .pipe($.changed(distViews, {
    extension: '.php'
  }))
  .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
  .pipe(gulp.dest(distViews))
  .pipe($.notify('moved Template Files'))
  .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
});

/*------------------------------------*\
  #SASS
\*------------------------------------*/
var postCSS = [
  quantity(),
  //autoprefixer
  prefix({
    browsers: autoprefixer_browsers,
    cascade: false
  })
];

gulp.task('sass', function() {
  return gulp.src(srcCss + 'style.scss')
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
  .pipe($.postcss(postCSS))
  .pipe($.sourcemaps.write('.'))
  .pipe(gulp.dest(distCss))
  .pipe($.filter('**/*.css'))
  .pipe($.notify('Compiled <%%= file.relative %>'))
  .pipe($.size({
    title: 'styles'
  }))
  .pipe(reload({
    stream: true
  }));
});

gulp.task('sass-build', function() {
  return gulp.src(distCss + '**/*.css')
  .pipe($.size({
    title: 'styles before'
  }))
  .pipe($.cssnano())
  .pipe(gulp.dest(distCss))
  .pipe($.notify('Compiled <%%= file.relative %>'))
  .pipe($.size({
    title: 'styles after'
  }));
});


/*------------------------------------*\
  #JS tasks
\*------------------------------------*/


// modernizr task

gulp.task('js-modernizr', function() {
  return gulp.src([srcCss + '**/*.scss', srcJs + '**/*.js'])
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
  return gulp.src(jsSources.combinejs)
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
    return gulp.src(jsSources.copyjs)
    .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
    .pipe($.if('**/*.js', $.uglify()))
    .pipe(gulp.dest(distJs))
    .pipe($.size({
      title: 'Single JS Files Size:'
    }))
    .pipe($.notify('moved Single JS Files'));
  });
});

// combine my own scripts
gulp.task('js-scripts', function() {
  return gulp.src(srcJsMySource + '**/*.js')
  .pipe($.plumber())
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

gulp.task('js-build', function() {
  return gulp.src(distJs + '**/*.js')
  .pipe($.size({
    title: 'JS FILES BEFORE'
  }))
  .pipe($.uglify())
  .pipe(gulp.dest(distJs))
  .pipe($.size({
    title: 'JS FILES AFTER'
  }));
});

/*------------------------------------*\
  /#JS tasks
\*------------------------------------*/


/*------------------------------------*\
  #images
\*------------------------------------*/

gulp.task('images', function() {
  return gulp.src([srcImages + '**/*.{jpg,png}'])
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
  return gulp.src(srcSvgSingle + '**/*.svg')
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
  return gulp.src(srcSvgSprite + '**/*.svg')
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
  #fonts
\*------------------------------------*/

gulp.task('fonts', function() {
  return gulp.src(srcFonts + '**/*')
  .pipe(gulp.dest(distFonts))
  .pipe($.notify('moved Fonts'));
});

/*------------------------------------*\
  /#fonts
\*------------------------------------*/



/*------------------------------------*\
  #clean
\*------------------------------------*/
var directoryToClean;

<% if (projectUsage == 'laravel') { %>
  directoryToClean = dist + 'assets/**/*'
<% } else { %>
  directoryToClean = dist + '**/*'
<% } %>

gulp.task('clean:dist', function(cb) {
  return del([
    directoryToClean
  ], {
    force: true
  }, cb);
});

gulp.task('clean:views', function(cb) {
  return del([
    distViews + '**/*.{php,html}'
  ], {
    force: true
  }, cb);
});

gulp.task('clean:js', function(cb) {
  return del([
    distJs + '**/*'
  ], {
    force: true
  }, cb);
});

gulp.task('clean:css', function(cb) {
  return del([
    distCss + '**/*'
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
    'views',
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

gulp.task('build', function() {
  runSequence(
    'clean:dist',
    'views',
    'js-modernizr',
    'sass',
    'fonts',
    'js-plugins',
    'js-move',
    'js-scripts',
    'images',
    'svg-single',
    'svg-sprite'
  );
});

gulp.task('build-css', function() {
  runSequence(
    'clean:css',
    'sass'
);
});

gulp.task('build-js', function() {
  runSequence(
    'clean:js',
    'js-modernizr',
    'js-plugins',
    'js-move',
    'js-scripts'
);
});

gulp.task('prod', function(callback) {
  runSequence(
    'clean:dist',
    [
      'views',
      'js-modernizr',
      'sass',
      'fonts',
      'js-plugins',
      'js-move',
      'js-scripts',
      'images',
      'svg-single',
      'svg-sprite',
    ],
    'sass-build',
    'js-build',
    callback
);
});

//watch task

gulp.task('watch', function() {

  // watch template files
  $.watch(srcViews + '**/*.{php,html}', $.batch(function(events, done) {
    gulp.start('views', done);
  }));

  // watch scss files
  gulp.watch(srcCss + '**/*.scss', ['sass']);

  // watch JS Task
  $.watch(srcJsMySource + '**/*.js', $.batch(function(events, done) {
    gulp.start('js-scripts', done);
  }));
  $.watch(srcJs + 'single/**/*', $.batch(function(events, done) {
    gulp.start('js-move', done);
  }));
  $.watch(srcJs + 'json/**/*', $.batch(function( events, done ) {
    gulp.st

  // watch images
  $.watch(srcImages + '**/*.{jpg,png}', $.batch(function(events, done) {
    gulp.start('images');
  }));

  // watch SVG
  $.watch(srcSvgSingle + '**/*.svg', $.batch(function(events,done) {
    gulp.start('svg-single', done);
  }));
  $.watch(srcSvgSprite + '**/*.svg', $.batch(function(events, done) {
    gulp.start('svg-sprite', done);
  }));

 // reload task
  <% if( projectUsage == 'laravel') { %>
    gulp.watch(distViews + '**/*', ['bs-reload']);
  <% } %>
  gulp.watch(dist + '**/*.{php,html,js,jpg,png,svg}', ['bs-reload']);
});

// default task

gulp.task('default', ['browser-sync', 'watch']);
