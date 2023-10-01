const votesModel = require('../models/votes-model');

async function getVotes(req, res, next) {
  const { project_slug: projectSlug } = req.params;

  try {
    const { votesSum, voteIps } = await votesModel.getVotes(projectSlug);
    res.status(200).send({ votes_sum: votesSum, vote_ips: voteIps });
  } catch (err) {
    next(err);
  }
}

module.exports = { getVotes };
