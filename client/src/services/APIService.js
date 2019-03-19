import axios from "axios";

export default {
  //Get user data
  getAllUsers: () => {
    return axios.get("/api/users");
  }
};
