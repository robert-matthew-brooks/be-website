const projectsModel = require('../models/projects-model');

async function getProjects(req, res, next) {
  const { language_id, limit, p } = req.query;

  try {
    const projects = await projectsModel.getProjects(language_id, limit, p);
    res.status(200).send({ projects });
  } catch (err) {
    next(err);
  }
}

module.exports = { getProjects };
