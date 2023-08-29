const db = require('../db/connection');

async function getProjects() {
  const { rows } = await db.query('SELECT * FROM projects;');
  return rows;
}

module.exports = { getProjects };
