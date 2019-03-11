import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given bookId
  getBook: function(bookId) {
    return axios.get(`/api/books/${bookId}`);
  },
  // Deletes the book with the given bookId
  deleteBook: function(bookId) {
    return axios.delete(`/api/books/${bookId}`);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
