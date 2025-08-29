import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, Row, Spinner } from 'react-bootstrap';
import { baseApi } from '../../services/BaseService';

export default function ChangeAbonnement({ setShowModal, newAbonnement }) {



    var date = new Date(newAbonnement.dateLimit);
    date.setMonth(date.getMonth() + 2);

    const [abonnement, setAbonnement] = useState(newAbonnement);
    const [validated, setValidated] = useState(false);
    const [debut, setDebut] = useState(newAbonnement.dateLimit);
    const [fin, setFin] =useState(newAbonnement.dateLimit);
    const [load, setLoad] = useState(false);

    const changeDebut = (e) => {
        setDebut(e.target.value)
    }
    const changeFin = (e) => {
        setFin(e.target.value)
    }



    const handleSubmit = (event) => {

        setLoad(true)
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {

            var d = new Date(debut);
            var d1 = new Date(fin);
            
            if(d1.getTime() <= d.getTime()){
                
                swal("La date de fin de l'abonnement doit etre supérieur à la date de début", {
                    icon: "error",
                });
                setLoad(false)
                return
            }
            baseApi.post("abonnements/" + abonnement?.id + "/change", { debut: debut, fin: fin }).
                then((response) => {
                    setShowModal(false);
                }
                ).catch((error) => {
                    swal("Erreur", {
                        icon: "error",
                    });
                });
        }
        setValidated(true);
        setLoad(false)
    };


    return (
        <>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>


                    <FormGroup>
                        <Form.Label>Début</Form.Label>
                        <Form.Control type='date' required name='debut' value={debut} onChange={changeDebut} />
                    </FormGroup>

                    <FormGroup>
                        <Form.Label>Fin</Form.Label>
                        <Form.Control type='date' required name='fin' value={fin} onChange={changeFin} />
                    </FormGroup>

                </Row>

                <div>
                    <Button className='mt-3' type="submit" disabled={load}>
                        {load ? <><Spinner animation="border" size='sm' /><span>Chargement...</span></> : <span className='m-2'>Enregistrer</span>}
                    </Button>
                </div>
            </Form>
        </>
    )
}
