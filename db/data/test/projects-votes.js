const { projectData } = require('./projects');

const projectVotesData = [];

for (const project of projectData) {
  const project_id = projectData.indexOf(project) + 1;

  for (const ip_address of project.votes_ips) {
    projectVotesData.push({
      project_id,
      ip_address,
    });
  }
}

module.exports = { projectVotesData };
