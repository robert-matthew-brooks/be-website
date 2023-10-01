const likesModel = require('../models/likes-model');

async function getLikes(req, res, next) {
  const { project_slug } = req.params;

  try {
    const { likes_ips, likes_count } = await likesModel.getLikes(project_slug);
    res.status(200).send({ likes_ips, likes_count });
  } catch (err) {
    next(err);
  }
}

module.exports = { getLikes };
