import axios from "axios";

export default {
  //Get user data
  getUserByEmail: (email) => {
    return axios.get("/api/users", {
      params: {
        email
      }
    });
  }
};
