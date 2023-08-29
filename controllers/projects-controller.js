const projectsModel = require('../models/projects-model');

async function getProjects(req, res, next) {
  const projects = await projectsModel.getProjects();
  res.status(200).send({ projects });
}

module.exports = { getProjects };
