import axios from "axios";

export default {
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
