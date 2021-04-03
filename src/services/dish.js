import axios from 'axios';

import AuthService from './auth';

const user = AuthService.getCurrentUser();
let instance;

if (user) {
  instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`
    }
  });
}

function index() {
  return instance.get('/users/dishes').then((response) => {
    if (response.data) {
      return response.data;
    }
  });
}

export default {
  index
};
