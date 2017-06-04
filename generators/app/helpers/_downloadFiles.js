const download = require('download');
const ProgressBar = require('progress');
const commentLog = require('./_logComment');

const bar = new ProgressBar('[:bar] :percent :etas', {
  complete: '=',
  incomplete: ' ',
  width: 20,
  total: 0
});

const downloadFiles = ({url, destination} = {}) => {
  commentLog({
    message: 'Downloading',
    color: 'green',
    short: true
  });

  return download(url, destination, {
    extract: true,
    mode: '775'
  }).on('response', res => {
    if (process.env.NODE_ENV === 'test') {
      return;
    }
    bar.total = res.headers['content-length'];
    res.on('data', data => bar.tick(data.length));
  }).then(() => commentLog({
    message: 'Finished Download',
    color: 'green',
    short: true
  }))
    .catch(error => console.error(error));
};

module.exports = downloadFiles;
