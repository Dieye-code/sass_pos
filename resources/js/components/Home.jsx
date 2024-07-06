import React, { useEffect, useState } from 'react'
import { baseApi } from '../services/BaseService';
import { Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

function Home() {


  const matches = useMediaQuery('(min-width:768px)');
  const matchess = useMediaQuery('(min-width:768px)');

  const [ventes, setVentes] = useState([]);
  const [achats, setAchats] = useState([]);
  const [totalVentes, setTotalVentes] = useState(0);
  const [totalAchats, setTotalAchats] = useState(0);
  const [totalCreances, setTotalCreances] = useState([]);
  const [totalDettes, setTotalDettes] = useState([]);

  useEffect(() => {
    baseApi.get('dashboard').then((result) => {
      setVentes(result.data.ventes);
      setAchats(result.data.achats);
      let ta = result.data.achatTotal;
      let tv = result.data.venteTotal;
      setTotalCreances(result?.data?.totalCreances);
      setTotalDettes(result?.data?.totalDettes);
      setTotalAchats(ta);
      setTotalVentes(tv);
    })
  }, [])

  return (
    <>
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
        <div className="col">
          <div className="card radius-10">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div>
                  <p className="mb-0 text-secondary">Total Achat</p>
                  <h4 >{totalAchats} Francs CFA</h4>
                </div>
                <div className="widget-icon-large bg-gradient-success text-white ms-auto"><i className="bi bi-currency-exchange"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card radius-10">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div>
                  <p className="mb-0 text-secondary">totale vente</p>
                  <h4 className="my-1">{totalVentes}  Francs CFA</h4>
                </div>
                <div className="widget-icon-large bg-gradient-success text-white ms-auto"><i className="bi bi-currency-exchange"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card radius-10">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div>
                  <p className="mb-0 text-secondary">total dette</p>
                  <h4 className="my-1">{totalDettes.reduce((mt, a) => mt + a.dette, 0)}  Francs CFA</h4>
                </div>
                <Link to={'/liste-dette'} >
                  <div className="widget-icon-large bg-gradient-danger text-white ms-auto">
                    <i className="bi bi-currency-exchange"></i>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card radius-10">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div>
                  <p className="mb-0 text-secondary">total creance</p>
                  <h4 className="my-1">{totalCreances.reduce((mt, a) => mt + a.dette, 0)}  Francs CFA</h4>
                </div>
                <Link to={'/liste-creance'} >
                  <div className="widget-icon-large bg-gradient-danger text-white ms-auto">
                    <i className="bi bi-currency-exchange"></i>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Row>
        <Col md="6" className='mt-2' style={!matches ? { maxHeight: "300px", overflowY: 'auto' } : { height: 'auto' }}>
          {/* <span>{`(min-width:600px) matches: ${matches}`}</span>; */}
          <span className="btn btn-primary text-white mb-3"><Link className='text-white' to={'/ventes'}>Ventes</Link> </span>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>date</th>
                <th>Client</th>
                <th>Montant</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ventes.map(e => {
                return (
                  <tr>
                    <td>{e.date}</td>
                    <td>
                      <span className='text-primary btn' >
                        <Link to={'/clients/' + e.client?.id + '/details'} >{e.client?.nom}</Link>
                      </span>
                    </td>
                    <td className={e.etat == 'en attente' ? 'text-danger' : e.etat == 'en cours' ? 'text-warning' : 'text-success'}>{e.montant_total} Francs CFA</td>

                    <td>
                      <Link to={`/ventes/${e.id}/details`} >
                        <span className='text-primary btn'><i className='bi bi-cash-coin'></i> </span>
                      </Link>
                      <span className='text-primary btn'><i className='bi bi-file-earmark-text'></i> </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Col>
        <Col md="6" className='mt-2' style={!matches ? { maxHeight: "300px", overflowY: 'auto' } : { height: 'auto' }}>
          <span className="btn btn-primary text-white mb-3"><Link className='text-white' to={'/achats'}>Achats</Link> </span>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Fournisseur</th>
                <th>Montant</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {achats.map(e => {
                return (
                  <tr>
                    <td>{e.date}</td>
                    <td>
                      <span className='text-primary btn' >
                        <Link to={'/fournisseurs/' + e.fournisseur?.id + '/details'} >{e.fournisseur?.nom}</Link>
                      </span>
                    </td>
                    <td className={e.etat == 'en attente' ? 'text-danger' : e.etat == 'en cours' ? 'text-warning' : 'text-success'}>
                      {e.montant_total} Francs CFA
                    </td>
                    <td>
                      <Link to={`/achats/${e.id}/details`} >
                        <span className='text-primary btn'><i className='bi bi-cash-coin'></i> </span>
                      </Link>
                      <span className='text-primary btn'><i className='bi bi-file-earmark-text'></i> </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  )
}

export default Home