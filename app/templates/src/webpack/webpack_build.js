require('shelljs/global');
env.NODE_ENV = 'production';

import path from 'path';
import webpack_config from './webpack_config';
import ora from 'ora';
import webpack from 'webpack';
import webpack_prod_config from './webpack.prod.config.babel.js';

const spinner = ora('building for production...');
spinner.start();

webpack(webpack_prod_config, (err, stats) => {
  spinner.stop();

  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if(stats.hasErrors()) {
    console.error(info.errors);
  }

  if(stats.hasWarnings()) {
    console.warn(info.warnings);
  }

  console.log(stats.toString({
    chunks: false,
    colors: true,
  }));

});