import config from '../../config.json';

const postCSS_config = () => {
  return [
    require('autoprefixer')({
      browsers: ['last 2 versions'],
      cascade: false
    }),
    require('postcss-flexbugs-fixes'),
    require('postcss-assets'),
    require('postcss-aspect-ratio'),
  ];
}

export default postCSS_config;
