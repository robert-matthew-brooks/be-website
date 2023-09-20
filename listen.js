const app = require('./app');
const keepAwake = require('./keep-awake');

const port = 9090;
const serverUrl = 'https://be-website.onrender.com/';

app.listen(port, (err) => {
  if (err) {
    throw new Error(err);
  } else {
    console.log(`listening on port ${port}`);
  }
});

if (process.env.NODE_ENV === 'production') {
  console.log('starting server nudge CronJob');
  keepAwake(serverUrl).start();
}
