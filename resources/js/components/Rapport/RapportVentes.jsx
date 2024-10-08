import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { baseApi } from '../../services/BaseService';
import { formatDate } from '../../config/Env';
import { jwtDecode } from 'jwt-decode';

function RapportVentes() {

    const decoded = jwtDecode(localStorage.getItem("token" ?? ""));

    const columns = [
        {
            name: 'Date',
            selector: row => formatDate(row.date),
            sortable: true,
        },
        {
            name: 'Montant Total',
            selector: row => Intl.NumberFormat().format(row.montant_total) + " Francs CFA",
            sortable: true,
        },
        {
            name: 'Montant Encaisé',
            selector: row => Intl.NumberFormat().format(row.paiements.reduce((mt, a) => mt + a.montant, 0)) + " Francs CFA",
            sortable: true,
        },
        {
            name: 'Client',
            selector: row => row.client?.nom,
            sortable: true,
        },
        {
            name: 'Etat',
            selector: row => {

                return <><span className={row.etat === "en attente" ? 'text-danger' : row.etat === "en cours" ? 'text-warning' : 'text-success'}>{row.etat}</span></>
            },
            sortable: true,
        }
    ];

    const paginationComponentOptions = {
        rowsPerPageText: 'lignes par page',
        rangeSeparatorText: 'sur',
    };

    const [filter, setFilter] = useState('jour');
    const [ventes, setVentes] = useState([]);
    const [show, setShow] = useState(false);
    const [interval, setInterval] = useState({ debut: null, fin: null });
    const [total, setTotal] = useState(0);
    const [totalPaye, setTotalPaye] = useState(0);

    useEffect(() => {
        getVente('jour');
        setShow(false);
    }, []);

    const getVente = function (e) {
        baseApi.get('ventes/' + e).then(
            response => {
                setVentes(response.data)
                setTotal(response.data?.reduce((mt, a) => mt + a.montant_total, 0));
                let t = 0;
                response.data?.map(e => {
                    t += e.paiements.reduce((mt, a) => mt + a.montant, 0);
                })
                setTotalPaye(t)

            }
        )
    }
    const getVenteInterval = function () {
        baseApi.post('ventes/intervalle', interval).then(
            response => {
                setVentes(response.data)
                setTotal(response.data?.reduce((mt, a) => mt + a.montant_total, 0));
                let t = 0;
                response.data?.map(e => {
                    t += e.paiements.reduce((mt, a) => mt + a.montant, 0);
                })
                setTotalPaye(t)
            }
        )
    }

    const onInputChange = (e) => {
        setFilter(e.target.value)
        switch (e.target.value) {
            case 'jour':
                setShow(false);
                getVente('jour');
                break;
            case 'semaine':
                setShow(false);
                getVente('semaine');
                break;
            case 'mois':
                setShow(false);
                getVente('mois');
                break;
            case 'interval':
                setShow(true);
                setVentes([]);
                setTotal(0);
                setTotalPaye(0);
                break;

            default:
                break;
        }
    }

    return (
        <>
            {
                decoded.role == 'admin' ?
                    <div key="inline-radio" className="mb-3">
                        <Form.Check inline label="Jour" name="filter" type='radio' id="jour" value={"jour"} onChange={(e) => onInputChange(e)} />
                        <Form.Check inline label="Semaine" name="filter" type='radio' id="semaine" value={"semaine"} onChange={(e) => onInputChange(e)} />
                        <Form.Check inline label="Mois" name="filter" type='radio' id="mois" value={"mois"} onChange={(e) => onInputChange(e)} />
                        <Form.Check inline label="interval" name="filter" type='radio' id="interval" value={"interval"} onChange={(e) => onInputChange(e)} />
                    </div>
                    : <></>
            }


            {show ?
                <Row className='mb-3' >
                    <FormGroup as={Col} sm="5">
                        <Form.Label>Début</Form.Label>
                        <Form.Control type="date" value={interval?.debut} onChange={(e) => setInterval({ ...interval, ['debut']: e.target.value })} />
                    </FormGroup>
                    <FormGroup as={Col} sm="5">
                        <Form.Label>Fin</Form.Label>
                        <Form.Control type="date" value={interval?.fin} onChange={(e) => setInterval({ ...interval, ['fin']: e.target.value })} />
                    </FormGroup>
                    <FormGroup as={Col} sm="2">
                        <Form.Label></Form.Label>
                        <div className='col-auto text-end mb-2'>
                            <Button variant="primary" onClick={() => getVenteInterval()}>Filtrer</Button>
                        </div>
                    </FormGroup>
                </Row>
                : <> </>
            }




            <h6>Rapport vente {filter}</h6>


            <div className="row row-cols-1 row-cols-md-3 ">
                <div className="col">
                    <div className="card radius-10">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div>
                                    <p className="mb-0 text-secondary">Total vendu</p>
                                    <h4 >{Intl.NumberFormat().format(total)} Francs CFA</h4>
                                </div>
                                <div className="widget-icon-large bg-gradient-purple text-white ms-auto"><i className="bi bi-currency-exchange"></i>
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
                                    <p className="mb-0 text-secondary">Total encaissé</p>
                                    <h4 >{Intl.NumberFormat().format(totalPaye)} Francs CFA</h4>
                                </div>
                                <div className="widget-icon-large bg-gradient-purple text-white ms-auto"><i className="bi bi-currency-exchange"></i>
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
                                    <p className="mb-0 text-secondary">Total créance</p>
                                    <h4 >{Intl.NumberFormat().format(total - totalPaye)} Francs CFA</h4>
                                </div>
                                <div className="widget-icon-large bg-gradient-purple text-white ms-auto"><i className="bi bi-currency-exchange"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <DataTable
                noDataComponent="Pas de données trouvées"
                columns={columns}
                data={ventes}
                pagination
                paginationComponentOptions={paginationComponentOptions}
            />

        </>
    )
}

export default RapportVentes