const projectsModel = require('../models/projects-model');

async function getProjects(req, res, next) {
  const { limit, p } = req.query;
  const projects = await projectsModel.getProjects(limit, p);
  res.status(200).send({ projects });
}

module.exports = { getProjects };
