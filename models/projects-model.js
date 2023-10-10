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

// used for rendering a list of projects on frontend
async function getProjects(
  featured = false,
  language = '%',
  limit = 6,
  page = 1,
  sortBy = 'created_at',
  order = 'DESC'
) {
  featured = featured ? "AND p.is_featured = 'true'" : '';
  language = language.toLowerCase();
  sortBy = sortBy.toLocaleLowerCase();
  if (sortBy === 'date') sortBy = 'created_at';
  order = order.toUpperCase();

  await Promise.all([
    rejectIfNotDigit({ limit, page }),
    rejectIfLessThan({ limit, page }, 1),
    rejectIfNotInGreenList({ sortBy }, sortByGreenlist),
    rejectIfNotInGreenList({ order }, orderGreenlist),
  ]);

  if (language !== '%') {
    await rejectIfNotInTable(language, 'slug', 'languages');
  }

  const projectsQuery = db.query(
    `
      SELECT
        p_pl.id,
        p_pl.slug,
        p_pl.created_at,
        p_pl.is_featured,
        p_pl.title,
        p_pl.description,
        p_pl.img_url,
        p_pl.img_alt,
        p_pl.languages,
        p_v.votes_sum
      
      FROM (
        SELECT
          p.id,
          p.slug,
          p.created_at,
          p.is_featured,
          p.title,
          p.description,
          p.img_url,
          p.img_alt,
          JSON_AGG(l) AS languages
        FROM projects p
        LEFT JOIN projects_languages pl
        ON p.id = pl.project_id
        LEFT JOIN languages l
        ON l.id = pl.language_id
        GROUP BY p.id
        HAVING BOOL_OR(LOWER(l.slug) LIKE '${language}') 
        ${featured}
      ) p_pl
      
      INNER JOIN (
        SELECT
          p.id,
          SUM(v.value)::INT AS votes_sum
        FROM projects p
        LEFT JOIN projects_votes v
        ON p.id = v.project_id
        GROUP BY p.id
      ) p_v
      
      ON p_pl.id = p_v.id

      ORDER BY ${sortBy} ${order}
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
        ${featured}
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
    projectCount: projectCountResponse.rows[0].count,
  };
}

// used for rendering a single project on frontend
async function getProject(projectSlug) {
  await rejectIfNotValidSlug({ projectSlug });
  await rejectIfNotInTable(projectSlug, 'slug', 'projects');

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
        JSON_AGG(DISTINCT l) AS languages
      FROM projects p
      INNER JOIN projects_languages pl
      ON p.id = pl.project_id
      LEFT JOIN languages l
      ON l.id = pl.language_id
      WHERE p.slug = $1
      GROUP BY p.id;
    `,
    [projectSlug]
  );

  const project = { ...rows[0] };
  if (project.video_url) {
    project.video_url = parseVideoUrl(project.video_url);
  }

  return { project };
}

module.exports = { getProjects, getProject };
