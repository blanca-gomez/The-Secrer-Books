const express = require('express');
const router = express.Router();
const pool= require('../db');
const {getAllBooks, getById, addNewBook, deleteBook, updateBook, importBooksFromCsv} = require('../controllers/books.controllers')


router.get('/', getAllBooks);

router.get('/:id', getById);

router.post('/', addNewBook);

router.delete('/:id', deleteBook);

router.put('/:id', updateBook);

router.post('/import', importBooksFromCsv);


module.exports= router;
