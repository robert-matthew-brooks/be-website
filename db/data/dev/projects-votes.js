const { projectData } = require('./projects');

const projectVotesData = [];

for (const project of projectData) {
  const project_id = projectData.indexOf(project) + 1;

  for (const vote of project.votes) {
    projectVotesData.push({
      project_id,
      value: vote.value,
      ip: vote.ip,
    });
  }
}

module.exports = { projectVotesData };
