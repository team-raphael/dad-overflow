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
  updateOneTask: function(userId, taskId, body){
    return axios.put(`/api/users/${userId}/tasks/${taskId}`, body);
  },
  
  // Deletes the book with the given bookId
  deleteOneTask: function(userId, taskId) {
    return axios.delete(`/api/users/${userId}/tasks/${taskId}`);
  },
  // Saves a book to the database
  getOneTask: function(userId, taskId) {
    return axios.get(`/api/users/${userId}/tasks/${taskId}`);
  },

  
  //Get user data
  getUserByEmail: (email) => {
    return axios.get("/api/users", {
      params: {
        email
      }
    });
  },
  createUser: (user) => {
    return axios.post("/api/users", user);
  },
  updateUser: (userId, user) => {
    return axios.put(`/api/users/${userId}`, user);
  }
};
