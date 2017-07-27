const fs = require('fs-extra');
const config = require('../package.json');

const { images, favicons, fonts } = config.srcPaths;
const imageDirs = [
  `${images.svg.base + images.svg.single}`,
  `${images.svg.base + images.svg.sprite}`,
  `${images.base + images.bitmap.cssimages}`,
  `${images.base + images.bitmap.htmlimages}`,
]

const dirs = [...imageDirs, favicons, fonts];

dirs.forEach(dir => fs.ensureDir(dir, err => {
  if (err) console.error(err);
}));
