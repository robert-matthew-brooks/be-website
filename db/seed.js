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

async function seed({ projectData }) {
  await db.query('DROP TABLE IF EXISTS projects;');

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

  // INSERT INTO tables

  const insertProjectsQueryStr = format(
    `
        INSERT INTO projects (
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

  await db.query(insertProjectsQueryStr);
}

module.exports = seed;
