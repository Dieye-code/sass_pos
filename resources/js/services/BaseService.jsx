import axios from 'axios'
import { Env } from '../config/Env';
import { useNavigate } from 'react-router-dom';

const api = Env.API_URL;

var config = {};

const getAccessToken = () => {
  return localStorage.getItem('token');
}

export const baseApi = axios.create({
  baseURL: `${api}api`
});


baseApi.interceptors.request.use(
  config => {
    const token = getAccessToken()
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    // config.headers['Content-Type'] = 'application/json';
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

baseApi.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    
    const navigate = useNavigate();
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      originalRequest.url == `auth/refresh`
    ) {
      
      navigate('/login')
      return Promise.reject(error)
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = getAccessToken()
      const res = await baseApi
        .get('auth/refresh');
      if (res.status === 200) {

        localStorage.setItem('token', res.data.access_token);
        baseApi.defaults.headers.common['Authorization'] =
          'Bearer ' + res.access_token;
        return baseApi(originalRequest);
      }
    }
    return Promise.reject(error)
  }
)
