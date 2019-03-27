const db = require("../models");

// PostsController methods
module.exports = {

  findAll: (req, res) => {

    const conditions = {};
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;

    if (req.query.postContains) {
      const pattern = req.query.postContains;

      conditions.$or = [ {'body': { $regex:pattern, $options: "i" }}, {'title': { $regex:pattern, $options: "i" }} ];
    }

    db.Post
      .find(conditions)
      .limit(limit)
      .populate('userId')
      .sort({ date: -1 })
      .then(dbPost => res.json(dbPost))
      .catch(err => res.status(422).json(err));    
  },

  create: (req, res) => {
    db.Post
      .create(req.body)
      .then(dbPost => res.json(dbPost))
      .catch(err => res.status(422).json(err));
  },

  findOne: (req, res) => {
    db.Post
      .findOne({_id: req.params.id})
      .populate('userId')
      .then(dbPost => res.json(dbPost))
      .catch(err => res.status(422).json(err));
    
  }

};