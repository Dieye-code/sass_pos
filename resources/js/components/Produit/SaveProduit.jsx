import React, { useState } from 'react'
import { baseApi } from '../../services/BaseService';
import { Button, Form, FormGroup, Row } from 'react-bootstrap';

function SaveProduit({ setShowModal, newProduit = { libelle: "", prix: 0, quantite: 0 } }) {


    const [produit, setProduit] = useState(newProduit);
    const [validated, setValidated] = useState(false);
    const [image, setImage] = useState()

    const onInputChange = (e) => {
        setProduit({ ...produit, [e.target.name]: e.target.value })
    }
    const initProduit = () => {
        setProduit({ libelle: "", prix: 0, quantite: 0 });
    }


    const HandleChangeFile = (e) => {
        setImage(e.target.files[0])
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            var formData = new FormData();
            formData.append('libelle', produit.libelle);
            formData.append('prix', produit.prix);
            formData.append('quantite', produit.quantite);
            formData.append('photo', image);
            if (produit.id === undefined) {
                baseApi.post('produits', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((result) => {
                    setShowModal(false)
                    initProduit();
                });
            } else {
                baseApi.put('produits/' + produit.id, produit).then((result) => {
                    setShowModal(false)
                    initProduit();
                });
            }
        }

        setValidated(true);
    }


    return (
        <>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>

                    <FormGroup >
                        <Form.Label>Libelle</Form.Label>
                        <Form.Control required name='libelle' value={produit.libelle} onChange={(e) => onInputChange(e)} type='text' ></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Prix Unitaire</Form.Label>
                        <Form.Control required name='prix' value={produit.prix} onChange={(e) => onInputChange(e)} type='number' ></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Quantite</Form.Label>
                        <Form.Control required name='quantite' value={produit.quantite} onChange={(e) => onInputChange(e)} type='number' ></Form.Control>
                    </FormGroup>

                    {produit.id === undefined ? (
                        <Form.Group >
                            <Form.Label>Photo</Form.Label>
                            <Form.Control type='file' name='photo' required onChange={(e) => HandleChangeFile(e)} />
                        </Form.Group>) : ''
                    }

                </Row>

                <Button className='mt-3' type="submit">Enregistrer</Button>
            </Form>
        </>
    )
}

export default SaveProduit