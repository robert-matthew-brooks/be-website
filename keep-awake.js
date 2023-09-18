const CronJob = require('cron').CronJob;
const https = require('https');

const serverUrl = 'https://be-website.onrender.com/';

const keepAwake = new CronJob('0 */10 * * * *', () => {
  console.log('Pinging server...');

  https
    .get(serverUrl, (res) => {
      console.log(`Server responded with code: ${res.statusCode}`);
    })
    .on('error', (err) => {
      console.log(`Server responded with error: ${err.message}`);
    });
});

module.exports = keepAwake;
