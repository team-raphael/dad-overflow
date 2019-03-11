const db = require("../models");

// Defining methods for the booksController
module.exports = {
    findAll: function (req, res) {
        db.Book
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByBookId: function (req, res) {
        db.Book
            .findOne({ bookId: req.params.id })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        const query = {
            bookId: req.body.bookId
        };

        const bodyBook = req.body;

        const newBook = {
            bookId: bodyBook.bookId,
            smallThumbnail: bodyBook.smallThumbnail,
            infoLink: bodyBook.infoLink,
            title: bodyBook.title,
            authors: bodyBook.authors,
            description: bodyBook.description
        };

        const options = {
            upsert: true, 
            setDefaultsOnInsert: true
        };

        db.Book
            .findOneAndUpdate(query, newBook, options)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        const query = {
            bookId: req.params.id
        }

        const bodyBook = req.body;

        const updateBook = {
            smallThumbnail: bodyBook.smallThumbnail,
            infoLink: bodyBook.infoLink,
            title: bodyBook.title,
            authors: bodyBook.authors,
            description: bodyBook.description
        };

        db.Book
            .findOneAndUpdate(query, updateBook)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Book
            .findOne({ bookId: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
