import React, { useState } from 'react'
import { baseApi } from '../../services/BaseService';
import { Button, Col, Form, FormGroup, Row } from 'react-bootstrap';

function SaveDepenses({ setShowModal,
    newDepense = { libelle: "", montant: 0, date: "" }
}) {



    const [depense, setDepense] = useState(newDepense);
    const [validated, setValidated] = useState(false);
    const [load, setLoad] = useState(false);

    const onInputChange = (e) => {
        setDepense({ ...depense, [e.target.name]: e.target.value })
    }
    const initDepense = () => {
        setDepense({ libelle: "", montant: 0, date: "" });
    }

    const handleSubmit = (event) => {
        setLoad(true)
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            if (depense.id === undefined) {
                baseApi.post("depenses", depense).then(
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

                baseApi.put("depenses/" + depense.id, depense).then(
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
                    <FormGroup as={Col} >
                        <Form.Label>Libelle</Form.Label>
                        <Form.Control required name='libelle' value={depense.libelle} onChange={(e) => onInputChange(e)} type='text' ></Form.Control>
                    </FormGroup>
                    <FormGroup as={Col}>
                        <Form.Label>Montant</Form.Label>
                        <Form.Control required name='montant' value={depense.montant} onChange={(e) => onInputChange(e)} type='number' ></Form.Control>
                    </FormGroup>
                    <FormGroup as={Col}>
                        <Form.Label>Date</Form.Label>
                        <Form.Control required name='date' value={depense.date} onChange={(e) => onInputChange(e)} type='date' ></Form.Control>
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