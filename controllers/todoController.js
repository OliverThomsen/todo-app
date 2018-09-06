const bodyParser = require('body-parser')
const fs = require('fs')
const mongoose = require('mongoose')

const urlEncodedParser = bodyParser.urlencoded({extended: false})


// Connect to database
mongoose.connect('mongodb://test:test123@ds245022.mlab.com:45022/todo-app', {useNewUrlParser: true})

const todoSchema = mongoose.Schema({
    description: String,
    done: Boolean
})

const Todo = mongoose.model('Todo', todoSchema)


module.exports = (app) => {

    app.get('', (req, res) => {
        Todo.find({}, (error, data) => {
            if (error) res.send('Somthing went wrong: ' + error)
            res.render('todo', {todos: data})
        })

    })

    app.post('', urlEncodedParser, (req, res) => {
        Todo(req.body).save((error, data) => {
            if (error) res.send('Somthing went wrong: ' + error)
            res.send('success')
        })
    })

    app.patch('', urlEncodedParser, (req, res) => {
        const data = JSON.parse(req.body.data)
        Todo.updateOne({_id: data.id}, {$set: data.todo}, (error) => {
            if (error) res.send('Somthing went wrong: ' + error)
            res.send('succes')
        })
    })

    app.delete('', urlEncodedParser, (req, res) => {
        Todo.findByIdAndRemove(req.body.i, (error, data) => {
            if (error) res.send('Somthing went wrong: ' + error)
            res.send('succes');
        })
    })
}
