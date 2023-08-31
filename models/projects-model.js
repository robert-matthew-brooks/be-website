const db = require('../db/connection');
const {
  rejectIfNotNumber,
  rejectIfLessThan,
  rejectIfNotInTable,
} = require('./validate');

async function getProjects(language = '%', limit = 6, page = 1) {
  language = language.toLowerCase();

  const validationTests = [
    rejectIfNotNumber({ limit, page }),
    rejectIfLessThan({ limit, page }, 1),
  ];

  if (language !== '%') {
    validationTests.push(rejectIfNotInTable(language, 'slug', 'languages'));
  }

  await Promise.all(validationTests);

  const orderBy = 'created_at';

  const offset = limit * (page - 1);

  const projectsQuery = db.query(`
    SELECT
      p.id,
      p.title,
      p.img_url,
      JSON_AGG(l) AS languages
    FROM projects p
    INNER JOIN projects_languages pl
    ON p.id = pl.project_id
    INNER JOIN languages l
    ON l.id = pl.language_id
    GROUP BY p.id
    HAVING BOOL_OR(LOWER(l.slug) LIKE '${language}')
    ORDER BY ${orderBy}
    LIMIT ${limit} OFFSET ${offset};
  `);

  const projectCountQuery = db.query(`
    SELECT COUNT(*)::INT
    FROM (
      SELECT p.id
      FROM projects p
      INNER JOIN projects_languages pl
      ON p.id = pl.project_id
      INNER JOIN languages l
      ON l.id = pl.language_id
      WHERE LOWER(l.slug) LIKE '${language}'
      GROUP BY p.id
    ) t;
  `);

  const [projectsResponse, projectCountResponse] = await Promise.all([
    projectsQuery,
    projectCountQuery,
  ]);

  return {
    projects: projectsResponse.rows,
    project_count: projectCountResponse.rows[0].count,
  };
}

module.exports = { getProjects };
