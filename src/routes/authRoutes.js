const express = require('express')
const authRouter = express.Router()
const { MongoClient } = require('mongodb')
const passport = require('passport')
const debug = require('debug')('app:authRoutes')
const url = 'mongodb://localhost:27017'
const dbName = 'libraryApp'
const quote = `"Libraries were full of ideas – perhaps being the most dangerous and powerful of all weapons underneath."
    
     -  Source Unknown`

function router(nav) {

    authRouter.route('/signup')
        .post((req, res) => {

            var { username, password } = req.body;
            (async function addUser() {
                let client
                try {
                    const user = { username, password }
                    client = await MongoClient.connect(url)
                    console.log('connected correctly to mongodb')
                    db = client.db(dbName)
                    const col = db.collection('users')
                    // check if user exists
                    const userCheck = await col.findOne({ username })
                    if (userCheck)
                        return res.redirect('/')
                    // insert new user
                    const result = await col.insertOne(user)
                    debug(result)
                    req.login(result.ops[0], () => {
                        res.redirect('/auth/profile')
                    })
                } catch (error) {
                    debug(error)
                    res.redirect('/')
                }
                client.close()
            }())

        })
    authRouter.route('/signin')
        .get((req, res) => {
            res.render('signin', {
                nav,
                title: 'Sign In', quote
            })
        })

        .post(passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failureRedirect: '/'

        }))
        authRouter.route('/logout')
        .get((req,res) => {
            req.logout()
            res.redirect('/')
        })
    authRouter.route('/profile')
        .all((req, res, next) => {
            if (req.user) {
                next();
            }
            else
                return res.redirect('/')
        })
        .get((req, res) => {
           // res.json(req.user)
            res.render('profile', {
                nav,
                title: 'Profile Page', quote,
                user: req.user
            })
        })


    return authRouter
}

module.exports = router