const { toBeOneOf } = require('jest-extended');
expect.extend({ toBeOneOf });
const db = require('../db/connection');
const seed = require('../db/seed');
const testData = require('../db/data/test');

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
      id: expect.any(Number),
      created_at: expect.any(Object),
      live_link: expect.toBeOneOf([expect.any(String), null]),
      github_link: expect.toBeOneOf([expect.any(String), null]),
      title: expect.any(String),
      img_url: expect.toBeOneOf([expect.any(String), null]),
      img_alt: expect.toBeOneOf([expect.any(String), null]),
      video_url: expect.toBeOneOf([expect.any(String), null]),
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
      id: expect.any(Number),
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
  // 3 languages removed from last project to test empty languages array
  it('should contain 57 rows', async () => {
    const { rows } = await db.query('SELECT * FROM projects_languages;');
    expect(rows).toHaveLength(57);
  });

  it('should return a junction data with correct properties', async () => {
    const expectedObject = {
      id: expect.any(Number),
      project_id: expect.any(Number),
      language_id: expect.any(Number),
    };

    const { rows } = await db.query('SELECT * FROM projects_languages');

    for (const junction of rows) {
      expect(junction).toMatchObject(expectedObject);
    }
  });
});
