const request = require('supertest');
const app = require('../src/index');


describe('GET /books', () => {
    test('Should return all books', async () => {
        const response = await request(app).get('/books');
        expect(response.statusCode).toBe(200);
    })
})