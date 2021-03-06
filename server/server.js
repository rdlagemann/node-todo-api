require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')
const pick = require('lodash.pick')
const bcrypt = require('bcryptjs')

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')
const {authenticate} = require('./middleware/authenticate')

const port = process.env.PORT || 3000

const app = express()

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
  let todo = new Todo(pick(req.body, ['text']))

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
      res.status(200).send({todos}) // send object instead off array to stay open to add more features to response object
    })
    .catch(err => {
      res.status(404).send(err)
    })
})

app.get('/todos/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).send()
  }

  Todo.findById(req.params.id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send()
      }
      res.status(200).send({todo})
    })
    .catch(err => {
      res.status(404).send(err)
    })
})

app.delete('/todos/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).send()
  }

  Todo.findByIdAndRemove(req.params.id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send()
      }
      res.status(200).send({todo})
    })
    .catch(err => {
      res.status(404).send(err)
    })
})

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id
  let body = pick(req.body, ['text', 'completed'])

  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  if ((typeof (body.completed) === typeof (true)) && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    return res.status(404).send('FAIL')
    body.completed = false
    body.completedAt = null
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then(todo => {
      if (!todo) {
        return res.status(404).send()
      }

      res.send({todo})
    })
    .catch(err => {
      return res.send(404).send(err)
    })
})

app.post('/users', (req, res) => {
  let user = new User(pick(req.body, ['email', 'password']))

  user.save()
    .then(() => {
      return user.generateAuthToken()
    })
    .then(token => {
      res.header('x-auth', token).send(user)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
})

app.post('/users/login', (req, res) => {
  let body = new User(pick(req.body, ['email', 'password']))
  
  User
    .findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user)        
      })
    })
    .catch(e => {
      res.status(400).send('Invalid Password!')
    })
})

app.listen(port, () => {
  console.log(`Start listen on port ${port}`)
})

module.exports = {app}
