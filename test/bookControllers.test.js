const request = require('supertest');
const app = require('../src/index');


describe('GET /books', () => {
    test('Should return all books with each property', async () => {
        const response = await request(app).get('/books');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0)
        expect(Array.isArray(response.body)).toBe(true);
        if(response.body.length > 0){
            const book = response.body[0];
            expect(book).toHaveProperty('id');
            expect(book).toHaveProperty('isbn');
            expect(book).toHaveProperty('name');
            expect(book).toHaveProperty('author');
            expect(book).toHaveProperty('link');
        }
    });
})

describe('GET /books/:id', () => {
    test('Should return the book with the specified ID and its corresponding properties', async () => {
        const bookId = 10;
        const response = await request(app).get(`/books/${bookId}`);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(1);
        const book = response.body[0];
        expect(book).toHaveProperty('id');
        expect(book).toHaveProperty('isbn');
        expect(book).toHaveProperty('name');
        expect(book).toHaveProperty('author');
        expect(book).toHaveProperty('link');
    })
})