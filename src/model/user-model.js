//const mongoClient = require('mongodb')
const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    username: String,
    password: String
})
const User = mongoose.model('users',userSchema)

module.exports = User