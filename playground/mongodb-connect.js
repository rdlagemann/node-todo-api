const {MongoClient, ObjectID} = require('mongodb')

const obj = new ObjectID()
console.log(obj)

const assert = require('assert')


const url = 'mongodb://localhost:27017/'

MongoClient.connect(url, (err, client) => {
    assert.equal(null, err)
    console.log('Connected to MongoDB server')

    const db = client.db('TodoApp')

    // db.collection('Todos').insertOne({
    //     text: 'Something to do'
    // }, (err, result) => {
    //    assert.equal(null, err)

    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })

    // db.collection('Users').insertOne({
    //     name: 'Rafael',
    //     age: 26,
    //     location: 'Osorio'
    // }, (err, result) => {
    //     assert.equal(null, err)
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })

    


    client.close()

})