const db = require('../db/connection');

async function getLanguages() {
  const { rows: languages } = await db.query(`
    SELECT
      l.id,
      l.slug,
      l.name,
      l.icon,
      COUNT(*)::INT AS project_count
    FROM languages l
    INNER JOIN projects_languages pl
    ON l.id = pl.language_id
    GROUP BY l.id
    ORDER BY
      project_count DESC,
      l.name ASC;
  `);

  return languages;
}

module.exports = { getLanguages };
