const db = require('../db/connection');
const {
  rejectIfNotDigit,
  rejectIfNotValidIp,
  rejectIfNotInTable,
} = require('./util/validate');

async function getVotes(projectId, userIp) {
  await Promise.all([
    rejectIfNotDigit({ projectId }),
    rejectIfNotValidIp({ userIp }),
  ]);
  await rejectIfNotInTable(projectId, 'id', 'projects');

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
        WHERE p.id = $1
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
    [projectId, userIp]
  );

  let votesSum = null;
  let userVotes = null;
  if (rows.length) {
    votesSum = rows[0].votes_sum;
    userVotes = rows[0].value;
  }

  return { votesSum, userVotes };
}

async function putVotes(projectId, userIp, value) {
  await Promise.all([
    rejectIfNotDigit({ projectId, value }),
    rejectIfNotValidIp({ userIp }),
  ]);
  await rejectIfNotInTable(projectId, 'id', 'projects');

  // update, check returning values...

  const update = await db.query(
    `
      UPDATE projects_votes
      SET value = value + $1
      FROM projects p
      WHERE project_id = p.id
      AND p.id = $2
      AND ip = $3
      RETURNING
        p.slug,
        ip,
        value;
    `,
    [value, projectId, userIp]
  );

  if (update.rows.length > 0) {
    console.log(update.rows[0]);
    return { new_row: update.rows[0] };
  } else {
    const insert = await db.query(
      `
        INSERT INTO projects_votes (
          project_id,
          value,
          ip
        )
        VALUES (
          $1, $2, $3
        )
        RETURNING *;
      `,
      [projectId, value, userIp]
    );
    console.log(insert.rows[0]);
    return { new_row: insert.rows[0] };
  }
}

module.exports = { getVotes, putVotes };
