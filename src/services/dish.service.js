import axios from 'axios';

import authHeader from './auth-header';

const http = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-type': 'application/json'
  }
});

class DishDataService {
  getAll() {
    return http.get('/dish');
  }

  get(id) {
    return http.get(`/dish/${id}`);
  }

  create(data) {
    return http.post('/dish', { headers: authHeader() }, data);
  }

  update(id, data) {
    return http.put(`/dish/${id}`, { headers: authHeader() }, data);
  }

  delete(id) {
    return http.delete(`/dish/${id}`, { headers: authHeader() });
  }

  // deleteAll() {
  //   return http.delete(`/meals`, { headers: authHeader() });
  // }

  findBy(param) {
    return http.get(`/meals?search=${param}`);
  }
}

export default new DishDataService();
