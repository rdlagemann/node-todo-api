const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

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
      res.status(404).send(err)
    })
})

app.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => {
      res.status(200).send({todos}) //send object instead off array to stay open to add more features to response object
    })
    .catch(err => {
      res.status(404).send(err)
    })
})

app.get('/todos/:id', (req, res) => {
  if(!ObjectID.isValid(req.params.id)) {
    return res.status(404).send('Invalid Id')
  }

  Todo.findById(req.params.id)
    .then(todo => {
      if(!todo) {
        return res.status(404).send()
      }
      res.status(200).send({todo})
    })
    .catch(err => {
      res.status(404).send(err)
    })
})

app.delete('/todos/:id', (req, res) => {
  if(!ObjectID.isValid(req.params.id)) {
    return res.status(404).send('Invalid Id')
  }

  Todo.findByIdAndRemove(req.params.id)
    .then(todo => {
      if(!todo) {
        return res.status(404).send('Does not find todo')
      }
      res.status(200).send({todo})
    })
    .catch(err => {
      res.status(404).send(err)
    })
})

app.listen(port, () => {
  console.log(`Start listen on port ${port}`)
})


module.exports = {app}
