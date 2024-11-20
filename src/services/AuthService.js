import axios from "axios";
import config from "../config.json";

class AuthService {
  async login(email, password) {
    const response = await axios.post(
      `${config.API_URL}/auth/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const { token } = response.data;
      localStorage.setItem("token", token);
      return response;
    }
  }

  async logout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }
}

export default AuthService;
