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
      created_at: expect.any(String),
      title: expect.any(String),
      img_url: expect.any(String),
      video_url: expect.any(String),
      body: expect.any(String),
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

  describe('error handling', () => {
    // no projects found
    // invalid limit
  });
});

describe('GET /api/languages', () => {
  it('200: should return an array of languages with correct properties', async () => {
    const expectedObject = {
      id: expect.any(Number),
      name: expect.any(String),
      icon_url: expect.any(String),
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
});
