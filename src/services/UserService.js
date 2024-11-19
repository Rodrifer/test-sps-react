import axios from "axios";

const API_URL = "https://test-sps-server.vercel.app/api";

class UserService {
  async list() {

    const users = await axios.get(`${API_URL}/users`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token"),
      },
    });

    if (users.status === 401 || users.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/"; // Redirect to login page
      
    }

    if (users.status === 200) {
      return users.data;
    }
  }
  async get(id) {
    throw new Error("Not implemented");
  }
  async create(data) {
    throw new Error("Not implemented");
  }
  async delete(id) {
    throw new Error("Not implemented");
  }
  async update(id, data) {
    throw new Error("Not implemented");
  }
}

export default UserService;
