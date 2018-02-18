const request = require('supertest')
const {ObjectID} = require('mongodb')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')
const {User} = require('./../models/user')
const {todos, populateTodos, users, populateUsers} = require('./seed/seed')

beforeEach(populateUsers)
beforeEach(populateTodos)

describe('POST /todos', () => {
  test('should create a new todo', done => {
    let text = 'Test todo test'

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find({text})
        .then(todos => {
          expect(todos.length).toBe(1)
          expect(todos[0].text).toBe(text)
          done()
        })
        .catch(err => done(err))
      })
  })

  test('should not create a todo with invalid body data', done => {
    request(app)
      .post('/todos')
      .send({})
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2)
            done()
          })
          .catch(err => done(err))
      })
  })
})

describe('GET /todos', () => {
  test('should get all todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /todos/:id', () => {
  test('it should return todo doc', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done)
  })

  test('it should return 404', done => {
    let inexistentID = new ObjectID().toHexString()
    request(app)
      .get(`/todos/${inexistentID}`)
      .expect(404)
      .end(done)
  })
})

describe('DELETE /todos/:id', () => {
  test('it should delete a todo', done => {
    request(app)
      .delete(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find({})
          .then(docs => {
            expect(docs.length).toBe(1)
            done()
          })
          .catch(err => done(err))
      })
  })
})

describe('PATCH /todos/:id', () => {
  test('it should complete a todo', done => {
    request(app)
        .patch(`/todos/${todos[0]._id}`)
        .send({completed: true})
        .expect(200)
        .expect(res => {
          expect(res.body.todo.completed).toBe(true)
          expect(res.body.todo.completedAt).not.toBe(null)
        })
        .end(done)
  })
})

describe('GET /users/me', () => {
  test('it should return user if authenticated', done => {
    request(app)
    .get('/users/me')
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .expect(res => {
      expect(res.body._id).toBe(users[0]._id.toHexString())
      expect(res.body.email).toBe(users[0].email)
    })
    .end(done)
  })

  test('it should return 401', done => {
    request(app)
    .get('/users/me')
    .expect(401)
    .expect(res => {
      expect(res.body).toEqual({})
    })
    .end(done)
  })
})

describe('POST /users', () => {
  test('it should create a user', done => {   
    let email = 'ex@example.com'
    let password = '123123'

    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toBeDefined()
        expect(res.body._id).toBeDefined()
        expect(res.body.email).toBe(email)
      })
      .end(err => {
        if(err){
          return done(err)
        }

        User.findOne({email}).then(user => {
          expect(user).toBeDefined()
          expect(user.password).not.toBe(password)
          done()
        })    
        
      })
  })

  test('it should return validation errors if request invalid', done => {
    let email = 'ex@example.com'
    let password = '123123'
    request(app)
      .post('/users')
      .send({
        email: 'email.com', 
        password: '123'
      })
      .expect(400)
      .end(done)
  })

  test('it should not create user if email in use', done => {
    request(app)
    .post('/users')
    .send({
      email: users[0].email, 
      password: '123456'
    })
    .expect(400)
    .end(done)
  })
})

// describe('POST /users', () => {
//   beforeEach(done => {
//     User.remove({}).then(() => done()).catch(err => done(err))
//   })

//   let user = {email: 'user@sample.com', password: 'they can see my passwod'}
//   test('it should create a new user', done => {
//     request(app)
//       .post('/users')
//       .send(user)
//       .expect(200)
//       .expect(res => {
//         expect(res.body.email).toBe(user.email)
//       })
//       .end(done)
//   })
// })
