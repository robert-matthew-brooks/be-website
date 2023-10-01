const votesModel = require('../models/votes-model');

async function getVotes(req, res, next) {
  const { project_slug: projectSlug, user_ip: userIp } = req.params;

  try {
    const { votesSum, userVotes } = await votesModel.getVotes(
      projectSlug,
      userIp
    );
    res.status(200).send({ votes_sum: votesSum, user_votes: userVotes });
  } catch (err) {
    next(err);
  }
}

module.exports = { getVotes };
