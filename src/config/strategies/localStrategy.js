const passport = require('passport')
const { Strategy } = require('passport-local')
const User = require('../../model/user-model')
const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'
const dbName = 'libraryApp'
const debug = require('debug')('app:localStrategy');

module.exports = function localStrategy() {
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {

        (async function findUser() {
            let client
            try {
                client = await MongoClient.connect(url)
                console.log('connected correctly to db')
                const db = client.db(dbName)
                const col = await db.collection('users')
                const user = await col.findOne({ username })
                if (user.password == password) {
                    done(null, user)
                }
                else {
                    done(null, false)
                }

            } catch (error) {
                console.log(error.stack)
            }
            client.close()
        }())
        /* User.findOne({ username: username})
            .then((currentUser) => {
                if(currentUser){
                console.log('user is: '+ currentUser)
                done(null,currentUser)
                }
                else {
                    // if not, create user in db
                    new User({
                     username,
                     password
                 }).save().then((newUser) => {
                     console.log('new User created:'+newUser)
                     done(null,newUser)
                 })
                }
            })  */
    }
    ))
}