const bodyParser = require('body-parser')
const fs = require('fs')

const urlEncodedParser = bodyParser.urlencoded({extended: false})

let items = JSON.parse(fs.readFileSync('./data/todos.txt', 'utf8'))


module.exports = (app) => {

    app.get('', (req, res) => {
        res.render('todo', {items})
    })

    app.post('', urlEncodedParser, (req, res) => {
        console.log(req.body)
        items.push(req.body)
        save()

        res.json(items)
    })

    app.patch('', urlEncodedParser, (req, res) => {
        console.log(req.body)
        items.forEach((element) => {
            if (element.description === req.body.description) {
                element.done = req.body.done
            }
        })
        save()

        res.json(items)
    })

    app.delete('', urlEncodedParser, (req, res) => {
        items = items.filter(item => req.body.description !== item.description)
        save()
        res.json(items)
    })
}

function save() {
    fs.writeFile('./data/todos.txt', JSON.stringify(items), () => {})
}
