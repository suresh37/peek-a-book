const express = require('express');
// const url = require('url');
const app = express();
const chalk = require('chalk');
const morgan = require('morgan');
const debug = require('debug')('app');
const path = require('path');
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoose = require('mongoose')
// const things = require('./things.js');
const port = process.env.PORT || 7000
const  nav =[
  { link: '/books', title: 'Book' },
  { link: '/authors', title: 'Author' }]
const title_bookpage = 'Book Dashboard'
var bookRouter = require('./src/routes/bookRoutes')(nav,title_bookpage)
var adminRouter = require('./src/routes/adminRoutes')(nav)
var authRouter = require('./src/routes/authRoutes')(nav)
/* app.use((req,res,next) => {
  debug('my middleware')
  next()
}) */
/* mongoose.connect('mongodb://localhost:27017', () => {
  console.log('Connected to mongodb via mongoose')
}) */
app.use(morgan('tiny'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(session({ secret: 'library'}))
require('./src/config/passport-setup')(app)
// static content
app.use(express.static(path.join(__dirname, '/public')))
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/fonts', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/fonts')))
app.set('views', './src/views')
//app.set('view engine','pug')
app.set('view engine', 'ejs')
// routes
app.use('/books', bookRouter)
app.use('/admin',adminRouter)
app.use('/auth',authRouter)

app.get('/', (req, res) => {
  //res.sendFile(path.join(__dirname, 'views', 'index.html'));
  res.render('index', {
    title: 'Peek-a-Boo>|',
    quote: `"Libraries were full of ideas – perhaps being the most dangerous and powerful of all weapons underneath."
    
     -  Source Unknown`,
    nav: [
      { link: '/books', title: 'books' },
      { link: '/authors', title: 'authors' }],
      user: req.user
  })
});
app.get('/authors',(req,res) => {
  res.send('Page is under construction')
})
app.listen(port, () => {
  //console.log('App is listening at '+port)
  debug(`listening on port ${chalk.blue(port)}`);
});
