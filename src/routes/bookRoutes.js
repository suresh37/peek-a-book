const express = require('express')
const bookRouter = express.Router()
const { MongoClient,ObjectID } = require('mongodb')
const debug = require('debug')('app:bookRoutes')
const url = 'mongodb://localhost:27017'
const dbName = 'libraryApp'

function router(nav, title) {

  bookRouter.route('/')
    .get((req, res) => {
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url)
          debug('Connected correctly to the server')
          const db = client.db(dbName)
          const col = await db.collection('books')
          const books = await col.find().toArray()
          res.render('bookListView', {
            title,
            books,
            nav
          })
        } catch (err) {
          debug('Error found while inserting: ' + err.stack)
        }
        client.close()
      }())

    })
  bookRouter.route('/:id')
    .get((req, res) => {
      (async function mongo() {
        let client;
        const id = req.params.id
        try {
          client = await MongoClient.connect(url)
          debug('Connected correctly to the server')
          const db = client.db(dbName)
          const col = await db.collection('books')
         /*  const books = await col.find().toArray()
          res.render('bookView', {
            title: 'Book Page',
            nav,
            book: books[id]
          }) */
          const book = await col.findOne({_id: new ObjectID(id) })
          debug(book)
          res.render('bookView', {
            title: 'Book Page',
            nav,
            book
          })
        } catch (err) {
          debug('Error found while inserting: ' + err.stack)
        }

        client.close()
      }())
    })
  return bookRouter
}

module.exports = router