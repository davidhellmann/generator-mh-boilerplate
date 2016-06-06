import config from '../../config.json';

const postCssConfig = () => {
    return [
        require('autoprefixer')({
            browsers: config.autoprefixer,
            cascade: false
        }),
        require('postcss-flexbugs-fixes'),
        require('postcss-responsive-type'),
        require('lost')({})
    ]
}

module.exports = postCssConfig;