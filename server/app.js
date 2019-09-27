const express = require('express')
const http = require('http')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const errorHandler = require('errorhandler')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise


const isProduction = process.env.NODE_ENV === 'production'

const server = http.createServer(app)
const io = require('socket.io')(server)


app.io = io;


app.set('port', process.env.PORT || 3000)


require('dotenv').config()
app.use(cookieParser())
app.use(cors())
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
  session({
    secret: 'ToDo',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
)

if (!isProduction) app.use(errorHandler())

mongoose.connect('mongodb://localhost/todoapp', { useNewUrlParser: true })
mongoose.set('debug', true)

require('./src/models/Todo')
require('./src/models/User')

app.use(require('./src/routes'))

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.statusCode = 404
  next(err)
})

if(!isProduction) {
    app.use((err, req, res) => {
        res.status(err.statusCode || 500);

        res.json({
            errors: {
                message: err.statusMessage,
                error: err,
            }
        })
    })
}

app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
        errors: {
            message: {
                err: statusMessage,
                error: {},
            }
        }
    })
})

server.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`)
})