import axios from 'axios';

import authHeader from './auth-header';

const http = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-type': 'application/json'
  }
});

class MealsDataService {
  getAll() {
    return http.get('/meals');
  }

  getAllUser(id) {
    return http.get(`/users/${id}/meals`, { headers: authHeader() });
  }

  get(id) {
    return http.get(`/meals/${id}`);
  }

  create(data) {
    return http.post('/meals', { headers: authHeader() }, data);
  }

  update(id, data) {
    return http.put(`/meals/${id}`, { headers: authHeader() }, data);
  }

  delete(id) {
    return http.delete(`/meals/${id}`, { headers: authHeader() });
  }

  // deleteAll() {
  //   return http.delete(`/meals`, { headers: authHeader() });
  // }

  // findByTitle(title) {
  //   return http.get(`/meals?title=${title}`);
  // }
}

export default new MealsDataService();
