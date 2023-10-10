const { projectData } = require('./projects');

const projectVotesData = [];

for (const project of projectData) {
  const projectId = projectData.indexOf(project) + 1;

  for (const vote of project.votes) {
    projectVotesData.push({
      projectId,
      value: vote.value,
      ip: vote.ip,
    });
  }
}

module.exports = { projectVotesData };
