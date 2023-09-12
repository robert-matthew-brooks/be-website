const { toBeOneOf } = require('jest-extended');
expect.extend({ toBeOneOf });
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
  it('404: should return an error message', async () => {
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
    const { body } = await request(app).get('/api/projects').expect(200);

    for (const project of body.projects) {
      expect(project).toMatchObject({
        id: expect.any(Number),
        title: expect.any(String),
        slug: expect.any(String),
        img_url: expect.toBeOneOf([expect.any(String), null]),
        img_alt: expect.toBeOneOf([expect.any(String), null]),
        languages: expect.any(Array),
      });

      for (const language of project.languages) {
        expect(language).toMatchObject({
          id: expect.any(Number),
          name: expect.any(String),
          slug: expect.any(String),
          icon_url: expect.any(String),
        });
      }
    }
  });

  it('200: should return the number of articles before pagination', async () => {
    const { body: resultsAll } = await request(app)
      .get('/api/projects')
      .expect(200);
    expect(resultsAll.project_count).toBe(19);

    const { body: results5 } = await request(app)
      .get('/api/projects?language=l5')
      .expect(200);
    expect(results5.project_count).toBe(6);
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

    // check changing page is different results
  });

  describe('filtering', () => {
    it('200: should filter by specified language slug', async () => {
      const { body: results9 } = await request(app).get(
        '/api/projects?language=l9'
      );

      expect(results9.projects).toHaveLength(5);

      for (const project of results9.projects) {
        let foundLanguage = false;
        for (const language of project.languages) {
          if (language.id === 9) foundLanguage = true;
        }
        expect(foundLanguage).toBeTruthy();
      }
    });
  });

  describe('sorting', () => {
    it('200: should sort results in descending date order by default', async () => {
      const { body } = await request(app).get('/api/projects').expect(200);
      expect(body.projects).toBeSorted({ key: 'created_at', descending: true });
    });

    it('200: should sort results in ascending date order', async () => {
      const { body } = await request(app)
        .get('/api/projects?order=asc')
        .expect(200);
      expect(body.projects).toBeSorted({ key: 'created_at' });
    });

    it('200: should sort results in descending alphabetical order', async () => {
      const { body } = await request(app)
        .get('/api/projects?sort_by=title')
        .expect(200);
      expect(body.projects).toBeSorted({ key: 'title', descending: true });
    });

    it('200: should sort results in ascending alphabetical order', async () => {
      const { body } = await request(app)
        .get('/api/projects?sort_by=title&order=asc')
        .expect(200);
      expect(body.projects).toBeSorted({ key: 'title' });
    });
  });

  describe('error handling', () => {
    it('500: should return an error when projects table not found', async () => {
      await db.query('DROP TABLE projects CASCADE;');
      const { body } = await request(app).get('/api/projects').expect(500);
      expect(body.msg).toBe('undefined table');
    });

    it('400: should return an error when limit is not a number', async () => {
      const { body } = await request(app)
        .get('/api/projects?limit=a')
        .expect(400);
      expect(body.msg).toBe('invalid limit');
    });

    it('400: should return an error when limit is less than 1', async () => {
      const { body } = await request(app)
        .get('/api/projects?limit=0')
        .expect(400);
      expect(body.msg).toBe('invalid limit');
    });

    it('400: should return an error when page is not a number', async () => {
      const { body } = await request(app)
        .get('/api/projects?page=a')
        .expect(400);
      expect(body.msg).toBe('invalid page');
    });

    it('400: should return an error when page is less than 1', async () => {
      const { body } = await request(app)
        .get('/api/projects?page=0')
        .expect(400);
      expect(body.msg).toBe('invalid page');
    });

    it('404: should return an error when language slug is not in table', async () => {
      const { body } = await request(app)
        .get('/api/projects?language=a')
        .expect(404);
      expect(body.msg).toBe('specified slug not found in languages table');
    });

    it('400: should return an error when sort_by option is not allowed', async () => {
      const { body } = await request(app)
        .get('/api/projects?sort_by=colour')
        .expect(400);
      expect(body.msg).toBe('invalid sort_by');
    });

    it('400: should return an error when order option is not allowed', async () => {
      const { body } = await request(app)
        .get('/api/projects?order=up')
        .expect(400);
      expect(body.msg).toBe('invalid order');
    });
  });
});

describe('GET /api/languages', () => {
  it('200: should return an array of languages with correct properties', async () => {
    const { body } = await request(app).get('/api/languages').expect(200);

    for (const language of body.languages) {
      expect(language).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        slug: expect.any(String),
        icon_url: expect.any(String),
        project_count: expect.any(Number),
      });
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

describe('GET /api/projects/:project_id', () => {
  it('200: should return an object with correct properties', async () => {
    const { body } = await request(app).get('/api/projects/proj-1').expect(200);

    expect(body.project).toMatchObject({
      id: expect.any(Number),
      created_at: expect.any(String),
      title: expect.any(String),
      slug: expect.any(String),
      live_link: expect.toBeOneOf([expect.any(String), null]),
      github_link: expect.toBeOneOf([expect.any(String), null]),
      img_url: expect.toBeOneOf([expect.any(String), null]),
      img_alt: expect.toBeOneOf([expect.any(String), null]),
      video_url: expect.toBeOneOf([expect.any(String), null]),
      body: expect.any(String),
    });

    for (const language of body.project.languages) {
      expect(language).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        slug: expect.any(String),
        icon_url: expect.any(String),
      });
    }
  });

  describe('error handling', () => {
    it('400: should return an error when project_slug is not letters, numbers and hyphens', async () => {
      const { body } = await request(app)
        .get('/api/projects/( i n v a l i d )')
        .expect(400);
      expect(body.msg).toBe('invalid project_slug');
    });

    it('404: should return an error when project_slug is not in table', async () => {
      const { body } = await request(app)
        .get('/api/projects/unknown-project')
        .expect(404);
      expect(body.msg).toBe('specified slug not found in projects table');
    });
  });
});
