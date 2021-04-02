import axios from 'axios';

function register(user) {
  return axios
    .post(process.env.REACT_APP_API_URL + '/users', {
      user
    })
    .then((response) => {
      return response.data;
    });
}

function login(user) {
  return axios
    .post(process.env.REACT_APP_API_URL + '/users/login', {
      user
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
  if (localStorage.getItem('user') === null) {
    return true;
  } else {
    return false;
  }
}

function getCurrentUser() {
  // dont save to localstorage
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
}

export default {
  login,
  logout,
  register,
  getCurrentUser
};
