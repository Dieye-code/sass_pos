import React, { useState } from 'react'
import { Button, Col, Form, FormGroup, Row } from 'react-bootstrap'
import { Env } from '../../config/Env';
import { baseApi } from '../../services/BaseService';

const app = import.meta.env.APP_URL

function SaveFournisseur({ setShowModal,
  newFournisseur = { nom: "", telephone: "", adresse: "" }
}) {

  const [fournisseur, setFournisseur] = useState(newFournisseur);
  const [validated, setValidated] = useState(false);

  const onInputChange = (e) => {
    setFournisseur({ ...fournisseur, [e.target.name]: e.target.value })
  }
  const initFournisseur = () => {
    setFournisseur({ nom: "", telephone: "", adresse: "" });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (fournisseur.id === undefined) {
        baseApi.post("fournisseurs", fournisseur).then(
          (response) => {
            console.log(response);
            setShowModal(false);
          }
        ).catch(
          (error) => {
            console.log(error);
            for (const key in error.response.data.errors) {
              if (Object.hasOwnProperty.call(error.response.data.errors, key)) {
                const element = error.response.data.errors[key];
                console.log(element.toString());
              }
            }
            console.log(error.response.data.errors);

          }
        )
      } else {

        baseApi.put("fournisseurs/" + fournisseur.id, fournisseur).then(
          (response) => {
            console.log(response);
            setShowModal(false);
          }
        ).catch(
          (error) => {
            for (const key in error.response.data.errors) {
              if (Object.hasOwnProperty.call(error.response.data.errors, key)) {
                const element = error.response.data.errors[key];
                console.log(element.toString());
              }
            }
            console.log(error.response.data.errors);

          }
        )
      }
    }
    setValidated(true);
  };

  return (

    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>

          <FormGroup as={Col} >
            <Form.Label>Nom</Form.Label>
            <Form.Control required name='nom' value={fournisseur.nom} onChange={(e) => onInputChange(e)} type='text' ></Form.Control>
          </FormGroup>
          <FormGroup as={Col}>
            <Form.Label>Téléphone</Form.Label>
            <Form.Control required name='telephone' value={fournisseur.telephone} onChange={(e) => onInputChange(e)} type='text' ></Form.Control>
          </FormGroup>
          <FormGroup as={Col}>
            <Form.Label>Adresse</Form.Label>
            <Form.Control required name='adresse' value={fournisseur.adresse} onChange={(e) => onInputChange(e)} type='text' ></Form.Control>
          </FormGroup>

        </Row>

        <Button className='mt-3' type="submit">Enregistrer</Button>
      </Form>

    </>
  )
}

export default SaveFournisseur
