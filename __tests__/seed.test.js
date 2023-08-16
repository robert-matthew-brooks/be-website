const db = require('../db/connection.js');
const seed = require('../db/seed.js');
const testData = require('../db/data/test-data.js');

beforeEach(async () => {
    await seed(testData);
});

afterAll(() => {
    db.end();
});

describe('projects table', () => {
    it('should contain 20 rows', async () => {
        const { rows } = await db.query('SELECT * FROM projects;');
        expect(rows.length).toBe(20);
    });

    it('should return objects with correct properties', async () => {
        const expectedObject = {
            project_id: expect.any(Number),
            created_at: expect.any(Object),
            title: expect.any(String),
            img_url: expect.any(String),
            video_url: expect.any(String),
            body_url: expect.any(String),
        };

        const { rows } = await db.query('SELECT * FROM projects;');
        
        for (const object of rows) {
            expect(object).toMatchObject(expectedObject);
        }
    });
});