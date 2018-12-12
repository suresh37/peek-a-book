const express = require('express')
const authRouter = express.Router()
const {MongoClient} = require('mongodb')
const debug = require('debug')('app:authRoutes')
const url = 'mongodb://localhost:27017'
const dbName = 'libraryApp'

function router(nav) {
    authRouter.route('/signUp')
        .post((req, res) => {
            debug(req.body)
            res.json(req.body)
        })

    return authRouter
}

module.exports = router