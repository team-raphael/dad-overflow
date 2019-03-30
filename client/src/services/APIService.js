import axios from "axios";

const postLimit = 100;

export default {
  // Get all task for user with user id 
  getTasks: function (userId) {
    return axios.get(`/api/users/${userId}/tasks`);
  },

  // Create a new task
  createATask: function (userId, newTaskBody) {
    return axios.post(`/api/users/${userId}/tasks`, newTaskBody);
  },

  // update one task according to task id 
  updateOneTask: function (userId, taskId, body) {
    return axios.put(`/api/users/${userId}/tasks/${taskId}`, body);
  },

  // Deletes the task with the given userId and taskId
  deleteOneTask: function (userId, taskId) {
    return axios.delete(`/api/users/${userId}/tasks/${taskId}`);
  },
  // Gets a task fromn the database given a userId and taskId
  getOneTask: function (userId, taskId) {
    return axios.get(`/api/users/${userId}/tasks/${taskId}`);
  },


  //Get user data
  getUserById: (id) => {
    return axios.get(`/api/users/${id}`)
  },
  
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
  },

  // Create Post by User
  createPost: (newPost) => {
    return axios.post("/api/posts", newPost)
  },

  getPosts: () => {
    return axios.get("/api/posts");
  },

  //Get all posts with a limit on the number returned
  getPostsWithLimit: () => {
    return axios.get(`/api/posts?limit=${postLimit}`);
  },

  //Get all posts that that have a search parameter
  getPostSearch: (postContains) => {
    if (postContains && postContains.trim().length > 0) {
      return axios.get(`/api/posts?limit=${postLimit}&postContains=${postContains}`);
    } else {
      return null;
    }
  },

  findOnePost: (id) => {
    return axios.get(`/api/posts/${id}`)
  },

  getCommentsByPostId: (postId) => {
    return axios.get(`/api/posts/${postId}/comments`)
  },

  createAComment: (postId, commentBody) => {
    return axios.post(`/api/posts/${postId}/comments`, commentBody)
  },

  // add usersId to the comment DB clicked
  addUserIdToCommentDb: (userId, commentId) => {
    return axios.put(`/api/users/${userId}/comments/${commentId}/adduseridtocommentdb`)
  }

 
};
