const { MongoClient, ObjectID } = require('mongodb')
const debug = require('debug')('app:bookController')
const url = 'mongodb://localhost:27017'
const dbName = 'libraryApp'

function BookController(nav){
    function getIndex(req, res) {
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
  
      }

    function getById(req, res)  {
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
                const book = await col.findOne({ _id: new ObjectID(id) })
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
          }
    function middleware(req, res, next) {
            if (req.user)
              next()
            else
               res.redirect('/')
          }
    return {
        getIndex,
        getById,
        middleware
    }
}
module.exports = BookController