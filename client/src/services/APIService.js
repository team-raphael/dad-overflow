import axios from "axios";
const postLimit = 100;

export default {
  // Get all task for user with user id 
  getTasks: function (userId, firebaseUserToken) {
    const config = {
      headers: { 'Authorization': "bearer " + (firebaseUserToken ? firebaseUserToken : "") }
    };

    return axios.get(`/api/users/${userId}/tasks`, config);
    //return axios.get(`/api/users/${userId}/tasks`);
  },

  // Create a new task
  createATask: function (userId, newTaskBody, firebaseUserToken) {
    const config = {
      headers: { 'Authorization': "bearer " + (firebaseUserToken ? firebaseUserToken : "") }
    };

    return axios.post(`/api/users/${userId}/tasks`, newTaskBody, config);
  },

  // update one task according to task id 
  updateOneTask: function (userId, taskId, body, firebaseUserToken) {
    const config = {
      headers: { 'Authorization': "bearer " + (firebaseUserToken ? firebaseUserToken : "") }
    };

    return axios.put(`/api/users/${userId}/tasks/${taskId}`, body, config);
  },

  // Deletes the task with the given userId and taskId
  deleteOneTask: function (userId, taskId, firebaseUserToken) {
    const config = {
      headers: { 'Authorization': "bearer " + (firebaseUserToken ? firebaseUserToken : "") }
    };

    return axios.delete(`/api/users/${userId}/tasks/${taskId}`, config);
  },
  // Gets a task fromn the database given a userId and taskId
  getOneTask: function (userId, taskId, firebaseUserToken) {
    const config = {
      headers: { 'Authorization': "bearer " + (firebaseUserToken ? firebaseUserToken : "") }
    };

    return axios.get(`/api/users/${userId}/tasks/${taskId}`, config);
  },


  //Get user data
  getUserById: (id, firebaseUserToken) => {
    const config = {
      headers: { 'Authorization': "bearer " + (firebaseUserToken ? firebaseUserToken : "") }
    };

    return axios.get(`/api/users/${id}`, config)
  },

  getUserByEmail: (email, firebaseUserToken) => {
    const config = {
      params: {
        email
      },
      headers: { 'Authorization': "bearer " + (firebaseUserToken ? firebaseUserToken : "") }
    };

    return axios.get("/api/users", config);
  },
  createUser: (user, firebaseUserToken) => {
    const config = {
      headers: { 'Authorization': "bearer " + (firebaseUserToken ? firebaseUserToken : "") }
    };

    return axios.post("/api/users", user, config);
  },
  updateUser: (userId, user, firebaseUserToken) => {
    const config = {
      headers: { 'Authorization': "bearer " + (firebaseUserToken ? firebaseUserToken : "") }
    };

    return axios.put(`/api/users/${userId}`, user, config);
  },

  // Create Post by User
  createPost: (newPost, firebaseUserToken) => {
    const config = {
      headers: { 'Authorization': "bearer " + (firebaseUserToken ? firebaseUserToken : "") }
    };

    return axios.post("/api/posts", newPost, config);
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

  createAComment: (postId, commentBody, firebaseUserToken) => {
    const config = {
      headers: { 'Authorization': "bearer " + (firebaseUserToken ? firebaseUserToken : "") }
    };

    return axios.post(`/api/posts/${postId}/comments`, commentBody, config);
  },

  // add usersId to the comment DB clicked
  addUserIdToCommentDb: (userId, commentId, firebaseUserToken) => {
    const config = {
      headers: { 'Authorization': "bearer " + (firebaseUserToken ? firebaseUserToken : "") }
    };

    return axios.put(`/api/users/${userId}/comments/${commentId}/adduseridtocommentdb`, null, config)
  }


};
