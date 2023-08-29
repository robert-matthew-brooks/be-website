const db = require('./connection.js');
const seed = require('./seed.js');
const data = require('./data/dev');

async function runSeed() {
  await seed(data);
  db.end();
}

runSeed();
