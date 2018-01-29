const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const pick = require('lodash.pick')

let UserSchema = new mongoose.Schema({
  email: {
    type:String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

// overrides method to return only public data
// that an be useful

UserSchema.methods.toJSON = function() {
  let user = this
  let userObject = user.toObject()

  return pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function() {
  let user = this;
  let access = 'auth'
  let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString()

  user.tokens.push({access, token})

  return user.save().then(() => { return token })

}

let User = mongoose.model('User', UserSchema )


module.exports = {User}