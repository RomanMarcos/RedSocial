import axios from 'axios';

const API_URL: string = 'http://localhost:3000/api';

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

    const { data } = await axios.get(`${API_URL}/profile/${userId}`, {
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

export const getUsers = async() => {
  try {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    const { data } = await axios.get(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `${token}`
      }
    });

    const {  usersToFollow, followedUsers } = data;

    return { usersToFollow, followedUsers };
  } catch (err) {
    const error: string = `There was an error trying to get users: ${err}`;
    return { error }
  }
}

export const followUser = async(id: string) => {
  try {
    const token = sessionStorage.getItem('token') || '';
    const userId = sessionStorage.getItem('userId') || '';
    const { data } = await axios.post(`${API_URL}/followUser/${userId}`, { id }, {
      headers: {
        Authorization: `${token}`
      }
    });
    
    return { data }
  } catch (err) {
    const error: string = `There was an error trying to login: ${err}`;
    return { error }
  }
}

export const unFollowUser = async(id: string) => {
  try {
    const token = sessionStorage.getItem('token') || '';
    const userId = sessionStorage.getItem('userId') || '';
    const { data } = await axios.post(`${API_URL}/unFollowUser/${userId}`, { id }, {
      headers: {
        Authorization: `${token}`
      }
    });
    
    return { data }
  } catch (err) {
    const error: string = `There was an error trying to login: ${err}`;
    return { error }
  }
}

export const createPublication = async (content: string, file: any) => {
  try {

    const token = sessionStorage.getItem('token') || '';
    const userId = sessionStorage.getItem('userId') || '';

    await axios.post(`${API_URL}/newPublication`, {'file': file, 'fileName': file.name, 'content': content, 'userId': userId},
      {
        headers: {
          Authorization: `${token}`
        }
      });

  } catch (error) {
    console.log("ERROR > ", error);
  }
}

export const removePublication = async (id: string) => {
  try {
    const token = sessionStorage.getItem('token') || '';
    await axios.post(`${API_URL}/removePublication/${id}`, {},
      {
        headers: {
          Authorization: `${token}`
        }
      });
  } catch (error) {
    console.log("ERROR > ", error);
  }
}