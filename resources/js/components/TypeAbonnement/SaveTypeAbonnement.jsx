import React, { useState } from 'react'
import { Button, FormGroup, Row, Form } from 'react-bootstrap';
import { baseApi } from '../../services/BaseService';

function SaveTypeAbonnement({ setShowModal, newType = { libelle: "", inscription: 0, mensualite: 0, mois_reduit_anne: 0, nombre_utilisateur: 0, nombre_produit: 0 } }) {


    const [type, setType] = useState(newType);
    const [validated, setValidated] = useState(false);
    const [load, setLoad] = useState(false);

    const onInputChange = (e) => {
        setType({ ...type, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        setLoad(true);
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            if (type.id === undefined) {
                baseApi.post('type-abonnements', type).then((result) => {
                    setShowModal(false)
                });
            } else {
                baseApi.put('type-abonnements/' + type.id, type).then((result) => {
                    setShowModal(false)
                });
            }
        }
        setValidated(true);
        setLoad(false);
    }
    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <FormGroup >
                        <Form.Label>Libelle</Form.Label>
                        <Form.Control required name='libelle' value={type.libelle} onChange={(e) => onInputChange(e)} type='text' ></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Inscription</Form.Label>
                        <Form.Control required name='inscription' value={type.inscription} onChange={(e) => onInputChange(e)} type='number' ></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Mensualité</Form.Label>
                        <Form.Control required name='mensualite' value={type.mensualite} onChange={(e) => onInputChange(e)} type='number' ></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Nombre  de mois réduit sur le paiement annuelle</Form.Label>
                        <Form.Control required name='mois_reduit_anne' value={type.mois_reduit_anne} onChange={(e) => onInputChange(e)} type='number' ></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Nombre maximal d'utilisateur</Form.Label>
                        <Form.Control required name='nombre_utilisateur' value={type.nombre_utilisateur} onChange={(e) => onInputChange(e)} type='number' ></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Nombre maximal de produit</Form.Label>
                        <Form.Control required name='nombre_produit' value={type.nombre_produit} onChange={(e) => onInputChange(e)} type='number' ></Form.Control>
                    </FormGroup>
                </Row>

                <div>
                    <Button className='mt-3' type="submit">
                        Enregistrer
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default SaveTypeAbonnement