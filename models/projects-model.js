const db = require('../db/connection');

async function getProjects() {
  const { rows: projects } = await db.query(`
    SELECT
      id,
      created_at,
      title,
      img_url,
      video_url,
      body
    FROM projects;
  `);

  return projects;
}

module.exports = { getProjects };
