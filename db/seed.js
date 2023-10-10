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

async function seed({
  projectData,
  languageData,
  projectLanguageData,
  projectVotesData,
}) {
  await db.query('DROP TABLE IF EXISTS projects_votes;');
  await db.query('DROP TABLE IF EXISTS projects_languages;');
  await db.query('DROP TABLE IF EXISTS projects;');
  await db.query('DROP TABLE IF EXISTS languages;');
  await db.query('DROP DOMAIN IF EXISTS vote_value;');

  // CREATE tables

  await db.query(`
    CREATE TABLE projects (
      id SERIAL PRIMARY KEY,
      slug VARCHAR UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      title VARCHAR NOT NULL,
      description VARCHAR NOT NULL,
      live_link VARCHAR,
      github_link VARCHAR,
      img_url VARCHAR,
      img_alt VARCHAR,
      video_url VARCHAR,
      body VARCHAR NOT NULL
    );
  `);

  await db.query(`
    CREATE TABLE languages (
      id SERIAL PRIMARY KEY,
      slug VARCHAR NOT NULL,
      name VARCHAR NOT NULL,
      icon VARCHAR NOT NULL
    );
  `);

  await db.query(`
    CREATE TABLE projects_languages (
      id SERIAL PRIMARY KEY,
      project_id INT REFERENCES projects(id) NOT NULL,
      language_id INT REFERENCES languages(id) NOT NULL
    );
  `);

  await db.query(`
  CREATE DOMAIN vote_value
  AS INT
  CHECK (
    VALUE BETWEEN -1 AND 1
  );

  CREATE TABLE projects_votes (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id) NOT NULL,
    value vote_value NOT NULL,
    ip VARCHAR NOT NULL
  );
`);

  // INSERT INTO tables

  const insertProjectsQueryStr = format(
    `INSERT INTO projects (
      created_at,
      slug,
      title,
      description,
      img_url,
      img_alt,
      video_url,
      live_link,
      github_link,
      body
    )
    VALUES %L;`,
    projectData.map((project) => [
      project.created_at,
      project.slug,
      project.title,
      project.description,
      project.img_url,
      project.img_alt,
      project.video_url,
      project.live_link,
      project.github_link,
      project.body,
    ])
  );

  const insertLanguagesQueryStr = format(
    `INSERT INTO languages (
      slug,
      name,
      icon
    )
    VALUES %L;`,
    languageData.map((language) => [
      language.slug,
      language.name,
      language.icon,
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

  const insertVotesQueryStr = format(
    `INSERT INTO projects_votes (
      project_id,
      value,
      ip
    )
    VALUES %L;`,
    projectVotesData.map((junction) => [
      junction.project_id,
      junction.value,
      junction.ip,
    ])
  );

  await Promise.all([
    db.query(insertProjectsQueryStr),
    db.query(insertLanguagesQueryStr),
  ]);

  await Promise.all([
    db.query(insertProjectsLanguagesQueryStr),
    db.query(insertVotesQueryStr),
  ]);
}

module.exports = seed;
