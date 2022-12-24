const mongoose = require('mongoose')
// const { schema } = require('moongose/models/user_model')
const { Schema } = mongoose;


const NotesSchema = new schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag :{
        type : String,
        default: 'General'
    },
    date: {
        type: Date,
        default : Date.now
    }
})

module.exports = mongoose.model('notes',NotesSchema)