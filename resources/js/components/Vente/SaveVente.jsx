import React, { useEffect, useState } from 'react'
import { baseApi } from '../../services/BaseService';
import { Button, Col, Form, FormGroup, Row, Table } from 'react-bootstrap';

function SaveVente() {


    const [vente, setvente] = useState({ date: '', client_id: '' });
    const [produits, setProduits] = useState([]);
    const [produitVentes, setProduitVentes] = useState([]);
    const [clients, setClients] = useState([]);
    const [validated, setValidated] = useState(false);
    const [currentProduit, setCurrentProduit] = useState({ produit_id: '', libelle: '', montant_vente: 0, quantite: 0 })


    useEffect(() => {
        baseApi.get('clients').then(response => {
            setClients(response.data);
        });
        baseApi.get('produits').then(response => {
            setProduits(response.data)
            setCurrentProduit({ ...currentProduit, produit_id: response.data[0].id, libelle: response.data[0].libelle, montant_vente: response.data[0].prix, quantite: response.data[0].quantite })
        })
    }, [])

    const onInputChange = (e) => {
        console.log(e.value);
        setvente({ ...vente, [e.target.name]: e.target.value })
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
        let p = undefined;
        const newProducts = [...produitVentes];
        p = newProducts.find(produit => produit.produit_id === currentProduit.produit_id);

        if (p === undefined) {
            newProducts.push({ produit_id: currentProduit.produit_id, libelle: currentProduit.libelle, montant_vente: currentProduit.montant_vente, quantite: parseInt(currentProduit.quantite) });
        }
        else {
            produitVentes.map((c, i) => {
                if (c.produit_id === currentProduit.produit_id) {
                    console.log(currentProduit);
                    console.log(newProducts[i]);
                    newProducts[i] = currentProduit;
                    newProducts[i] = { produit_id: currentProduit.produit_id, libelle: currentProduit.libelle, montant_vente: currentProduit.montant_vente, quantite: parseInt(currentProduit.quantite) + parseInt(newProducts[i].quantite) };
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
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {

            let tab = {
                date: vente.date,
                client_id: vente.client_id,
                produits: produitVentes
            }
            // var formData = new FormData();
            // formData.append('date', vente.date);
            // formData.append('client_id', vente.client_id);
            // produitVentes.map(e => {
            //     formData.append('produits[]', e);
            // })
            // formData.append('produits', produitVentes);

            if (vente.id === undefined) {
                baseApi.post("ventes", tab).then(
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
                    <Form.Select onChange={changeProduitSelect} >
                        {produits.map((element) => {
                            return <option value={element.id}>{element.libelle}</option>
                        })}
                    </Form.Select>
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

                <Button className='mt-3' type="submit">Enregistrer</Button>

            </Form>
        </>
    )
}

export default SaveVente