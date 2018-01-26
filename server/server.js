const express = require('express')
const bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')

const port = process.env.PORT || 3000

const app = express()

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  })

  todo.save()
    .then(doc => {
      res.send(doc)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

app.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => {
      res.status(200).send({todos}) //send object instead off array to stay open to add more features to response object
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

app.listen(port, () => {
  console.log(`Start listen on port ${port}`)
})


module.exports = {app}
