const db = require('../db/connection');

async function getProjects() {
  const { rows: projects } = await db.query(`
    SELECT
      p.id,
      p.created_at,
      p.title,
      p.img_url,
      p.video_url,
      p.body,
      ARRAY_AGG(
        JSON_BUILD_OBJECT(
          'name', l.name,
          'icon_url', l.icon_url
        )
      ) AS languages
    FROM projects p
    INNER JOIN projects_languages pl
    ON p.id = pl.project_id
    INNER JOIN languages l
    ON l.id = pl.language_id
    GROUP BY p.id;
  `);

  return projects;
}

module.exports = { getProjects };
