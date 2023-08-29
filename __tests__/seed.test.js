const db = require('../db/connection.js');
const seed = require('../db/seed.js');
const testData = require('../db/data/test/index.js');

beforeEach(async () => {
  await seed(testData);
});

afterAll(() => {
  db.end();
});

describe('projects table', () => {
  it('should contain 20 rows', async () => {
    const { rows } = await db.query('SELECT * FROM projects;');
    expect(rows).toHaveLength(20);
  });

  it('should return projects with correct properties', async () => {
    const expectedObject = {
      project_id: expect.any(Number),
      created_at: expect.any(Object),
      title: expect.any(String),
      img_url: expect.any(String),
      video_url: expect.any(String),
      body: expect.any(String),
    };

    const { rows } = await db.query('SELECT * FROM projects;');

    for (const project of rows) {
      expect(project).toMatchObject(expectedObject);
    }
  });
});

describe('languages table', () => {
  it('should contain 10 rows', async () => {
    const { rows } = await db.query('SELECT * FROM languages;');
    expect(rows).toHaveLength(10);
  });

  it('should return languages with correct properties', async () => {
    const expectedObject = {
      language_id: expect.any(Number),
      name: expect.any(String),
      icon_url: expect.any(String),
    };

    const { rows } = await db.query('SELECT * FROM languages;');

    for (const language of rows) {
      expect(language).toMatchObject(expectedObject);
    }
  });
});

describe('projects-languages junction table', () => {
  it('should contain 60 rows', async () => {
    const { rows } = await db.query('SELECT * FROM projects_languages;');
    expect(rows).toHaveLength(60);
  });

  it('should return a junction data with correct properties', async () => {
    const expectedObject = {
      project_language_id: expect.any(Number),
      project_id: expect.any(Number),
      language_id: expect.any(Number),
    };

    const { rows } = await db.query('SELECT * FROM projects_languages');

    for (const junction of rows) {
      expect(junction).toMatchObject(expectedObject);
    }
  });
});
