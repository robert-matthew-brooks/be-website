const db = require('./connection.js');
const seed = require('./seed.js');

async function runSeed() {
    await seed();
    db.end();
}

runSeed();