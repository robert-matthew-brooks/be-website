const app = require('./app');

const PORT = 9090;

app.listen(PORT, (err) => {
  if (err) {
    throw new Error(err);
  } else {
    console.log(`listening on port ${PORT}`);
  }
});
