import axios from 'axios';
import { File } from 'buffer';

const API_URL: string = 'http://localhost:3001/api';

export const login = async (email: string, password: string) => {
  try {
    const { data } = await axios.post(`${API_URL}/login`, { email, password });
    const { token, user } = data;
    return { token, user }
  } catch (err) {
    const error: string = `There was an error trying to login: ${err}`;
    return { error }
  }
}

export const signup = async (username: string, email: string, password: string) => {
  try {
    const { data } = await axios.post(`${API_URL}/signup`, { username, email, password });
    const { token } = data;
    return { token }
  } catch (err) {
    const error: string = `There was an error trying to create new user: ${err}`;
    return { error }
  }
}

export const getUserInfo = async () => {
  try {

    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    const { data } = await axios.get(`${API_URL}/dashboard/profile/${userId}`, {
      headers: {
        Authorization: `${token}`
      }
    });

    const { user, publications } = data;

    return { user, publications }
  } catch (err) {
    const error: string = `There was an error trying to create new user: ${err}`;
    return { error }
  }
}

export const createPublication = async (content: string, file: any) => {
  try {

    const token = sessionStorage.getItem('token') || '';
    const userId = sessionStorage.getItem('userId') || '';

    const formData = new FormData();

    if (file) {
      formData.append('file', file);
      formData.append('fileName', file.name);
    }
    
    formData.append('content', content);
    formData.append('userId', userId);

    const { data } = await axios.post(`${API_URL}/dashboard/newPublication`, formData,
      {
        headers: {
          Authorization: `${token}`
        }
      });

  } catch (error) {
    console.log("ERROR > ", error);
  }
}