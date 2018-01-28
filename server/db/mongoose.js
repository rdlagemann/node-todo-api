const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose.Promise = global.Promise // built-in Promise lib
mongoose.connect(url)

module.exports = { mongoose }