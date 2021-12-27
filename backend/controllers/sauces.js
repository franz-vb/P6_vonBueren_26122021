/* Un fichier de contrôleur exporte des méthodes qui sont ensuite attribuées aux routes 
pour améliorer la maintenabilité de votre application. */

const Thing = require('../models/thing');
const fs = require('fs');

exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.sauce);
    delete thingObject._id;
    const thing = new Thing({
      ...thingObject,
      likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.getOneThing = (req, res, next) => {
  Thing.findOne({ //retourne un seul Thing basé sur la fonction de comparaison qu'on lui passe (souvent par son identifiant unique)
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.addLike = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id, like: 1, usersLiked:[...usersLiked, req.auth.userId] })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
}

exports.modifyThing = (req, res, next) => {
    const thingObject = req.file ?
      {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

  exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => {
          if (!thing) {
                res.status(404).json({error: new Error('No such Thing!')});
          }
          if (thing.userId !== req.auth.userId) {
                res.status(400).json({error: new Error('Unauthorized request!')});
          }
          const filename = thing.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
          Thing.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
          });
      })
      .catch(error => res.status(500).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Thing.find().then( //retourne tous les Things
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};