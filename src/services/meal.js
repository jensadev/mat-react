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

function index(page) {
  return instance.get('/users/meals?page=' + page).then((response) => {
    if (response.data) {
      return response.data;
    }
  });
}

function create(meal) {
  return instance
    .post('/meals', {
      meal
    })
    .then((response) => {
      if (response.data) {
        return response.data;
      }
    });
}

function update(meal) {
  return instance
    .patch('/meals', {
      meal
    })
    .then((response) => {
      if (response.data) {
        return response.data;
      }
    });
}

function destroy(id) {
  return instance.delete('/meals/' + id).then((response) => {
    if (response.data) {
      return response.data;
    }
  });
}

export default {
  index,
  create,
  destroy,
  update
};
