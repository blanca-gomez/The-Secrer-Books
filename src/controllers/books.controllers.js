const pool= require('../db');
const fs = require('fs');
const csv = require('csv');

const getAllBooks = async(req,res) => {
    try{
        const {rows} = await pool.query("SELECT * FROM books");
        res.json(rows);

    }catch(error){
        console.error('Error getting books', error);
    }
};

const getById = async(req,res) => {
    try{
        const {id} = req.params;
        const {rows} = await pool.query("SELECT * FROM books WHERE id = $1", [id])
        if(rows.length === 0 ){
            return res.status(404).json({message:"Book not found"})
        }
        res.json(rows)
    }catch(error){
        console.error('Error getting book', error); 
    }
};

const addNewBook =  async (req,res) => {
    try{
        const data = req.body;
        const {rows} = await pool.query("INSERT INTO books (ISBN, Name, Author, link) VALUES ($1,$2,$3,$4) RETURNING *",
        [data.isbn, data.name, data.author, data.link]);
        return res.json(rows[0])
    }catch(error){
        console.error('Error adding book', error)
    }
};

const deleteBook = async (req,res) => {
    try{
        const {id} = req.params;
        const {rowCount} = await pool.query("DELETE FROM books WHERE id = $1 RETURNING *", [id]);
        if(rowCount === 0 ){
            return res.status(404).json({message:"Book not found"})
        }
        return res.sendStatus(204);
    }
    catch(error){
        console.error('Error deleting book', error);
    }
};

const updateBook = async(req,res) => {
    try{
        const {id} = req.params;
        const data = req.body
        const {rows} = await pool.query('UPDATE books SET ISBN=$1, Name=$2, Author=$3, link=$4 WHERE id=$5 RETURNING *', 
        [data.isbn, data.name, data.author,data.link, id]
        );
        return res.json(rows[0]);

    }catch(error){
        console.error('Error updating book', error);
    }
};


const importBooksFromCsv = async(req,res) =>{
    const result = [];

    fs.createReadStream('./example/books.csv')
        .pipe(csv.parse({trim: true, skip_empty_lines: true, columns: true}))
        .on('data', (row) => {
            result.push({
                ISBN: row.ISBN,
                name: row.name,
                author: row.author,
                link: row.link
            })
        })
        .on('end', async() => {
            try{
                const query = 'INSERT INTO books (ISBN, Name, Author, link) VALUES ($1,$2,$3,$4)';

                for(const book of result){
                    if(book.ISBN && book.name && book.author && book.link){
                        await pool.query(query, [book.ISBN, book.name, book.author, book.link]);
                    }  
                };

                res.json({message: 'Books successfully imported'});

            }catch(error){
                console.error('Error importing books', error);
                res.status(500).json({message:'Server error'});
            };
        });
};

module.exports= {getAllBooks, getById, addNewBook, deleteBook, updateBook, importBooksFromCsv};