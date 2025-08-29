import React, { useState } from 'react'
import { baseApi } from '../../services/BaseService';
import { Button, Col, Form, FormGroup, Row } from 'react-bootstrap';

function SaveDepenses({ setShowModal,
    newDepense = { libelle: "", montant: 0, date: "", pieces_justificatifs: null }
}) {



    const [depense, setDepense] = useState(newDepense);
    const [validated, setValidated] = useState(false);
    const [load, setLoad] = useState(false);

    const onInputChange = (e) => {
        setDepense({ ...depense, [e.target.name]: e.target.value })
    }
    const initDepense = () => {
        setDepense({ libelle: "", montant: 0, date: "", pieces_justificatifs: null });
    }
    
    const HandleChangeFile = (e) => {
        const imageFile = e.target.files[0];
        if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
            swal({
                text: "La piéce justificatif doit etre une image!",
                icon: "info",
                buttons: true,
                showCancelButton: false,
            });
            e.value = '';
            e.target.value = '';
            e.preventDefault();
            return;
        }
        
        imageFile ? setDepense({ ...depense, ['pieces_justificatifs']: imageFile }) : '';
    }

    const handleSubmit = (event) => {
        setLoad(true)
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            

            var formData = new FormData();
            formData.append('date', depense.date);
            formData.append('libelle', depense.libelle);
            formData.append('montant', depense.montant);
            depense.pieces_justificatifs ? formData.append('pieces_justificatifs', depense.pieces_justificatifs) : '';

            if (depense.id === undefined) {
                baseApi.post("depenses",  formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(
                    (response) => {
                        setShowModal(false);
                    }
                ).catch(
                    (error) => {
                        for (const key in error.response.data.errors) {
                            if (Object.hasOwnProperty.call(error.response.data.errors, key)) {
                                const element = error.response.data.errors[key];
                            }
                        }

                    }
                )
            } else {

                baseApi.post("depenses/" + depense.id, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(
                    (response) => {
                        setShowModal(false);
                    }
                ).catch(
                    (error) => {
                        for (const key in error.response.data.errors) {
                            if (Object.hasOwnProperty.call(error.response.data.errors, key)) {
                                const element = error.response.data.errors[key];
                            }
                        }

                    }
                )
            }
        }
        setValidated(true);
        setLoad(false)
    };


    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <FormGroup >
                        <Form.Label>Libelle</Form.Label>
                        <Form.Control required name='libelle' value={depense.libelle} onChange={(e) => onInputChange(e)} type='text' ></Form.Control>
                    </FormGroup>
                    <FormGroup >
                        <Form.Label>Montant</Form.Label>
                        <Form.Control required name='montant' value={depense.montant} onChange={(e) => onInputChange(e)} type='number' ></Form.Control>
                    </FormGroup>
                    <FormGroup >
                        <Form.Label>Date</Form.Label>
                        <Form.Control required name='date' value={depense.date} onChange={(e) => onInputChange(e)} type='date' ></Form.Control>
                    </FormGroup>

                    <FormGroup >
                        <Form.Label>Piéce justificatif </Form.Label>
                        <Form.Control name='pieces_justificatifs' onChange={(e) => HandleChangeFile(e)} type='file' accept="image/png, image/jpg, image/jpeg" ></Form.Control>
                    </FormGroup>

                </Row>

                <div><Button className='mt-3' type="submit" disabled={load}>
                    {load ? <><Spinner animation="border" size='sm' /><span>Chargement...</span></> : <span className='m-2'>Enregistrer</span>}
                </Button></div>
            </Form>
        </>
    )
}

export default SaveDepenses