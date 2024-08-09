import axios from 'axios'
import { Env } from '../config/Env';

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
    const originalRequest = error.config

    if (
      error.response.status === 401 &&
      originalRequest.url == `auth/refresh`
    ) {
      localStorage.removeItem('token');
      window.location.href = '/login'
      return Promise.reject(error)
    }

    if (error.response.status === 401 && !originalRequest._retry &&  originalRequest.url != "login") {
      originalRequest._retry = true
      const refreshToken = getAccessToken()
      baseApi.get('auth/refresh').then(res => {
        if (res.status === 200) {

          if (res.data.access_token != undefined) {

            localStorage.setItem('token', res.data.access_token);
            baseApi.defaults.headers.common['Authorization'] =
              'Bearer ' + res.access_token;
            return baseApi(originalRequest);
          } else {
            localStorage.removeItem('token');
            window.location.href = '/login'
          }

          return Promise.reject(error)
        }
      })

    }
    return Promise.reject(error)
  }
)
