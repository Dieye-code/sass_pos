import React, { useState } from 'react'
import { Button, Col, Container, Form, FormGroup, Row, Table } from 'react-bootstrap';
import { baseApi } from '../../services/BaseService';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Select from 'react-select';

function SaveAchat() {

    // const id = useParams();
    const [achat, setAchat] = useState({ date: '', fournisseur_id: '' });
    const [fournisseurs, setFournisseurs] = useState([]);
    const [produits, setProduits] = useState([]);
    const [produitAchats, setProduitAchats] = useState([]);
    const [validated, setValidated] = useState(false);
    const [currentProduit, setCurrentProduit] = useState({ produit_id: '', libelle: '', montant_achat: 0, quantite: 0 })

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


    }, [])

    const onInputChange = (e) => {
        setAchat({ ...achat, [e.target.name]: e.target.value })
    }

    const removeProduit = (element) => {
        setProduitAchats(produitAchats.filter(item => item.produit_id != element.produit_id));
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
        }
        else {
            produitAchats.map((c, i) => {
                if (c.produit_id === currentProduit.produit_id) {
                    newProducts[i] = currentProduit;
                    newProducts[i] = { produit_id: currentProduit.produit_id, libelle: currentProduit.libelle, montant_achat: currentProduit.montant_achat, quantite: parseInt(currentProduit.quantite) + parseInt(c.quantite) };
                } else {
                    newProducts[i] = c;
                }
            })
        }
        setProduitAchats(newProducts);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {

            let tab = {
                date: achat.date,
                fournisseur_id: achat.fournisseur_id,
                produits: produitAchats
            }
            // var formData = new FormData();
            // formData.append('date', achat.date);
            // formData.append('fournisseur_id', achat.fournisseur_id);
            // produitAchats.map(e => {
            //     formData.append('produits[]', e);
            // })
            // formData.append('produits', produitAchats);

            if (achat.id === undefined) {
                baseApi.post("achats", tab).then(
                    (response) => {
                        console.log(response);
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                        // for (const key in error.response.data.errors) {
                        //   if (Object.hasOwnProperty.call(error.response.data.errors, key)) {
                        //     const element = error.response.data.errors[key];
                        //     console.log(element.toString());
                        //   }
                        // }
                        // console.log(error.response.data.errors);

                    }
                )
            } else {

                // baseApi.put("clients/" + client.id, client).then(
                //     (response) => {
                //         console.log(response);
                //         setShowModal(false);
                //         initClient();
                //     }
                // ).catch(
                //     (error) => {
                //         // for (const key in error.response.data.errors) {
                //         //   if (Object.hasOwnProperty.call(error.response.data.errors, key)) {
                //         //     const element = error.response.data.errors[key];
                //         //     console.log(element.toString());
                //         //   }
                //         // }
                //         // console.log(error.response.data.errors);

                //     }
                // )
            }
        }
        setValidated(true);
    };
    return (
        <>
            <Row>
                <FormGroup as={Col} sm="6">
                    <Form.Label>Produit</Form.Label>

                    <Select options={items} onChange={changeProduitSelect} name='produit_id'/>

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
                        <Form.Label>Fournisseur</Form.Label>
                        <Form.Select name='fournisseur_id' onChange={(e) => onInputChange(e)} value={achat.fournisseur_id} required>

                            <option value="">...........</option>
                            {fournisseurs?.map(element => {
                                return <option value={element?.id} >{element?.nom}</option>
                            })}
                        </Form.Select>
                    </FormGroup>
                </Row>


                <Table className='m-5'>
                    <tbody>
                        {produitAchats.map(element => {
                            return (
                                <tr>
                                    <td>{element.libelle}</td>
                                    <td>{element.montant_achat}</td>
                                    <td>{element.quantite}</td>
                                    <td>
                                        <span className='text-danger btn' onClick={() => {
                                            removeProduit(element)
                                        }}><i className="fs-3 bi bi-trash m-r-5"></i></span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>

                <Button className='mt-3' type="submit">Enregistrer</Button>

            </Form>
        </>
    )
}

export default SaveAchat