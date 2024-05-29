import React from 'react'
import { Col, Image } from 'react-bootstrap'
import Agents from './Agent/Agents'

function List() {
  return (
    <div>

      <Image src="/assets/images/gallery/01.png" height={100} width={100} roundedCircle />


      <h6 className="mb-0 text-uppercase">DataTable Example</h6>
      <hr />
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <Agents />
          </div>
        </div>
      </div>
    </div>
  )
}

export default List