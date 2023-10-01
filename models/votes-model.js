const db = require('../db/connection');
const { rejectIfNotValidSlug, rejectIfNotInTable } = require('./util/validate');

async function getVotes(project_slug) {
  await rejectIfNotValidSlug({ project_slug });
  await rejectIfNotInTable(project_slug, 'slug', 'projects');

  const { rows } = await db.query(
    `
      SELECT pl.ip_address
      FROM projects_votes pl
      INNER JOIN projects p
      ON pl.project_id = p.id
      WHERE p.slug = $1;
    `,
    [project_slug]
  );

  const votes_ips = rows.map((el) => el.ip_address);
  const votes_count = votes_ips.length;

  return { votes_count, votes_ips };
}

module.exports = { getVotes };
