import axios from 'axios'

axios.interceptors.request.use(
  config => {
    config.baseURL = 'http://localhost:8000';

    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
);
