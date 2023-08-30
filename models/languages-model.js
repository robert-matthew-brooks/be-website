const db = require('../db/connection');

async function getLanguages() {
  const { rows: languages } = await db.query(`
    SELECT *
    FROM languages;
  `);

  return languages;
}

module.exports = { getLanguages };
