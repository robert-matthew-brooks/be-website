const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seed');
const testData = require('../db/data/test');

beforeEach(async () => {
  await seed(testData);
});

afterAll(() => {
  db.end();
});

describe('ALL invalid endpoint', () => {
  it('404: should return correct error message', async () => {
    const { body } = await request(app).get('/api/not_an_endpoint').expect(404);
    expect(body.msg).toBe('endpoint not found');
  });
});

describe('GET /api', () => {
  it('200: should return details of endpoints', async () => {
    const endpoints = require('../endpoints.json');
    const { body } = await request(app).get('/api').expect(200);
    expect(body).toEqual(endpoints);
  });
});

describe('GET /api/projects', () => {
  it('200: should return an array of projects with correct properties', async () => {
    const expectedObject = {
      id: expect.any(Number),
      title: expect.any(String),
      img_url: expect.any(String),
      languages: expect.any(Array),
    };

    const { body } = await request(app).get('/api/projects').expect(200);

    for (const project of body.projects) {
      expect(project).toMatchObject(expectedObject);

      for (const language of project.languages) {
        expect(language).toMatchObject({
          id: expect.any(Number),
          name: expect.any(String),
          icon_url: expect.any(String),
        });
      }
    }
  });

  describe('pagination', () => {
    it('200: should return 6 results by default', async () => {
      const { body } = await request(app).get('/api/projects').expect(200);
      expect(body.projects).toHaveLength(6);
    });

    it('200: should return specified number of results', async () => {
      const { body: results5 } = await request(app)
        .get('/api/projects?limit=5')
        .expect(200);
      expect(results5.projects).toHaveLength(5);

      const { body: results15 } = await request(app)
        .get('/api/projects?limit=15')
        .expect(200);
      expect(results15.projects).toHaveLength(15);
    });
  });

  describe('filtering', () => {
    it('200: should filter by specified language_id', async () => {
      const { body: results9 } = await request(app).get(
        '/api/projects?language_id=9'
      );

      expect(results9.projects).toHaveLength(5);

      for (const project of results9.projects) {
        for (const language of project.languages) {
          expect(language.id).toBe(9);
        }
      }
    });
  });

  describe('error handling', () => {
    it('500: should return an error when projects table not found', async () => {
      await db.query('DROP TABLE projects CASCADE;');
      const { body } = await request(app).get('/api/projects').expect(500);
      expect(body.msg).toBe('undefined table');
    });

    it('400: should return correct error when limit is not a number', async () => {
      const { body } = await request(app)
        .get('/api/projects?limit=a')
        .expect(400);
      expect(body.msg).toBe('invalid limit');
    });

    it('400: should return correct error when limit is less than 1', async () => {
      const { body } = await request(app)
        .get('/api/projects?limit=0')
        .expect(400);
      expect(body.msg).toBe('invalid limit');
    });

    it('400: should return correct error when p is not a number', async () => {
      const { body } = await request(app).get('/api/projects?p=a').expect(400);
      expect(body.msg).toBe('invalid p');
    });

    it('400: should return correct error when p is less than 1', async () => {
      const { body } = await request(app).get('/api/projects?p=0').expect(400);
      expect(body.msg).toBe('invalid p');
    });

    it('404: should return an error when language_id is not a number', async () => {
      const { body } = await request(app)
        .get('/api/projects?language_id=a')
        .expect(400);
      expect(body.msg).toBe('invalid language_id');
    });

    it('404: should return an error when language_id is not in table', async () => {
      const { body } = await request(app)
        .get('/api/projects?language_id=999')
        .expect(404);
      expect(body.msg).toBe('specified id not found in languages table');
    });
  });
});

describe('GET /api/languages', () => {
  it('200: should return an array of languages with correct properties', async () => {
    const expectedObject = {
      id: expect.any(Number),
      name: expect.any(String),
      icon_url: expect.any(String),
      project_count: expect.any(Number),
    };

    const { body } = await request(app).get('/api/languages').expect(200);

    for (const language of body.languages) {
      expect(language).toMatchObject(expectedObject);
    }
  });

  it('200: should provide all (10) results', async () => {
    const { body } = await request(app).get('/api/languages').expect(200);
    expect(body.languages).toHaveLength(10);
  });

  describe('error handling', () => {
    it('500: should return an error when languages table not found', async () => {
      await db.query('DROP TABLE languages CASCADE;');
      const { body } = await request(app).get('/api/languages').expect(500);
      expect(body.msg).toBe('undefined table');
    });
  });
});
