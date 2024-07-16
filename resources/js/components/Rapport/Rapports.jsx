import React from 'react'
import { Nav } from 'react-bootstrap'
import RapportAchats from './RapportAchats'
import RapportVentes from './RapportVentes'
import RapportProduits from './RapportProduits'

function Rapports() {
  return (
    <>


      <div className="card">
        <div className="card-body">
          <ul className="nav nav-tabs nav-primary" role="tablist">


            <li className="nav-item" role="presentation">
              <a className="nav-link active" data-bs-toggle="tab" href="#achat" role="tab" aria-selected="true">
                <div className="d-flex align-items-center">
                  <div className="tab-icon"><i className='bi bi-receipt-cutoff fs-5 mx-2'></i></div>
                  <div className="tab-title">Rapport achat</div>
                </div>
              </a>
            </li>


            <li className="nav-item" role="presentation">
              <a className="nav-link" data-bs-toggle="tab" href="#vente" role="tab" aria-selected="false">
                <div className="d-flex align-items-center">
                  <div className="tab-icon"><i className='bi bi-receipt-cutoff fs-5 mx-2'></i></div>
                  <div className="tab-title">Rapport vente</div>
                </div>
              </a>
            </li>


            {/* <li className="nav-item" role="presentation">
              <a className="nav-link" data-bs-toggle="tab" href="#produit" role="tab" aria-selected="false">
                <div className="d-flex align-items-center">
                  <div className="tab-icon"><i className='bx bx-microphone font-18 me-1'></i>
                  </div>
                  <div className="tab-title">Contact</div>
                </div>
              </a>
            </li> */}
          </ul>
          <div className="tab-content py-3">
            <div className="tab-pane fade active show" id="achat" role="tabpanel">
              <RapportAchats />
            </div>
            <div className="tab-pane fade" id="vente" role="tabpanel">
              <RapportVentes />
            </div>
            <div className="tab-pane fade" id="produits" role="tabpanel">
              <RapportProduits />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Rapports