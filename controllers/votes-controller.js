const votesModel = require('../models/votes-model');

async function getVotes(req, res, next) {
  const { project_slug: projectSlug } = req.params;

  try {
    const { votesSum, votes } = await votesModel.getVotes(projectSlug);
    res.status(200).send({ votes_sum: votesSum, votes });
  } catch (err) {
    next(err);
  }
}

module.exports = { getVotes };
