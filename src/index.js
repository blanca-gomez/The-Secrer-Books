const express = require('express');
const {PORT} = require('./config');
const booksRoutes = require('./routes/books');

const app= express();

app.use(express.json());
app.use('/books', booksRoutes);


app.listen(PORT);
console.log('Server is listen on port', PORT);