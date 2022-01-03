const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validate = require('mongoose-validator')

const regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

const emailValidator = [
  validate({
    validator: 'isLength',
    arguments: [6, 30],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'matches',
    arguments: regex,
    message: 'email should contain regular caracters only'
  })
]

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true, validate: emailValidator},
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);