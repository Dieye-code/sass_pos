import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function NotFound() {

  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname == '/login' || window.location.pathname == '/register')
      navigate('/home',{replace: true});
  }, [])

  return (
    <div>NotFound</div>
  )
}

export default NotFound