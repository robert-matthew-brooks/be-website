const format = require('pg-format');
const db = require('./connection');

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
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP DEFAULT NOW(),
      title VARCHAR,
      live_link VARCHAR,
      github_link VARCHAR,
      img_url VARCHAR,
      img_alt VARCHAR,
      video_url VARCHAR,
      body VARCHAR
    );
  `);

  await db.query(`
    CREATE TABLE languages (
      id SERIAL PRIMARY KEY,
      name VARCHAR,
      slug VARCHAR,
      icon_url VARCHAR
    );
  `);

  await db.query(`
    CREATE TABLE projects_languages (
      id SERIAL PRIMARY KEY,
      project_id INT REFERENCES projects(id),
      language_id INT REFERENCES languages(id)
    );
  `);

  // INSERT INTO tables

  const insertProjectsQueryStr = format(
    `INSERT INTO projects (
      title,
      live_link,
      github_link,
      img_url,
      img_alt,
      video_url,
      body
    )
    VALUES %L;`,
    projectData.map((project) => [
      project.title,
      project.live_link,
      project.github_link,
      project.img_url,
      project.img_alt,
      project.video_url,
      project.body,
    ])
  );

  const insertLanguagesQueryStr = format(
    `INSERT INTO languages (
      name,
      slug,
      icon_url
    )
    VALUES %L;`,
    languageData.map((language) => [
      language.name,
      language.slug,
      language.icon_url,
    ])
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
