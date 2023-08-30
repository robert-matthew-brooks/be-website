const db = require('../db/connection');
const {
  rejectIfNotNumber,
  rejectIfLessThan,
  rejectIfNotInTable,
} = require('./validate');

async function getProjects(language_id = '%', limit = 6, p = 1) {
  const validationTests = [
    rejectIfNotNumber({ limit, p }),
    rejectIfLessThan({ limit, p }, 1),
  ];

  if (language_id !== '%') {
    validationTests.push(rejectIfNotNumber({ language_id }));
    validationTests.push(rejectIfNotInTable(language_id, 'id', 'languages'));
  }

  await Promise.all(validationTests);

  const orderBy = 'created_at';

  const offset = limit * (p - 1);

  const { rows: projects } = await db.query(`
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
    WHERE pl.language_id::VARCHAR LIKE '${language_id}'
    GROUP BY p.id
    ORDER BY ${orderBy}
    LIMIT ${limit} OFFSET ${offset};
  `);

  return projects;
}

module.exports = { getProjects };
