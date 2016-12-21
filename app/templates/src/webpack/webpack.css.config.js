/**
 * Maybe this can be deleted in the future, needs to be tested
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

/*
 |--------------------------------------------------------------------------
 | webpack.css.config.js
 |--------------------------------------------------------------------------
 */

import webpack_base_config from './webpack.base.config.babel';
import * as webpack_utils from './webpack_utils';

const css_loaders = webpack_utils.cssLoaders();
webpack_base_config.module.rules.push(css_loaders);