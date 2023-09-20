const CronJob = require('cron').CronJob;
const https = require('https');

function keepAwake(serverUrl) {
  return new CronJob('0 */10 * * * *', () => {
    https
      .get(serverUrl, (res) => {
        console.log(`Nudged server - responded with code: ${res.statusCode}`);
      })
      .on('error', (err) => {
        console.error(`Nudged server - responded with error: ${err.message}`);
      });
  });
}

module.exports = keepAwake;
