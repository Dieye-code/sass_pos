import React, { useEffect, useState } from 'react'
import { baseApi } from '../../services/BaseService';
import { Button, Col, Form, FormGroup, Image, Modal, Row, Spinner, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SaveClient from '../Client/SaveClient'
import Select from 'react-select';
import { Env } from '../../config/Env';

function SaveVente() {


    const navigate = useNavigate();
    const [vente, setVente] = useState({ date: '', client_id: '', paiement: 0, montant_paye: 0 });
    const [produits, setProduits] = useState([]);
    const [produitVentes, setProduitVentes] = useState([]);
    const [clients, setClients] = useState([]);
    const [validated, setValidated] = useState(false);
    const [currentProduit, setCurrentProduit] = useState({ produit_id: '', libelle: '', montant_vente: 0, quantite: 0 })
    const [show, setShow] = useState(false);
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [load, setLoad] = useState(false);

    const [facture, SetFacture] = useState(false)


    useEffect(() => {
        baseApi.get('clients').then(response => {
            setClients(response.data);
        });
        baseApi.get('produits').then(response => {
            setProduits(response.data)
            setCurrentProduit({ ...currentProduit, produit_id: response.data[0].id, libelle: response.data[0].libelle, montant_vente: response.data[0].prix, quantite: 0 })
            setItems(response.data.map(e => { return { value: e.id, label: e.libelle } }))
        })
    }, [show])

    const onInputChange = (e) => {
        setVente({ ...vente, [e.target.name]: e.target.value })
    }
    const removeProduit = (element) => {


        var p = produitVentes.find(item => item.produit_id == element.produit_id);
        setProduitVentes(produitVentes.filter(item => item.produit_id != element.produit_id));
        let t = total;
        t -= p.montant_vente * p.quantite
        setTotal(t);
        setVente({ ...vente, ['montant_paye']: t })
    }

    const changeProduitSelect = (e) => {
        const produit = produits.find(p => p.id === e.value);
        setCurrentProduit({ ...currentProduit, produit_id: produit.id, libelle: produit.libelle, montant_vente: produit.prix, quantite: 0 })
    }

    const handleValChange = (e) => {
        setCurrentProduit({ ...currentProduit, [e.target.name]: e.target.value })
    }
    const addProduit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let t = total;

        if (currentProduit.quantite <= 0) {
            swal({
                text: "Vous devez saisir la quantité à vendre!",
                icon: "info",
                buttons: true,
                showCancelButton: false,
            });
            return;
        }
        let p = undefined;
        const newProducts = [...produitVentes];
        p = newProducts.find(produit => produit.produit_id === currentProduit.produit_id);

        if (p === undefined) {
            newProducts.push({ produit_id: currentProduit.produit_id, libelle: currentProduit.libelle, montant_vente: currentProduit.montant_vente, quantite: parseInt(currentProduit.quantite) });
            setProduitVentes(produitVentes);
            t += currentProduit.montant_vente * parseInt(currentProduit.quantite)
        }
        else {
            produitVentes.map((c, i) => {
                if (c.produit_id === currentProduit.produit_id) {
                    newProducts[i] = currentProduit;
                    newProducts[i] = { produit_id: currentProduit.produit_id, libelle: currentProduit.libelle, montant_vente: currentProduit.montant_vente, quantite: parseInt(currentProduit.quantite) + parseInt(c.quantite) };
                    t += currentProduit.montant_vente * parseInt(currentProduit.quantite);
                } else {
                    newProducts[i] = c;
                }
            })
        }
        setTotal(t);
        setVente({ ...vente, ['montant_paye']: t })
        setProduitVentes(newProducts);
    }

    const handleSubmit = (event) => {
        setLoad(true);
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (produitVentes.length == 0) {
            swal({
                text: "Vous devez selectionner les produits à vendre!",
                icon: "info",
                buttons: true,
                showCancelButton: false,
            });
            setLoad(false);
            return;
        }
        if (vente.paiement == 0) {
            swal({
                text: "Vous devez selectionner le moyen de paiement!",
                icon: "info",
                buttons: true,
                showCancelButton: false,
            });
            setLoad(false);
            return;
        }
        if (total < vente.montant_paye) {
            swal({
                text: "Le montant payé doit etre inferieur au montant total",
                icon: "info",
                buttons: true,
                showCancelButton: false,
            });
            setLoad(false);
            return;
        }
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {

            let tab = {
                date: vente.date,
                client_id: vente.client_id,
                produits: produitVentes,
                paiement: vente.paiement,
                montant_paye: vente.montant_paye
            }
            if (vente.id === undefined) {
                baseApi.post("ventes", tab).then(
                    (response) => {
                        if (response.status === 200) {
                            if (facture)
                                return navigate(`/ventes/${response.data.id}/facture`);
                            else
                                return navigate(`/ventes`);
                        } else {
                            swal({
                                text: response.data?.error,
                                icon: "info",
                                buttons: true,
                                showCancelButton: false,
                            })
                        }
                        // setLoad(false);
                        // return navigate("/ventes");
                    }
                ).catch(
                    (error) => {
                        if (error.response?.status == 400)
                            swal({
                                text: error.response?.data?.error,
                                icon: "info",
                                buttons: true,
                                showCancelButton: false,
                            })

                    }
                )
            } else {
            }
        }
        setLoad(false)
        setValidated(true);
    };
    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);


    return (
        <>
            <Modal show={show} size='lg' centered
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Client</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <SaveClient setShowModal={setShow} />
                </Modal.Body>
            </Modal>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <FormGroup as={Col} >
                        <Form.Label>Date</Form.Label>
                        <Form.Control required name='date' onChange={(e) => onInputChange(e)} type='date' ></Form.Control>
                    </FormGroup>
                    <FormGroup as={Col}>
                        <Form.Label>Client</Form.Label>
                        <Form.Select name='client_id' onChange={(e) => onInputChange(e)} value={vente.client_id} required>

                            <option value="">...........</option>
                            {clients?.map(element => {
                                return <option value={element?.id} >{element?.nom}</option>
                            })}
                        </Form.Select>
                        <span className="btn btn-primary fs-6 mt-3" onClick={handleShow}>Nouveau Client</span>
                    </FormGroup>
                </Row>

                <Row className='mt-3'>
                    <FormGroup as={Col} sm="6">
                        <Form.Label>Produit</Form.Label>

                        <Select options={items} onChange={changeProduitSelect} name='produit_id' required />
                        {/* <Form.Select onChange={changeProduitSelect} >
                        {produits.map((element) => {
                            return <option value={element.id}>{element.libelle}</option>
                        })}
                    </Form.Select> */}
                    </FormGroup>
                    <FormGroup as={Col} sm="2">
                        <Form.Label>Prix d'vente</Form.Label>
                        <Form.Control name='montant_vente' value={currentProduit.montant_vente} type='number' onChange={handleValChange} />
                    </FormGroup>
                    <FormGroup as={Col} sm="2">
                        <Form.Label>Quantité</Form.Label>
                        <Form.Control name='quantite' value={currentProduit.quantite} type='number' onChange={handleValChange} />
                    </FormGroup>
                    <FormGroup as={Col}>
                        <Form.Label></Form.Label>
                        <div className='col-auto text-end mb-2'>
                            <Button onClick={addProduit} >Ajouter</Button>
                        </div>
                    </FormGroup>
                </Row>

                <Table className='m-5'>
                    <thead>
                        <th>Libelle</th>
                        <th>Prix de vente</th>
                        <th>Quantité</th>
                        <th>Total</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {produitVentes.map(element => {
                            return (
                                <tr>
                                    <td>{element.libelle}</td>
                                    <td>{Intl.NumberFormat().format(element.montant_vente)} Francs CFA</td>
                                    <td>{element.quantite}</td>
                                    <td>{Intl.NumberFormat().format(element.montant_vente * element.quantite)} Francs CFA</td>
                                    <td>
                                        <span className='text-danger btn' onClick={() => {
                                            removeProduit(element)
                                        }}><i className="fs-5 bi bi-trash m-r-5"></i></span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <div>
                    <b>Total à encaiser:</b> {total} Francs CFA
                </div>
                <div>
                    <Form.Check className='text-center' inline name="paiement" value="1" type='radio' id='credit' onChange={(e) => onInputChange(e)}
                        label={(<> Crédit </>)} />
                    <Form.Check inline name="paiement" value="2" type='radio' id='cash' onChange={(e) => onInputChange(e)}
                        label={(<Image src={Env.API_URL + "images/cash.jpg"} width={40} height={40} roundedCircle className='mr-2' />)} />
                    <Form.Check inline name="paiement" value="3" type='radio' id='om' onChange={(e) => onInputChange(e)}
                        label={(<Image src={Env.API_URL + "images/om.png"} width={40} height={40} roundedCircle className='mr-2' />)} />
                    <Form.Check inline name="paiement" value="4" type='radio' id='wave' onChange={(e) => onInputChange(e)}
                        label={(<Image src={Env.API_URL + "images/wave.jpg"} width={40} height={40} roundedCircle className='mr-2' />)} />
                    <Form.Check inline name="paiement" value="5" type='radio' id='free' onChange={(e) => onInputChange(e)}
                        label={(<Image src={Env.API_URL + "images/free-money.png"} width={40} height={40} roundedCircle className='mr-2' />)} />
                    <Form.Check className='text-center' inline name="paiement" value={6} type='radio' id='credit' onChange={(e) => onInputChange(e)}
                        label={(<> Virement </>)} />
                    <Form.Check className='text-center' inline name="paiement" value={7} type='radio' id='credit' onChange={(e) => onInputChange(e)}
                        label={(<> Chéque </>)} />
                </div>
                <div>
                    {vente.paiement != 1 ?
                        <FormGroup>
                            <Form.Label>Montant encaiser</Form.Label>
                            <Form.Control name='montant_paye' value={vente.montant_paye} onChange={e => onInputChange(e)} />
                        </FormGroup>
                        : <></>}
                </div>

                
                <div>
                    <b>Montant restant: </b> {Intl.NumberFormat().format(total - vente.montant_paye)} Francs CFA
                </div>


                <div>
                    <Button className='mt-3' type="submit" disabled={load}>
                        {load ? <><Spinner animation="border" size='sm' /><span>Chargement...</span></> : <span className='m-2'>Enregistrer</span>}
                    </Button>
                    <Button className='mt-3 mx-3' type="submit" disabled={load} onClick={(e) => SetFacture(true)}>
                        {load ? <><Spinner animation="border" size='sm' /><span>Chargement...</span></> : <span className='m-2'>Enregistrer et Imprimer</span>}
                    </Button>
                </div>

            </Form>
        </>
    )
}

export default SaveVente