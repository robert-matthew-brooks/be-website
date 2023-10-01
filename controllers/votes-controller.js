const votesModel = require('../models/votes-model');

async function getVotes(req, res, next) {
  const { project_slug } = req.params;

  try {
    const { votes_count, votes_ips } = await votesModel.getVotes(project_slug);
    res.status(200).send({ votes_count, votes_ips });
  } catch (err) {
    next(err);
  }
}

module.exports = { getVotes };
