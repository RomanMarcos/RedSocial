import axios from 'axios';

const API_URL: string = 'http://localhost:3001/api';

export const login = async(email: string, password: string) => {
    try {
      const { data } = await axios.post(`${API_URL}/login`, { email, password });
      const { token } = data;
      return { token }
    } catch(err) {
      const error: string = `There was an error trying to login: ${err}`;
      return { error }
    }
}

export const signup = async(username: string, email: string, password: string) => {
    try {
      const { data } = await axios.post(`${API_URL}/signup`, { username, email, password });
      const { token } = data;
      return { token }
    } catch(err) {
      const error: string = `There was an error trying to create new user: ${err}`;
      return { error }
    }
}