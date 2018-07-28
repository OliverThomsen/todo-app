const express = require('express')
const todo = require('./controllers/todo')

app = express()

// Init project
app.set('view engine', 'ejs')
app.use(express.static('./public'))
app.listen(3000)

// Run controllers
todo(app)
