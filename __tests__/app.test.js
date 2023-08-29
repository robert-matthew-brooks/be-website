const request = require('supertest');
const app = require('../app.js');
const db = require('../db/connection.js');
const seed = require('../db/seed.js');
const testData = require('../db/data/test/index.js');

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
      project_id: expect.any(Number),
      created_at: expect.any(String),
      title: expect.any(String),
      img_url: expect.any(String),
      video_url: expect.any(String),
      body: expect.any(String),
      // languages handled below
    };

    const { body } = await request(app).get('/api/projects').expect(200);

    for (const project of body.projects) {
      expect(project).toMatchObject(expectedObject);

      // for (const language of project.languages) {
      //   expect(language).toMatchObject({
      //     language_id: expect.any(String),
      //     icon_url: expect.any(Number),
      //   });
      // }
    }
  });
});
