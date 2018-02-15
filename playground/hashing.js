const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

let password = '123abc'

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   })
// })

let hashedPassword = '$2a$10$Gz7DH25iVyjT6KH0jwKdlO9TJfXxgdnXou1NI/kCLtLVWMn4Lp2ka'

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res)
})

// let data = {
//   id: 10,
//   age: 26
// }

// let token = jwt.sign(data, '123abc')
// console.log('token:', token)

// let decoded = jwt.verify(token, '123abc')
// console.log('decoded:', decoded)

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
