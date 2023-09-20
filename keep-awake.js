const CronJob = require('cron').CronJob;
const https = require('https');

function keepAwake(serverUrl) {
  return new CronJob('0 */10 * * * *', () => {
    https
      .get(serverUrl, (res) => {
        console.log(`nudged server - response code: ${res.statusCode}`);
      })
      .on('error', (err) => {
        console.error(`nudged server - response error: ${err.message}`);
      });
  });
}

module.exports = keepAwake;
