import axios from "axios";

const API_URL = "https://test-sps-server.vercel.app/api";

class UserService {
  async list() {
    const users = await axios.get(`${API_URL}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    if (users.status === 401 || users.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    if (users.status === 200) {
      return users.data;
    }
  }

  async get(id) {
    const user = await axios.get(`${API_URL}/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    if (user.status === 401 || user.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    if (user.status === 200) {
      return user.data;
    }
  }
  async create(type, name, email, password) {
    const response = await axios.post(
      `${API_URL}/users`,
      {
        type,
        name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    if (response.status === 400 || response.status === 201) {
      return response;
    }
  }

  async delete(id) {
    const response = await axios.delete(`${API_URL}/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    if (response.status === 204) {
      return response;
    }
  }

  async update(id, data) {
    const response = await axios.put(`${API_URL}/users/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    if (response.status === 200) {
      return response;
    }
  }
}

export default UserService;
