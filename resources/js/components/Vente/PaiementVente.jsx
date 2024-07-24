import React, { useEffect, useState } from 'react'
import { Col, Form, FormGroup, Image, Modal, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { baseApi } from '../../services/BaseService';
import { Env, formatDate } from '../../config/Env';

function PaiementVente() {

    const [paiement, setPaiement] = useState({ montant: 0, mode_paiement: '2' })
    const [paiements, setPaiements] = useState([]);
    const [total, setTotal] = useState(0);
    const [vente, setVente] = useState();
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        baseApi.get("ventes/" + id).then((result) => {
            setVente(result.data);
        })
        baseApi.get("ventes/paiements/" + id).then((result) => {
            setPaiements(result.data);
            let t = 0;
            result.data.map(element => t += element.montant);
            setTotal(t);
        })
    }, [show, id])


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
                mode_paiement: paiement.mode_paiement,
                vente_id: vente?.id
            }
            baseApi.post("ventes/paiement", tab).then(
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
                    <Modal.Title>Paiement d'un vente</Modal.Title>
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
                            <Form.Check className='text-center' inline name="paiement" value={6} type='radio' id='credit' onChange={(e) => onInputChange(e)}
                                label={(<> Virement </>)} />
                            <Form.Check className='text-center' inline name="paiement" value={7} type='radio' id='credit' onChange={(e) => onInputChange(e)}
                                label={(<> Chéque </>)} />
                        </div>

                        <div>
                            <button className='btn btn-primary'>Enregistrer</button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>


            <div>
                Client: <b>{vente?.client?.nom}</b> <br />
                Téléphone: <i>{vente?.client?.telephone}</i> <br />
                Etat: <span className={vente?.etat == 'en attente' ? 'text-danger' : vente?.etat == 'en cours' ? 'text-warning' : 'text-success'}>{vente?.etat}</span> <br />
                Date: {formatDate(vente?.date)}<br />
            </div>

            <Row>
                <Col md='6'>
                    <h5>Liste des produits vendus</h5>
                    <Table striped bordered  >
                        <thead>
                            <tr>
                                <th>Produit</th>
                                <th>Montant</th>
                                <th>Quantité</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>

                            {vente?.produits?.map(element => {
                                return (<tr>
                                    <td>{element.libelle}</td>
                                    <td>{element.pivot?.montant_vente + " Francs CFA"}</td>
                                    <td>{element.pivot?.quantite}</td>
                                    <td>{element.pivot?.montant_vente * element.pivot?.quantite + " Francs CFA"}</td>

                                </tr>);
                            })}
                        </tbody>
                    </Table>
                    <b>Total: </b> {vente?.montant_total} Francs CFA
                </Col>
                <Col md='6'>
                    <h5>Paiements</h5>
                    {
                        vente?.montant_total > total ?
                            <><span className="btn btn-primary mb-2" onClick={handleShow}>Encaisser</span> </> :
                            <></>
                    }
                    <Table striped bordered >
                        <thead>
                            <tr>
                                <th>Montant</th>
                                <th>Date</th>
                                <th>Mode de Paiement</th>
                            </tr>
                        </thead>
                        <tbody>

                            {paiements?.map(element => {
                                return (<tr>
                                    <td>{element.montant + " Francs CFA"}</td>
                                    <td>{formatDate(element.date)}</td>
                                    <td>{element.mode_paiement}</td>
                                </tr>);
                            })}
                        </tbody>
                    </Table>
                    <b>Total paiement: </b> {total} Francs CFA
                </Col>
            </Row>
        </>
    )
}

export default PaiementVente