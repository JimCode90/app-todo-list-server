const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        default: false,
    },
})

module.exports = mongoose.model('Tasks', TaskSchema)