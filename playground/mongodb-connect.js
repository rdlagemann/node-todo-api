const {MongoClient, ObjectID} = require('mongodb')
const assert = require('assert')

const url = 'mongodb://localhost:27017/'

MongoClient.connect(url, (err, client) => {
	assert.equal(null, err)
	console.log('Connected to MongoDB server')

	const db = client.db('TodoApp')

	client.close()

})