const { MongoClient, ObjectID } = require('mongodb')
const assert = require('assert')

const url = 'mongodb://localhost:27017/'

MongoClient.connect(url, (err, client) => {
assert.equal(null, err)
console.log('Connected to MongoDB server')

const db = client.db('TodoApp')

db.collection('Users')
.find().toArray()
.then(docs => {console.log(JSON.stringify(docs, undefined, 2))})
.catch(err => {console.log(err)})


db.collection('Users').findAndModify(
    { name:'Rafael' },
    'age',
    {$inc: { age: 1} } ,
    {new: true}
)
.then(result => console.log(result))
.catch(err => console.log(err))

//client.close()

})