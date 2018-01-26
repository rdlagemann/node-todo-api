const request = require('supertest')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')

const todos = [
  {
    text: "First test todo"
  },
  {
    text: "Second test todo"
  }
]

beforeEach(done => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos)
      .then(() => done())
  })
  .catch(err => done(err))
})

describe('POST /todos', () => {
  test('should create a new todo', done => {
    let text = "Test todo test"

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if(err) {
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

  test('should not create a todo with invalid body data' , done => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err) {
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
  test('should get all todos', done =>{
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })
})