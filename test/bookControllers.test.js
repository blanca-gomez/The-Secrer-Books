const request = require('supertest');
const app = require('../src/index');

const testBook = require('../postBookTest.json');

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
});

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
    });
});

describe('POST /books', () => {
    test('Should add a new book successfully to the database with all expected properties', async () => {
        const response = await request(app).post('/books').send(testBook);
        expect(response.statusCode).toBe(200);
        const book = response.body;
        expect(book).toHaveProperty('id');
        expect(book).toHaveProperty('isbn', testBook.isbn);
        expect(book).toHaveProperty('name', testBook.name);
        expect(book).toHaveProperty('author', testBook.author);
        expect(book).toHaveProperty('link', testBook.link);
    });
});

describe('DELETE /books/:id', () => {
    let bookId;
    beforeAll(async () => {
        const testBook = {
            "isbn": "1111111111",
            "name": "Book test",
            "author": "Jest",
            "link": "https://www.BookTest.es"
        };
        const response = await request(app).post('/books').send(testBook);
        bookId = response.body.id; 
    });

    test('Should delete the book with the specified ID', async () => {
        const response = await request(app).delete(`/books/${bookId}`);
        expect(response.statusCode).toBe(204);
    });

    test('Should confirm the book was deleted', async () => {
        const response = await request(app).get(`/books/${bookId}`);
        expect(response.statusCode).toBe(404); 
        expect(response.body).toHaveProperty('message', 'Book not found');
    });
});
