const projectsModel = require('../models/projects-model');

async function getProjects(req, res, next) {
  const { language, limit, page, sort_by, order } = req.query;

  try {
    const { projects, project_count } = await projectsModel.getProjects(
      language,
      limit,
      page,
      sort_by,
      order
    );
    res.status(200).send({ projects, project_count });
  } catch (err) {
    next(err);
  }
}

async function getProject(req, res, next) {
  const { project_id } = req.params;

  try {
    const { project } = await projectsModel.getProject(project_id);
    res.status(200).send({ project });
  } catch (err) {
    next(err);
  }
}

module.exports = { getProjects, getProject };
