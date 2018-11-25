const mongoose = require('mongoose');

const Schema = mongoose.Schema
    ObjectId = Schema.ObjectId

const swSchema = new Schema({
    id: ObjectId,
    name: String,
    enfoque: String,
    licencia: {
       type: Boolean,
       default: true
    }
});

module.exports = mongoose.model('Software', swSchema);