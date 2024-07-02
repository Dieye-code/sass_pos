import React from 'react'
import { useParams } from 'react-router-dom'

function DetailClient() {

    const {id} = useParams()

  return (
    <>{id}</>
  )
}

export default DetailClient