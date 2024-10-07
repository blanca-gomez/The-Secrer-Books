const express = require('express');
const router = express.Router();
const pool= require('../db');

router.get('/', async(req,res) => {
    try{
        const {rows} = await pool.query("SELECT * FROM books");
        res.json(rows);

    }catch(error){
        console.error('Error getting books', error);
    }
});

router.get('/:id', async(req,res) => {
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
});

router.post('/', async (req,res) => {
    try{
        const data = req.body;
        const {rows} = await pool.query("INSERT INTO books (ISBN, Name, Author, link) VALUES ($1,$2,$3,$4) RETURNING *",
        [data.isbn, data.name, data.author, data.link]);
        return res.json(rows[0])
    }catch(error){
        console.error('Error adding book', error)
    }
});

router.delete('/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const {rowCount} = await pool.query("DELETE FROM books WHERE id = $1 RETURNING *", [id]);
        if(rowCount === 0 ){
            return res.status(404).json({message:"Book not found"})
        }
        return res.send.status(204);
    }
    catch(error){
        console.error('Error deleting book', error);
    }
});

router.put('/:id', async(req,res) => {
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
});


module.exports= router;
