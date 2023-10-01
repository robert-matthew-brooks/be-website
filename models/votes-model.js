const db = require('../db/connection');
const { rejectIfNotValidSlug, rejectIfNotInTable } = require('./util/validate');

async function getVotes(projectSlug, userIp) {
  await rejectIfNotValidSlug({ projectSlug });
  await rejectIfNotInTable(projectSlug, 'slug', 'projects');

  const { rows } = await db.query(
    `
      SELECT
        sum.votes_sum,
        value.value
      
      FROM (
        SELECT
          p.id,
          SUM(v.value)::INT AS votes_sum
        FROM projects p
        INNER JOIN projects_votes v
        ON p.id = v.project_id
        WHERE p.slug = $1
        GROUP BY p.id
      ) sum

      LEFT JOIN (
        SELECT
          p.id,
          v.value
        FROM projects p
        INNER JOIN projects_votes v
        ON p.id = v.project_id
        WHERE v.ip = $2
      ) value

      ON sum.id = value.id;
    `,
    [projectSlug, userIp]
  );

  let votesSum = null;
  let userVotes = null;
  if (rows.length > 0) {
    votesSum = rows[0].votes_sum;
    userVotes = rows[0].value;
  }

  return { votesSum, userVotes };
}

module.exports = { getVotes };
