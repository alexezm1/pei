const mongoose = require('mongoose');

const Schema = mongoose.Schema
    ObjectId = Schema.ObjectId

const employeeSchema = new Schema({
    id: ObjectId,
    name:{
        type: String,
        required: true
    },
    lenguajes: [],
    enfoque: String
});

module.exports = mongoose.model('Empleado',employeeSchema);