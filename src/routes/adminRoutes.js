const express = require('express')
const  MongoClient = require('mongodb').MongoClient
const adminRouter = express.Router()
const debug = require('debug')('app:adminRoutes')
const url = 'mongodb://localhost:27017'
const dbName = 'libraryApp'
const books = [
    {
      title: 'War and Peace',
      genre: 'Historical Fiction',
      author: 'Lev Nikolayevich Tolstoy',
      read: false
    },
    {
      title: 'Les Miserables',
      genre: 'Historical Fiction',
      author: 'Victpr Hugo',
      read: false
    },
    {
      title: 'G.O.T',
      genre: 'Fantasy World',
      author: 'George RR Martin',
      read: false
    },
    {
      title: 'Harry potter',
      genre: 'Fantasy',
      author: 'J.K.Rowling',
      read: false
    }]
function router(nav) {
    adminRouter.route('/')
        .get((req, res) => {
            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url)
                    debug('Connected correctly to the server')
                    const db = client.db(dbName)
                    const response = await db.collection('books')
                        .insertMany(books)
                        res.json(response)
                } catch (err) {
               debug('Error found while inserting: '+err.stack)
                }
                client.close()
            }())
//res.send('Inserting books')
        })
    return adminRouter
}

module.exports = router