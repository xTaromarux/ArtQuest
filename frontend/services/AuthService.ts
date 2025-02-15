// services/AuthService.ts
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/auth';

const AuthService = {
  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  },
  register: async (user: any) => {
    const response = await axios.post(`${API_URL}/register`, user);
    return response.data;
  }
};

export default AuthService;
