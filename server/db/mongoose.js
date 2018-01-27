const mongoose = require('mongoose')
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp'

mongoose.Promise = global.Promise // built-in Promise lib
mongoose.connect(url)

module.exports = { mongoose }