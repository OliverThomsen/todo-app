const express = require('express')
const todoController = require('./controllers/todoController')

app = express()

// Init project
app.set('view engine', 'ejs')
app.use(express.static('./public'))
app.listen(3000)

// Run controllers
todoController(app)
