const db = require('./connection');
const seed = require('./seed');
const data = require('./data/dev');

async function runSeed() {
  await seed(data);
  db.end();
}

runSeed();
