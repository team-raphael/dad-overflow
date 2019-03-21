import axios from "axios";

export default {
  // Get all task for user with user id 
  getTasks: function(userId) {
    return axios.get(`/api/users/${userId}/tasks`);
  },

  // Create a new task
  createATask: function(userId, newTaskBody) {
    return axios.post(`/api/users/${userId}/tasks`, newTaskBody);
  },

  // update one task according to task id 
  updateOneTask: function(userId, taskId){
    return axios.put(`/api/users/${userId}/tasks/${taskId}`);
  },
  
  // Deletes the book with the given bookId
  deleteOneTask: function(userId, taskId) {
    return axios.delete(`/api/users/${userId}/tasks/${taskId}`);
  },
  // Saves a book to the database
  getOneTask: function(userId, taskId) {
    return axios.get(`/api/users/${userId}/tasks/${taskId}`);
  },

  
};
