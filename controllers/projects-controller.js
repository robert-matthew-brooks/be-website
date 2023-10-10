const projectsModel = require('../models/projects-model');

async function getProjects(req, res, next) {
  const { featured, language, limit, page, sort_by: sortBy, order } = req.query;

  try {
    const { projects, projectCount } = await projectsModel.getProjects(
      featured,
      language,
      limit,
      page,
      sortBy,
      order
    );
    res.status(200).send({ projects, project_count: projectCount });
  } catch (err) {
    next(err);
  }
}

async function getProject(req, res, next) {
  const { project_slug: projectSlug } = req.params;

  try {
    const { project } = await projectsModel.getProject(projectSlug);
    res.status(200).send({ project });
  } catch (err) {
    next(err);
  }
}

module.exports = { getProjects, getProject };
