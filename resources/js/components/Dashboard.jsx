import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { baseApi } from '../services/BaseService';
import { Col, Row, Table } from 'react-bootstrap';
import { useMediaQuery } from '@mui/material';
import { formatDate } from '../config/Env';

function Dashboard() {



    const matches = useMediaQuery('(min-width:768px)');
    const matchess = useMediaQuery('(min-width:768px)');


    const navigate = useNavigate();
    const decoded = jwtDecode(localStorage.getItem('token', '') ?? '')

    const [abonnementActifs, setAbonnementActifs] = useState([]);
    const [abonnementInactifs, setAbonnementInactifs] = useState([]);
    const [totalAbonnementActif, setTotalAbonnementActif] = useState(0);
    const [totalAbonnementInactif, setTotalAbonnementInactif] = useState(0);
    const [totalNewAbonnement, setTotalNewAbonnement] = useState(0);


    useEffect(() => {
        if (decoded?.role == 'user') {
            navigate('/dashboard');
            return;
        }
        baseApi.get('/dashboard-admin').then((result) => {
            setAbonnementActifs(result.data.abonnementActifs);
            setAbonnementInactifs(result.data.abonnementInactifs);
            setTotalAbonnementActif(result.data.abonnementActifs.length);
            setTotalAbonnementInactif(result.data.abonnementInactifs.length);
            setTotalNewAbonnement(result.data.newAbonnements.length);
        })
    }, [])


    return (

        <>
            <div className="row row-cols-1 row-cols-md-4 row-cols-lg-4 row-cols-xl-4">
                <div className="col">
                    <div className="card radius-10">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div>
                                    <p className="mb-0 text-secondary">Total Abonnement</p>
                                    <h4 >{totalAbonnementActif + totalAbonnementInactif} </h4>
                                </div>
                                <div className="widget-icon-large bg-gradient-success text-white ms-auto"><i className="bi bi-file-fill"></i>
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
                                    <p className="mb-0 text-secondary">Total abonnement actif</p>
                                    <h4 className="my-1">{totalAbonnementActif}</h4>
                                </div>
                                <div className="widget-icon-large bg-gradient-success text-white ms-auto"><i className="bi bi-file-fill"></i>
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
                                    <p className="mb-0 text-secondary">Total abonnement inactif</p>
                                    <h4 className="my-1">{totalAbonnementInactif}</h4>
                                </div>
                                <div className='ms-auto'>
                                    <div className="widget-icon-large bg-gradient-danger text-white ms-auto">
                                        <i className="bi bi-file-x-fill"></i>
                                    </div>

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
                                    <p className="mb-0 text-secondary">Nouveaux abonnements</p>
                                    <h4 >{totalNewAbonnement} </h4>
                                </div>
                                <Link to={'/new-abonnement'}>
                                    <div className="widget-icon-large bg-gradient-success text-white ms-auto"><i className="bi bi-file-fill"></i>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Row>
                <Col md="6" className='mt-2' style={!matches ? { maxHeight: "300px", overflowY: 'auto' } : { height: 'auto' }}>
                    <h5>Abonnement actifs</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nom Entreprise</th>
                                <th>Telephone</th>
                                <th>Adresse</th>
                                <th>Date Limite</th>
                            </tr>
                        </thead>
                        <tbody>
                            {abonnementActifs.map(e => {
                                return (
                                    <tr>
                                        <td>{e.nom}</td>
                                        <td>{e.telephone}</td>
                                        <td>{e.adresse}</td>
                                        <td>{formatDate(e.dateLimit)}</td>
                                        {/* <td>
                                                    <span className='text-primary btn' >
                                                        <Link to={'/clients/' + e.client?.id + '/details'} >{e.client?.nom}</Link>
                                                    </span>
                                                </td>
                                                <td className={e.etat == 'en attente' ? 'text-danger' : e.etat == 'en cours' ? 'text-warning' : 'text-success'}>{e.montant_total} Francs CFA</td>

                                                <td>
                                                    <Link to={`/ventes/${e.id}/details`} >
                                                        <span className='text-primary btn'><i className='bi bi-cash-coin'></i> </span>
                                                    </Link>
                                                    <Link to={`/ventes/${e.id}/facture`} >
                                                        <span className='text-primary btn'><i className='bi bi-file-earmark-text'></i> </span>
                                                    </Link>
                                                </td> */}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Col>
                <Col md="6" className='mt-2' style={!matches ? { maxHeight: "300px", overflowY: 'auto' } : { height: 'auto' }}>
                    <h5>Abonnement inactifs</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nom Entreprise</th>
                                <th>Telephone</th>
                                <th>Adresse</th>
                                <th>Date Limite</th>
                            </tr>
                        </thead>
                        <tbody>
                            {abonnementInactifs.map(e => {
                                return (
                                    <tr>
                                        <td>{e.nom}</td>
                                        <td>{e.telephone}</td>
                                        <td>{e.adresse}</td>
                                        <td>{formatDate(e.dateLimit)}</td>
                                        {/* <td>
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
                                                    {/* <span className='text-primary btn'><i className='bi bi-file-earmark-text'></i> </span> *
                                                </td> */}
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

export default Dashboard