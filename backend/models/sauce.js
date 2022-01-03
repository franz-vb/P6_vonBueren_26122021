const mongoose = require('mongoose');
const validate = require('mongoose-validator')

const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Name should contain alpha-numeric characters only',
  }),
]

const sauceSchema = mongoose.Schema({ /*La méthode  Schema  de Mongoose vous permet de créer un schéma de données 
                                        pour votre base de données MongoDB.*/
  userId: { type: String, required: true },
  name: { type: String, required: true, validate: nameValidator },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: [String], required: true },
  usersDisliked: { type: [String], required: true },
});

//La méthode  model  transforme ce modèle en un modèle utilisable.
module.exports = mongoose.model('Sauce', sauceSchema);