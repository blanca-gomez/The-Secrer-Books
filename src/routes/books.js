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

router.post('/', (req,res) => {
    res.send('Creando libro')
});

router.delete('/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const {rows, rowCount} = await pool.query("DELETE FROM books WHERE id = $1 RETURNING *", [id]);
        if(rowCount === 0 ){
            return res.status(404).json({message:"Book not found"})
        }
        return res.json(rows)
    }
    catch(error){
        console.error('Error deleting book', error);
    }
});

router.put('/:id', (req,res) => {
    res.send('Actualizando libros')
});


module.exports= router;
