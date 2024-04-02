import axios from 'axios';
import { env } from '../environment.js';

export const login = async(email: string, password: string) => {
    try {
      const { data } = await axios.post(`${env.API_URL}/login`, { email, password });
      const { token } = data;
      return { token }
    } catch(err) {
      const error: string = `There was an error trying to login: ${err}`;
      return { error }
    }
}

export const signup = async(username: string, email: string, password: string) => {
    try {
      const { data } = await axios.post(`${env.API_URL}/signup`, { username, email, password });
      const { token } = data;
      return { token }
    } catch(err) {
      const error: string = `There was an error trying to create new user: ${err}`;
      return { error }
    }
}

export const profile = async(id: string) => {
  try {
    const { data } = await axios.get(`${env.API_URL}/dashboard/profile/${id}`);
    return { data }
  } catch(err) {
    const error: string = `There was an error trying to get user information: ${err}`;
    return { error }
  }
}