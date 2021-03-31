import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users/';

function register(email, password, confirmPassword) {
  return axios.post(API_URL, {
    email,
    password,
    confirmPassword
  });
}

function login(email, password) {
  return axios
    .post(API_URL + 'login', {
      email,
      password
    })
    .then((response) => {
      if (response.data.user.token) {
        // dont save to localstorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    });
}

function logout() {
  // dont save to localstorage
  localStorage.removeItem('user');
}

function getCurrentUser() {
  // dont save to localstorage
  const user = JSON.parse(localStorage.getItem('user'));
  console.table(user);
  return user;
}

export default {
  login,
  logout,
  register,
  getCurrentUser
};
