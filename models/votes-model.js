const db = require('../db/connection');
const { rejectIfNotValidSlug, rejectIfNotInTable } = require('./util/validate');

async function getVotes(project_slug) {
  await rejectIfNotValidSlug({ project_slug });
  await rejectIfNotInTable(project_slug, 'slug', 'projects');

  const { rows: votes } = await db.query(
    `
      SELECT
        v.ip,
        v.value
      FROM projects_votes v
      INNER JOIN projects p
      ON v.project_id = p.id
      WHERE p.slug = $1;
    `,
    [project_slug]
  );

  const votesSum = votes.reduce((acc, vote) => acc + vote.value, 0);
  const voteIps = votes.map((vote) => vote.ip);

  return { votesSum, voteIps };
}

module.exports = { getVotes };
