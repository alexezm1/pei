const mongoose = require('mongoose');

const Schema = mongoose.Schema
    ObjectId = Schema.ObjectId

const clienteSchema = new Schema({
    id: ObjectId,
    name:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Cliente',clienteSchema);