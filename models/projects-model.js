const db = require('../db/connection.js');

async function getProjects() {
  const { rows } = await db.query('SELECT * FROM projects;');
  return rows;
}

module.exports = { getProjects };
