const db = require("../models");

// PostsController methods
module.exports = {

  findAll: (req, res) => {
    db.Post
      .find(req.query)
      .then(dbPost => res.json(dbPost))
      .catch(err => res.status(422).json(err));    
  },

  create: (req, res) => {
    db.Post
      .create(req.body)
      .then(dbPost => res.json(dbPost))
      .catch(err => res.status(422).json(err));
  },

  findById: (req, res) => {
    db.Post
      .findById(req.params.id)
      .then(dbPost => res.json(dbPost))
      .catch(err => res.status(422).json(err));
    
  }

};