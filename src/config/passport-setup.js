const passport = require('passport')
require('./strategies/localStrategy')()
const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'
const dbName = 'libraryApp'
const debug = require('debug')('app:passport-setup');
const User = require('../model/user-model.js')

module.exports = function passportConfig(app) {

    app.use(passport.initialize())
    app.use(passport.session())
    // stores user in session
    passport.serializeUser((user, done) => {
        done(null, user)
    })
    // retrieve user from session
    passport.deserializeUser((user, done) => {
        done(null, user)
    })


}