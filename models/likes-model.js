const db = require('../db/connection');
const { rejectIfNotValidSlug, rejectIfNotInTable } = require('./util/validate');

async function getLikes(project_slug) {
  await rejectIfNotValidSlug({ project_slug });
  await rejectIfNotInTable(project_slug, 'slug', 'projects');

  const { rows } = await db.query(
    `
      SELECT pl.ip_address
      FROM projects_likes pl
      INNER JOIN projects p
      ON pl.project_id = p.id
      WHERE p.slug = $1;
    `,
    [project_slug]
  );

  const likes_ips = rows.map((el) => el.ip_address);
  const likes_count = likes_ips.length;

  return { likes_ips, likes_count };
}

module.exports = { getLikes };
