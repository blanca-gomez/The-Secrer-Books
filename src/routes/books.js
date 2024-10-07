const express = require('express');
const router = express.Router();
const pool= require('../db');

router.get('/', async(req,res) => {
    const {rows} = await pool.query("SELECT * FROM books");
    res.json(rows);
});

router.get('/:id', async(req,res) => {
    const {id} = req.params;
    const {rows} = await pool.query("SELECT * FROM books WHERE id = $1", [id])
    res.json(rows)
});

router.post('/', (req,res) => {
    res.send('Creando libro')
});

router.delete('/:id', (req,res) => {
    res.send('Eliminando libro')
});

router.put('/:id', (req,res) => {
    res.send('Actualizando libros')
});


module.exports= router;
