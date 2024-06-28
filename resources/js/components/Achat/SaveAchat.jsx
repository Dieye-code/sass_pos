import React, { useState } from 'react'
import { Button, Col, Container, Form, FormGroup, Image, Modal, Row, Table } from 'react-bootstrap';
import { baseApi } from '../../services/BaseService';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Select from 'react-select';
import SaveFournisseur from '../Fournisseur/SaveFournisseur';
import { Env } from '../../config/Env';

function SaveAchat() {

    // const id = useParams();
    const navigate = useNavigate();
    const [achat, setAchat] = useState({ date: '', fournisseur_id: '', paiement: 0, montant_paye: 0 });
    const [fournisseurs, setFournisseurs] = useState([]);
    const [produits, setProduits] = useState([]);
    const [produitAchats, setProduitAchats] = useState([]);
    const [validated, setValidated] = useState(false);
    const [currentProduit, setCurrentProduit] = useState({ produit_id: '', libelle: '', montant_achat: 0, quantite: 0 })
    const [show, setShow] = useState(false);
    const [total, setTotal] = useState(0);

    const [items, setItems] = useState([]);

    useEffect(() => {
        baseApi.get('fournisseurs').then(response => {
            setFournisseurs(response.data);

        });
        baseApi.get('produits').then(response => {
            setProduits(response.data)
            setCurrentProduit({ ...currentProduit, produit_id: response.data[0].id, libelle: response.data[0].libelle, montant_achat: response.data[0].prix, quantite: 0 })

            setItems(response.data.map(e => { return { value: e.id, label: e.libelle } }))
        })


    }, [show])

    const onInputChange = (e) => {
        setAchat({ ...achat, [e.target.name]: e.target.value })
    }

    const removeProduit = (element) => {
        var p = produitAchats.find(item => item.produit_id == element.produit_id);
        setProduitAchats(produitAchats.filter(item => item.produit_id != element.produit_id));
        let t = total;
        t -= p.montant_achat * p.quantite
        setTotal(t);
        setAchat({ ...achat, ['montant_paye']: t })
    }

    const changeProduitSelect = (e) => {
        const produit = produits.find(p => p.id === e.value);
        setCurrentProduit({ ...currentProduit, produit_id: produit?.id, libelle: produit?.libelle, montant_achat: produit?.prix, quantite: 0 })
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
                text: "Vous devez saisir la quantité à acheter!",
                icon: "info",
                buttons: true,
                showCancelButton: false,
            });
            return;
        }
        let p = undefined;
        const newProducts = [...produitAchats];
        p = newProducts.find(produit => produit.produit_id === currentProduit.produit_id);

        if (p === undefined) {
            newProducts.push({ produit_id: currentProduit.produit_id, libelle: currentProduit.libelle, montant_achat: currentProduit.montant_achat, quantite: parseInt(currentProduit.quantite) });
            setProduitAchats(produitAchats);
            t += currentProduit.montant_achat * parseInt(currentProduit.quantite)
        }
        else {
            produitAchats.map((c, i) => {
                if (c.produit_id === currentProduit.produit_id) {
                    console.log(c);
                    console.log(currentProduit);
                    newProducts[i] = currentProduit;
                    newProducts[i] = { produit_id: currentProduit.produit_id, libelle: currentProduit.libelle, montant_achat: currentProduit.montant_achat, quantite: parseInt(currentProduit.quantite) + parseInt(c.quantite) };
                    t += currentProduit.montant_achat * parseInt(currentProduit.quantite);
                    console.log(currentProduit.montant_achat * (parseInt(currentProduit.quantite) + parseInt(c.quantite)));
                } else {
                    newProducts[i] = c;
                }
            })
        }
        setProduitAchats(newProducts);
        setTotal(t);
        setAchat({ ...achat, ['montant_paye']: t })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (produitAchats.length == 0) {

            swal({
                text: "Vous devez selectionner les produits à acheter!",
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
                date: achat.date,
                fournisseur_id: achat.fournisseur_id,
                produits: produitAchats,
                paiement: achat.paiement,
                montant_paye: achat.montant_paye
            }

            var status;
            if (achat.id === undefined) {
                baseApi.post("achats", tab).then(
                    (response) => {
                        return navigate("/achats");
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    }
                )
            } else {
            }
            if (status == 1)

                return navigate("/achats");
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
                    <Modal.Title>Fournisseur</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <SaveFournisseur setShowModal={setShow} />
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
                    <Form.Label>Prix d'achat</Form.Label>
                    <Form.Control name='montant_achat' value={currentProduit.montant_achat} type='number' onChange={handleValChange} />
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

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>

                    <FormGroup as={Col} >
                        <Form.Label>Date</Form.Label>
                        <Form.Control required name='date' onChange={(e) => onInputChange(e)} type='date' ></Form.Control>
                    </FormGroup>
                    <FormGroup as={Col}>
                        <Form.Label>Fournisseur</Form.Label>
                        <Form.Select name='fournisseur_id' onChange={(e) => onInputChange(e)} value={achat.fournisseur_id} required>

                            <option value="">...........</option>
                            {fournisseurs?.map(element => {
                                return <option value={element?.id} >{element?.nom}</option>
                            })}
                        </Form.Select>
                        <span className="btn btn-primary fs-6 mt-3" onClick={handleShow}>Nouveau Fournisseur</span>
                    </FormGroup>

                </Row>
                <Table className='m-5'>
                    <thead>
                        <th>Libelle</th>
                        <th>Prix d'achat</th>
                        <th>Quantité</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {produitAchats.map(element => {
                            return (
                                <tr>
                                    <td>{element.libelle}</td>
                                    <td>{element.montant_achat} Francs CFA</td>
                                    <td>{element.quantite}</td>
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
                    <b>Total à payer:</b> {total} Francs CFA
                </div>
                <div>
                    <Form.Check className='text-center' inline name="paiement" value={1} type='radio' id='credit' onChange={(e) => onInputChange(e)}
                        label={(<> Crédit </>)} />

                    <Form.Check inline name="paiement" value={2} type='radio' id='cash' onChange={(e) => onInputChange(e)}
                        label={(<Image src={Env.API_URL + "images/cash.jpg"} width={40} height={40} roundedCircle className='mr-2' />)} />

                    <Form.Check inline name="paiement" value={3} type='radio' id='om' onChange={(e) => onInputChange(e)}
                        label={(<Image src={Env.API_URL + "images/om.png"} width={40} height={40} roundedCircle className='mr-2' />)} />

                    <Form.Check inline name="paiement" value={4} type='radio' id='wave' onChange={(e) => onInputChange(e)}
                        label={(<Image src={Env.API_URL + "images/wave.jpg"} width={40} height={40} roundedCircle className='mr-2' />)} />

                    <Form.Check inline name="paiement" value={5} type='radio' id='free' onChange={(e) => onInputChange(e)}
                        label={(<Image src={Env.API_URL + "images/free-money.png"} width={40} height={40} roundedCircle className='mr-2' />)} />
                </div>
                <div>
                    {achat.paiement != 1 ?
                        <FormGroup>
                            <Form.Label>Montant payé</Form.Label>
                            <Form.Control name='montant_paye' value={achat.montant_paye} onChange={e => onInputChange(e)} />
                        </FormGroup>
                        : <></>}
                </div>

                <div><Button className='mt-3' type="submit">Enregistrer</Button></div>

            </Form>
        </>
    )
}

export default SaveAchat