const { projectData } = require('./projects');

const projectLanguageData = [];

for (const project of projectData) {
  const project_id = projectData.indexOf(project) + 1;

  for (const language_id of project.language_ids) {
    projectLanguageData.push({
      project_id,
      language_id,
    });
  }
}

module.exports = { projectLanguageData };
