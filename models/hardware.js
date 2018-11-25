const mongoose = require('mongoose');

const Schema = mongoose.Schema
    ObjectId = Schema.ObjectId

const hwSchema = new Schema({
    id: ObjectId,
    marca: String,
    so: String,
    proce: String,
    hdd: String,
    ssd: String,
    ram: String,
    grafica: String
});

module.exports = mongoose.model('Hardware', hwSchema);