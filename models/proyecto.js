const mongoose = require('mongoose');
const Empleado = require('./user');
const Cliente = require('./cliente')

const Schema = mongoose.Schema
    ObjectId = Schema.ObjectId

const proyectoSchema = new Schema({
    id: ObjectId,
    proyecto: String,
    clasificacion: String,
    cliente : {
        type: ObjectId,
        ref: Cliente
    },
    employee: [{
        type: ObjectId,
        ref: Empleado
    }],
    fecha_inic: Date,
    fecha_fin: Date
});

module.exports = mongoose.model('Proyecto', proyectoSchema);