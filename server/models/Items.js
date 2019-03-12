
  
const mongoose = require('mongoose')

const { Schema } = mongoose

const todo = Schema({
    desc: {
        type: String,
        required:true,
    },
    completed: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('todo', todo)