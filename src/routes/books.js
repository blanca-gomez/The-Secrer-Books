const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('Obteniendo libros')
});

router.get('/:id', (req,res) => {
    const {id} = req.params
    res.send('Obteniendo el libro' + id)
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
