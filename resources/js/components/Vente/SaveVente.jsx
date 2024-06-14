import React, { useEffect, useState } from 'react'
import { baseApi } from '../../services/BaseService';
import { Button, Col, Form, FormGroup, Image, Modal, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SaveClient from '../Client/SaveClient'
import Select from 'react-select';
import { Env } from '../../config/Env';

function SaveVente() {


    const navigate = useNavigate();
    const [vente, setvente] = useState({ date: '', client_id: '', paiement: 1 });
    const [produits, setProduits] = useState([]);
    const [produitVentes, setProduitVentes] = useState([]);
    const [clients, setClients] = useState([]);
    const [validated, setValidated] = useState(false);
    const [currentProduit, setCurrentProduit] = useState({ produit_id: '', libelle: '', montant_vente: 0, quantite: 0 })
    const [show, setShow] = useState(false);
    const [items, setItems] = useState([]);


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
        setvente({ ...vente, [e.target.name]: e.target.value })
    }
    const removeProduit = (element) => {
        setProduitVentes(produitVentes.filter(item => item.produit_id != element.produit_id));
    }

    const changeProduitSelect = (e) => {
        const produit = produits.find(p => p.id === e.target.value);
        setCurrentProduit({ ...currentProduit, produit_id: produit.id, libelle: produit.libelle, montant_vente: produit.prix, quantite: produit.quantite })
    }

    const handleValChange = (e) => {
        setCurrentProduit({ ...currentProduit, [e.target.name]: e.target.value })
    }
    const addProduit = (e) => {
        e.preventDefault();
        e.stopPropagation();

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
        }
        else {
            produitVentes.map((c, i) => {
                if (c.produit_id === currentProduit.produit_id) {
                    newProducts[i] = currentProduit;
                    newProducts[i] = { produit_id: currentProduit.produit_id, libelle: currentProduit.libelle, montant_vente: currentProduit.montant_vente, quantite: parseInt(currentProduit.quantite) + parseInt(c.quantite) };
                } else {
                    newProducts[i] = c;
                }
            })
        }
        setProduitVentes(newProducts);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (produitVentes.length == 0) {

            swal({
                text: "Vous devez selectionner les produits à vendre!",
                icon: "info",
                buttons: true,
                showCancelButton: false,
            });
            return;
        }
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {

            let tab = {
                date: vente.date,
                client_id: vente.client_id,
                produits: produitVentes,
                paiement: vente.paiement
            }

            if (vente.id === undefined) {
                baseApi.post("ventes", tab).then(
                    (response) => {
                        return navigate("/ventes");
                    }
                ).catch(
                    (error) => {
                        console.log(error);

                    }
                )
            } else {
            }
        }
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

            <Row>
                <FormGroup as={Col} sm="6">
                    <Form.Label>Produit</Form.Label>
                    
                    <Select options={items} onChange={changeProduitSelect} name='produit_id' />
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
                <FormGroup as={Col} sm="2" className='d-flex justify-content-end flex-row text-center' >
                    <div className='col-auto text-end mb-2'>
                        <Button onClick={addProduit} >Ajouter</Button>
                    </div>
                </FormGroup>
            </Row>

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
                    </FormGroup>
                    <FormGroup as={Col} sm="1" className='pb-0'><span className="btn btn-primary fs-6" onClick={handleShow}>Nouveau</span></FormGroup>
                </Row>


                <Table className='m-5'>
                    <tbody>
                        {produitVentes.map(element => {
                            return (
                                <tr>
                                    <td>{element.libelle}</td>
                                    <td>{element.montant_vente}</td>
                                    <td>{element.quantite}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <div>
                    <Form.Check className='text-center' inline name="paiement" value="1" type='radio' id='credit' onChange={(e) => onInputChange(e)}
                        label={(<> Crédit </>)} />
                    <Form.Check inline name="paiement" value="2" type='radio' id='cash' onChange={(e) => onInputChange(e)}
                        label={(<Image src={Env.API_URL + "images/cash.jpg"} width={40} height={40} roundedCircle className='mr-2' />)} />
                    <Form.Check inline name="paiement" value="3" type='radio' id='om' onChange={(e) => onInputChange(e)}
                        label={(<Image src={Env.API_URL + "images/om.png"} width={40} height={40} roundedCircle className='mr-2' />)} />
                    <Form.Check inline name="paiement" value="54" type='radio' id='wave' onChange={(e) => onInputChange(e)}
                        label={(<Image src={Env.API_URL + "images/wave.jpg"} width={40} height={40} roundedCircle className='mr-2' />)} />
                    <Form.Check inline name="paiement" value="5" type='radio' id='free' onChange={(e) => onInputChange(e)}
                        label={(<Image src={Env.API_URL + "images/free-money.png"} width={40} height={40} roundedCircle className='mr-2' />)} />
                </div>

                <div><Button className='mt-3' type="submit">Enregistrer</Button></div>

            </Form>
        </>
    )
}

export default SaveVente