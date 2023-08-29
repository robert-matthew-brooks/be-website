const db = require('./connection.js');
const format = require('pg-format');

// #1:
// create databases first with create-dbs.sql
// this can be run from terminal:
// `$ npm run create-dbs`

// #2a:
// to seed with basic TEST data in a jest suite, pass the test data:
// `await seed(your_test_data);`

// #2b:
// to seed with realistic looking DEVELOPMENT data, use seed-dev-db.js
// this can be run from the terminal:
// `$ npm run seed-dev-db`

async function seed({ projectData, languageData, projectLanguageData }) {
  await db.query('DROP TABLE IF EXISTS projects_languages;');
  await db.query('DROP TABLE IF EXISTS projects;');
  await db.query('DROP TABLE IF EXISTS languages;');

  // CREATE tables

  await db.query(`
    CREATE TABLE projects (
      project_id SERIAL PRIMARY KEY,
      created_at TIMESTAMP DEFAULT NOW(),
      title VARCHAR,
      img_url VARCHAR,
      video_url VARCHAR,
      body VARCHAR
    );
  `);

  await db.query(`
    CREATE TABLE languages (
      language_id SERIAL PRIMARY KEY,
      name VARCHAR,
      icon_url VARCHAR
    );
  `);

  await db.query(`
    CREATE TABLE projects_languages (
      project_language_id SERIAL PRIMARY KEY,
      project_id INT REFERENCES projects(project_id),
      language_id INT REFERENCES languages(language_id)
    );
  `);

  // INSERT INTO tables

  const insertProjectsQueryStr = format(
    `INSERT INTO projects (
      title,
      img_url,
      video_url,
      body
    )
    VALUES %L;`,
    projectData.map((project) => [
      project.title,
      project.img_url,
      project.video_url,
      project.body,
    ])
  );

  const insertLanguagesQueryStr = format(
    `INSERT INTO languages (
      name,
      icon_url
    )
    VALUES %L;`,
    languageData.map((language) => [language.name, language.icon_url])
  );

  const insertProjectsLanguagesQueryStr = format(
    `INSERT INTO projects_languages (
      project_id,
      language_id
    )
    VALUES %L;`,
    projectLanguageData.map((junction) => [
      junction.project_id,
      junction.language_id,
    ])
  );

  await db.query(insertProjectsQueryStr);
  await db.query(insertLanguagesQueryStr);
  await db.query(insertProjectsLanguagesQueryStr);
}

module.exports = seed;
