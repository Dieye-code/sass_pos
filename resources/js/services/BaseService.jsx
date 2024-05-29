import axios from 'axios'
import React, { Component } from 'react'
import { Env } from '../config/Env';

const api = Env.API_URL;

export const BaseService = {
     getAll : () => {
        return axios.get(`{api}/api/agents`);
    }
}


export const baseApi = axios.create({
    baseURL: `${api}/api`
  });
