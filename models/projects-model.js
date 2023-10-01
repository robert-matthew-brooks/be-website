const db = require('../db/connection');
const {
  rejectIfNotDigit,
  rejectIfNotValidSlug,
  rejectIfLessThan,
  rejectIfNotInTable,
  sortByGreenlist,
  orderGreenlist,
  rejectIfNotInGreenList,
} = require('./util/validate');
const { parseVideoUrl } = require('./util/parse-video-url');

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
    rejectIfNotDigit({ limit, page }),
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
        p.slug,
        p.created_at,
        p.title,
        p.description,
        p.img_url,
        p.img_alt,
        JSON_AGG(DISTINCT l) AS languages,
        COUNT(DISTINCT lk.ip_address)::INT AS total_likes
      FROM projects p
      LEFT JOIN projects_languages pl
      ON p.id = pl.project_id
      LEFT JOIN languages l
      ON l.id = pl.language_id
      LEFT JOIN projects_likes lk
      ON p.id = lk.project_id
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
        LEFT JOIN languages l
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

async function getProject(project_slug) {
  await rejectIfNotValidSlug({ project_slug });
  await rejectIfNotInTable(project_slug, 'slug', 'projects');

  const { rows } = await db.query(
    `
      SELECT
        p.id,
        p.slug,
        p.created_at,
        p.title,
        p.description,
        p.img_url,
        p.img_alt,
        p.video_url,
        p.live_link,
        p.github_link,
        p.body,
        JSON_AGG(l) AS languages,
        JSON_AGG(DISTINCT lk.ip_address) AS liked_ips
      FROM projects p
      INNER JOIN projects_languages pl
      ON p.id = pl.project_id
      LEFT JOIN languages l
      ON l.id = pl.language_id
      LEFT JOIN projects_likes lk
      ON p.id = lk.project_id
      WHERE p.slug = $1
      GROUP BY p.id;
    `,
    [project_slug]
  );

  const project = { ...rows[0] };
  if (project.video_url) {
    project.video_url = parseVideoUrl(project.video_url);
  }

  return { project };
}

module.exports = { getProjects, getProject };
