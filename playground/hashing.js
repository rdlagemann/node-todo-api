const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')

let data = {
  id:10,
  age: 26
}

let token = jwt.sign(data, '123abc')
console.log('token:', token)

let decoded = jwt.verify(token, '123abc')
console.log('decoded:', decoded)


// let message = 'I am user number 3'
// let hash = SHA256(message).toString()

// console.log(`Message: ${message}`)
// console.log(`Hash: ${hash}`)

// let data = {
//   id: 4
// }

// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()

// if(resultHash === token.hash) {
//   console.log('Data is OK')
// } else {
//   console.log('Data was changed')
// }

