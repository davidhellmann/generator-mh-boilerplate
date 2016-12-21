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
  spinner.stop()
if(err) throw err
process.stdout.write(`${stats.toString({
  colors: true,
  modules: false,
  children: false,
  chunks: false,
  chunkModules: false,
})}\n`);
});