const { projectData } = require('./projects');

const projectLanguageData = [];

for (const project of projectData) {
  const projectId = projectData.indexOf(project) + 1;

  for (const languageId of project.languageIds) {
    projectLanguageData.push({
      projectId,
      languageId,
    });
  }
}

module.exports = { projectLanguageData };
