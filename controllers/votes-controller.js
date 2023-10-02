const votesModel = require('../models/votes-model');

async function getVotes(req, res, next) {
  const { project_id: projectId } = req.params;
  const { user_ip: userIp } = req.query;

  try {
    const { votesSum, userVotes } = await votesModel.getVotes(
      projectId,
      userIp
    );
    res.status(200).send({ votes_sum: votesSum, user_votes: userVotes });
  } catch (err) {
    next(err);
  }
}

async function putVotes(req, res, next) {
  const { project_id: projectId } = req.params;
  const { user_ip: userIp, value } = req.body;

  try {
    const { newVote } = await votesModel.putVotes(projectId, userIp, value);
    res.status(204).send({ new_vote: newVote });
  } catch (err) {
    next(err);
  }
}

module.exports = { getVotes, putVotes };
