import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { baseApi } from '../../services/BaseService';
import DataTable from 'react-data-table-component';
import { Col, Form, FormGroup, Image, Modal, Row } from 'react-bootstrap';
import { Env } from '../../config/Env';

function DetailFournisseur() {

    const columns = [
        {
            name: 'Date',
            selector: row => row.date,
            sortable: true,
        },
        {
            name: 'Montant Total',
            selector: row => row.montant_total + " Francs CFA",
            sortable: true,
        },
        {
            name: 'Etat',
            selector: row => {
                return <><span className={row.etat == 'en attente' ? 'text-danger' : row.etat == 'en cours' ? 'text-primary' : 'text-success'}>{row.etat}</span></>
            },
            grow: 1.5,
            sortable: true,
        },
        {
            name: 'Montant Payé',
            selector: row => {
                if (row.etat == 'en attente' || row.etat == 'payé') {
                    return row.etat == 'en attente' ? <>0 Francs CFA</> : <>{row.montant_total} Francs CFA</>;
                } else {
                    const t = row.paiements.reduce((mt, a) => mt + a.montant, 0)
                    return <>{t} Francs CFA</>;
                }
            },
            grow: 1.5,
            sortable: true,
        },
        {
            name: 'Montant Restant',
            selector: row => {
                if (row.etat == 'en attente' || row.etat == 'payé') {
                    return row.etat == 'en attente' ? <>{row.montant_total} Francs CFA</> : <>0 Francs CFA</>;
                } else {
                    const t = row.paiements.reduce((mt, a) => mt + a.montant, 0)
                    return <>{row.montant_total - t} Francs CFA</>;
                }
            },
            grow: 1.5,
            sortable: true,
        },
        {
            name: 'Edit',
            selector: row => (
                <>
                    <span className='text-primary btn'>
                        <Link to={'/achats/' + row.id + '/details'}><i className="bi bi-eye m-r-5"></i></Link>
                    </span>
                </>
            )
        },
    ];
    const paginationComponentOptions = {
        rowsPerPageText: 'lignes par page',
        rangeSeparatorText: 'sur',
    };

    const { id } = useParams();

    const [fournisseur, setFournisseur] = useState();
    const [achats, setAchats] = useState([]);
    const [totalDettes, setTotalDettes] = useState(0);
    const [paiement, setPaiement] = useState({ montant: 0, mode_paiement: '2' })
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        baseApi.get(`fournisseurs/${id}/details`).then(response => {
            setFournisseur(response?.data?.fournisseur);
            setAchats(response?.data?.achats);
            let montant = 0;
            response?.data?.achats.map(e => {
                const t = e.paiements.reduce((mt, a) => mt + a.montant, 0);
                montant += e.montant_total - t;
            })
            setTotalDettes(montant);
            setPaiement({ ...paiement, ['montant']: montant })
        }).catch(error => {
            console.log(error)
        }
        )
    }, [show])


    const onInputChange = (e) => {
        setPaiement({ ...paiement, [e.target.name]: e.target.value })
    }
    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {

            let tab = {
                montant: paiement.montant,
                mode_paiement: paiement.mode_paiement
            }
            baseApi.post("fournisseurs/" + fournisseur?.id + "/paiement", tab).then(
                (response) => {
                    handleClose();
                }
            ).catch(
                (error) => {
                    swal({
                        text: error.response?.data[0],
                        icon: "info",
                        buttons: true,
                        showCancelButton: false,
                    });
                    console.log(error.response.data);
                }
            )
        }
        setValidated(true);
    };

    return (
        <>


            <Modal show={show} size='lg' centered
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Paiement de la dette</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <FormGroup>
                            <Form.Label>Montant</Form.Label>
                            <Form.Control type='number' name='montant' value={paiement.montant} required onChange={(e) => onInputChange(e)} />
                        </FormGroup>
                        <div>
                            <Form.Check inline name="mode_paiement" value="2" checked type='radio' id='cash' onChange={(e) => onInputChange(e)}
                                label={(<Image src={Env.API_URL + "images/cash.jpg"} width={40} height={40} roundedCircle className='mr-2' />)} />
                            <Form.Check inline name="mode_paiement" value="3" type='radio' id='om' onChange={(e) => onInputChange(e)}
                                label={(<Image src={Env.API_URL + "images/om.png"} width={40} height={40} roundedCircle className='mr-2' />)} />
                            <Form.Check inline name="mode_paiement" value="4" type='radio' id='wave' onChange={(e) => onInputChange(e)}
                                label={(<Image src={Env.API_URL + "images/wave.jpg"} width={40} height={40} roundedCircle className='mr-2' />)} />
                            <Form.Check inline name="mode_paiement" value="5" type='radio' id='free' onChange={(e) => onInputChange(e)}
                                label={(<Image src={Env.API_URL + "images/free-money.png"} width={40} height={40} roundedCircle className='mr-2' />)} />
                            <Form.Check className='text-center' inline name="paiement" value={6} type='radio' id='credit' onChange={(e) => onInputChange(e)} label={(<> Virement </>)} />
                            <Form.Check className='text-center' inline name="paiement" value={7} type='radio' id='credit' onChange={(e) => onInputChange(e)} label={(<> Chéque </>)} />
                        </div>

                        <div>
                            <button className='btn btn-primary'>Enregistrer</button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <Row>
                <Col md={4} >
                    <div>
                        Fournisseur: <b>{fournisseur?.nom}</b> <br />
                        adresse: <i>{fournisseur?.adresse}</i> <br />
                        Téléphone: <i>{fournisseur?.telephone}</i> <br />
                    </div>
                </Col>

                <Col md={8} >
                    <div className="row row-cols-1 row-cols-md-2 ">
                        <div className="col">
                            <div className="card radius-10">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <p className="mb-0 text-secondary">Total achat</p>
                                            <h4 >{achats.reduce((mt, a) => mt + a.montant_total, 0)} Francs CFA</h4>
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
                                            <p className="mb-0 text-secondary">Totale dette</p>
                                            <h4 >{totalDettes} Francs CFA</h4>
                                        </div>
                                        <div className="widget-icon-large bg-gradient-purple text-white ms-auto"><i className="bi bi-currency-exchange"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {totalDettes > 0 ? <span className='btn btn-primary' onClick={handleShow}>Payer</span> : <></>}
                    </div>
                </Col>
            </Row>

            <h4 className="card-title">Liste des achats</h4>
            <DataTable
                columns={columns}
                data={achats}
                pagination
                paginationComponentOptions={paginationComponentOptions}
            />
        </>
    )
}

export default DetailFournisseur