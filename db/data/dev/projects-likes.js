const { projectData } = require('./projects');

const projectLikesData = [];

for (const project of projectData) {
  const project_id = projectData.indexOf(project) + 1;

  for (const ip_address of project.likes_ips) {
    projectLikesData.push({
      project_id,
      ip_address,
    });
  }
}

module.exports = { projectLikesData };
