const request = require('supertest');
const app = require('../app.js');

describe('ALL invalid endpoint', () => {
    it('404: should return correct error message', async () => {
        const {body} = await request(app)
        .get('/api/not_an_endpoint')
        .expect(404);

        console.log(body);

        expect(body.msg).toBe('endpoint not found');
    });
});