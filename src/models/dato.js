const mongoose = require('mongoose');
const { Schema } = mongoose;

const DatoSchema = new Schema({
    Nombres: { type: String, required: true},
    Apellidos: { type: String, required: true},
    Cedula: { type: String, required: true},
    Dirección: { type: String, required: true},
    Celular: { type: String, required: true}

    
});

module.exports = mongoose.model('Dato', DatoSchema);