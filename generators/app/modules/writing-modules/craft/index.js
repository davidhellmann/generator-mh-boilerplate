const downloadCraft = require('../../../helpers/_downloadFiles');

const writingCraft = context => {
  return new Promise(async resolve => {
    async function download() {
      if (!context.props.craftInstall) {
        return;
      }
      const craftUrl = 'http://buildwithcraft.com/latest.zip?accept_license=yes';
      await downloadCraft({
        url: craftUrl,
        destination: context.destinationPath('./dist/')
      });
    }

    await download();
    resolve();
  });
};

module.exports = writingCraft;
