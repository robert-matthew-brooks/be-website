const db = require('../db/connection');
const {
  rejectIfNotNumber,
  rejectIfLessThan,
  rejectIfNotInTable,
  sortByGreenlist,
  orderGreenlist,
  rejectIfNotInGreenList,
} = require('./validate');

async function getProjects(
  language = '%',
  limit = 6,
  page = 1,
  sort_by = 'created_at',
  order = 'DESC'
) {
  language = language.toLowerCase();
  sort_by = sort_by.toLocaleLowerCase();
  if (sort_by === 'date') sort_by = 'created_at';
  order = order.toUpperCase();

  const validationTests = [
    rejectIfNotNumber({ limit, page }),
    rejectIfLessThan({ limit, page }, 1),
    rejectIfNotInGreenList({ sort_by }, sortByGreenlist),
    rejectIfNotInGreenList({ order }, orderGreenlist),
  ];

  if (language !== '%') {
    validationTests.push(rejectIfNotInTable(language, 'slug', 'languages'));
  }

  await Promise.all(validationTests);

  const projectsQuery = db.query(
    `
      SELECT
        p.id,
        p.created_at,
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
      ORDER BY ${sort_by} ${order}
      LIMIT ${limit} OFFSET ${limit * (page - 1)};
    `
  );

  const projectCountQuery = db.query(
    `
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
    `
  );

  const [projectsResponse, projectCountResponse] = await Promise.all([
    projectsQuery,
    projectCountQuery,
  ]);

  return {
    projects: projectsResponse.rows,
    project_count: projectCountResponse.rows[0].count,
  };
}

async function getProject(project_id) {
  await rejectIfNotNumber({ project_id });
  await rejectIfNotInTable(project_id, 'id', 'projects');

  const { rows } = await db.query(
    `
      SELECT
        p.id,
        p.created_at,
        p.title,
        p.img_url,
        p.video_url,
        p.body,
        JSON_AGG(l) AS languages
      FROM projects p
      INNER JOIN projects_languages pl
      ON p.id = pl.project_id
      INNER JOIN languages l
      ON l.id = pl.language_id
      WHERE p.id = $1
      GROUP BY p.id;
    `,
    [project_id]
  );

  return { project: rows[0] };
}

module.exports = { getProjects, getProject };
