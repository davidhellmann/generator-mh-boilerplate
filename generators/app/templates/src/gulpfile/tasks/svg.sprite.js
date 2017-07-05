/**
 |--------------------------------------------------------------------------
 | gulp svg:sprite
 |--------------------------------------------------------------------------
 *
 * Create SVG Sprite File with symbols and a SCSS File to use with background images
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

/*
 |--------------------------------------------------------------------------
 | svg.sprite.js
 |--------------------------------------------------------------------------
 */


import config from '../../package.json';

import gulp from 'gulp';
import path from 'path';
import gulpLoadPlugins from 'gulp-load-plugins';
import error_handler from '../lib/error_handler';

const $ = gulpLoadPlugins();

const paths = {
  src: `${config.srcPaths.images.svg.base + config.srcPaths.images.svg.sprite}**/*`,
  dest: `${config.distPaths.images.svg.sprite}`,
  assets: path.resolve(__dirname, '../../'),
};

const svg_sprite_config = {
  log: 'info',
  shape: {
    dimension: {
      maxWidth: 30,
      maxHeight: 30,
      attributes: true,
    },
    spacing: {
      padding: 10,
    },
  },
  dest: config.distPaths.base,
  transform: [
    {
      svgo: {
        plugins: config.svgoConfig,
      },
    },
  ],
  mode: {
    css: {
      dest: '.',
      sprite: `${paths.dest}/sprite.css.svg`,
      render: {
        scss: {
          dest: `${config.srcPaths.css}_____generic/_generic.svg-sprite.scss`,
        },
      },
    },
    symbol: {
      dest: paths.dest,
      sprite: 'sprite.svg',
      inline: false,
    },
  },
};

const svg_sprite = () => {
  gulp
    .src(paths.src)
    .pipe($.changed(paths.dest))
    .pipe($.svgSprite(svg_sprite_config))
    .on('error', error_handler)
    .pipe(gulp.dest(paths.assets));
};

gulp.task('svg:sprite', svg_sprite);

export default svg_sprite;
