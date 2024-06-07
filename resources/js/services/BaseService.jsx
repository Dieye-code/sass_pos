import axios from 'axios'
import React, { Component } from 'react'
import { Env } from '../config/Env';

const apiDev = Env.API_DEV_URL;
const apiProd = Env.API_PROD_URL;

export const BaseService = {
     getAll : () => {
        return axios.get(`{api}/api/agents`);
    }
}


export const baseApi = axios.create({
    baseURL: `${apiProd}api`
  });
