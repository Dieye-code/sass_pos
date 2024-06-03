import React, { useEffect, useState } from 'react'
import { baseApi } from '../services/BaseService';
import { Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {


  const [ventes, setVentes] = useState([]);
  const [achats, setAchats] = useState([]);
  const [totalVentes, setTotalVentes] = useState(0);
  const [totalAchats, setTotalAchats] = useState(0);

  useEffect(() => {
    baseApi.get('dashboard').then((result) => {
      setVentes(result.data.ventes);
      setAchats(result.data.achats);
      let ta = 0;
      let tv = 0;
      result.data.ventes.map(e => {
        tv += e.montant_total;
      })
      result.data.achats.map(e => {
        ta += e.montant_total;
      })
      setTotalAchats(ta);
      setTotalVentes(tv);
    })
  }, [])

  return (
    <>
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 row-cols-xl-3">
        <div className="col">
          <div className="card radius-10">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div>
                  <p className="mb-0 text-secondary">Total Achat</p>
                  <h4 className="my-1">{totalAchats} Francs CFA</h4>
                </div>
                <div className="widget-icon-large bg-gradient-purple text-white ms-auto"><i className="bi bi-basket2-fill"></i>
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
                  <p className="mb-0 text-secondary">Total Vente</p>
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
                  <p className="mb-0 text-secondary">Solde</p>
                  <h4 className="my-1">{totalVentes - totalAchats}  Francs CFA</h4>
                </div>
                <div className="widget-icon-large bg-gradient-danger text-white ms-auto"><i className="bi bi-currency-exchange"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Row>
        <Col md="6">

          <span className="btn btn-primary text-white mb-3"><Link className='text-white' to={'/achats'}>Achats</Link> </span>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Fournisseur</th>
                <th>Montant</th>
              </tr>
            </thead>
            <tbody>
              {achats.map(e => {
                return (
                  <tr>
                    <td>{e.date}</td>
                    <td>{e.fournisseur?.nom}</td>
                    <td>{e.montant_total} Francs CFA</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Col>
        <Col md="6">
          <span className="btn btn-primary text-white mb-3"><Link className='text-white' to={'/ventes'}>Ventes</Link> </span>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>date</th>
                <th>Client</th>
                <th>Montant</th>
              </tr>
            </thead>
            <tbody>
              
            {ventes.map(e => {
                return (
                  <tr>
                    <td>{e.date}</td>
                    <td>{e.client?.nom}</td>
                    <td>{e.montant_total} Francs CFA</td>
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