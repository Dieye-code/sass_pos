import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseApi } from '../../services/BaseService';
import { useAuth } from './AuthProvider';

function Logout() {
  const navigate = useNavigate();
  const user = useAuth();
  useEffect(() => {
    console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token') != null) {
      localStorage.removeItem('token');
      // setToken;
    }
    baseApi.get('logout').then(response => {
      // setToken;
      user.setNewToken(null);
      return navigate('/login', { replace: true });
    }).catch(error => {
      return navigate('/login', { replace: true });
    })
  })
  return (
    <></>
  )
}

export default Logout