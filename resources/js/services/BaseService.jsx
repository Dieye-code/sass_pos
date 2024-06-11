import axios from 'axios'
import { Env } from '../config/Env';

const api = Env.API_URL;


export const baseApi = axios.create({
    baseURL: `${api}api`
  });
