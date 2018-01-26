const { MongoClient, ObjectID } = require('mongodb')
const assert = require('assert')

const url = 'mongodb://localhost:27017/'

MongoClient.connect(url, (err, client) => {
	assert.equal(null, err)
	console.log('Connected to MongoDB server')

	const db = client.db('TodoApp')    

	db.collection('Todos')
			.find()
			.toArray()
			.then(docs => {
					console.log(`ToDos (${docs.length})`)
					console.log(JSON.stringify(docs, undefined, 2))					
					
			})
			.catch(err => console.log(err))
	
	// db.collection('Todos')
	//     .find()
	//     .count()
	//     .then(count => console.log(count))
	//     .catch(err => console.log(err))

	client.close()

})