import axios from 'axios';

import authHeader from './auth-header';
const http = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-type': 'application/json'
  }
});

class UserDataService {
  // check(sub) {
  //   return http.post(`/users/check`, { headers: authHeader() });
  // }
  getAllMeals(id) {
    return http.get(`/users/${id}/meals`, { headers: authHeader() });
  }

  getAllDishes(id) {
    return http.get(`/users/${id}/dishes`, { headers: authHeader() });
  }

  searchDishes(id, param) {
    return http.get(`/users/${id}/dishes?search=${param}`, {
      headers: authHeader()
    });
  }
}

export default new UserDataService();
