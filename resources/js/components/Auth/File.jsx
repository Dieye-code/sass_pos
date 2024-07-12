import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function File() {
    const navigate = useNavigate();
    useEffect(() => {
        return navigate('/login', { replace: true });
    })
  return (
    <div>File</div>
  )
}

export default File