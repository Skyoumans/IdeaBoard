// Imports variables from /env file
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const UsersController = require('./routes/UsersController')
mongoose.Promise = global.Promise

// Create a new app using express
const app = express()
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true })

// Connect to MongoDB and set up messages for when
// Mongo connects successfully or errors out
const connection = mongoose.connection
connection.on('connected', () => {
    console.log("Successfully connected to MongoDB")
})
connection.on('error', () => {
    console.log("MongoDB Error")
})

// Inject all middleware
app.use(bodyParser.json())
app.use(express.static(`${__dirname}/client/build`))

// Routes and controllers middleware
app.use('/api/users', UsersController)

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

// Set the app to listen on a specific port
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("App listening on PORT: ", PORT)
})