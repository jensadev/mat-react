import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

function signUp(email, password, confirmPassword) {
  return axios.post(API_URL + 'signup', {
    email,
    password,
    confirmPassword
  });
}

function signIn(email, password) {
  return axios
    .post(API_URL + 'signin', {
      email,
      password
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
}

function signOut() {
  localStorage.removeItem('user');
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export default {
  signIn,
  signOut,
  signUp,
  getCurrentUser
};
