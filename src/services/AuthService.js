import axios from "axios";

const API_URL = "https://test-sps-server.vercel.app/api";

class AuthService {
  async login(email, password) {
    const response = await axios.post(
      `${API_URL}/auth/login`,
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
    window.location.href = "/"; // Redirect to login page
  }
}

export default AuthService;
