const express = require('express');
const dato = require('../models/dato');
const router = express.Router();

const Dato = require('../models/dato');

router.get('/', async (req, res) => {
    const datos = await Dato.find();
    res.json(datos);
});

router.get('/:id', async (req, res) => {
    const datos = await Dato.findById(req.params.id);
    res.json(datos);
});

router.post('/', async (req, res) => {
    const { Nombres, Apellidos, Cedula, Dirección, Celular } = req.body;
    const dato = new Dato({  Nombres, Apellidos, Cedula, Dirección, Celular });
    //console.log(dato);
    await dato.save();
    res.json({ status: 'Dato Saved' });
});

router.put('/:id', async (req, res) => {
    const {  Nombres, Apellidos, Cedula, Dirección, Celular } = req.body;
    const newDato = {  Nombres, Apellidos, Cedula, Dirección, Celular };
    await Dato.findByIdAndUpdate(req.params.id, newDato);
    console.log(req.params.id);
    res.json({ status: 'Dato Update' });

});

router.delete('/:id', async (req, res) => {
    await Dato.findByIdAndRemove(req.params.id);
    res.json({ status: 'Dato Deleted' });
});

module.exports = router;