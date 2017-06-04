const downloadCraft = require('../../../helpers/_downloadFiles');

const writingCraft = () => {
  return {
    download: context => {
      const craftUrl = 'http://buildwithcraft.com/latest.zip?accept_license=yes';
      return downloadCraft({
        url: craftUrl,
        destination: context.destinationPath('./dist/')
      });
    }
  };
};

module.exports = writingCraft;
