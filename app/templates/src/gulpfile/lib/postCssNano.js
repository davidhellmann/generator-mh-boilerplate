import config from '../../config.json';

const postCssNano = () => {
    return [
        require('cssnano')({
            zindex: false,
            discardUnused: false,
            reduceIndents: false,
            mergeIndents: false
        })
    ]
}

module.exports = postCssNano;