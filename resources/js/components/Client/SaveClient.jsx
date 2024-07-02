import React, { useState } from 'react'
import { Button, Col, Form, FormGroup, Row, Spinner } from 'react-bootstrap'
import { baseApi } from '../../services/BaseService';

function SaveClient({ setShowModal, newClient = { nom: "", telephone: '' } }) {



  const [client, setClient] = useState(newClient);
  const [validated, setValidated] = useState(false);
  const [load, setLoad] = useState(false)

  const onInputChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value })
  }
  const initClient = () => {
    setClient({ nom: "", telephone: "", });
  }

  const handleSubmit = (event) => {
    setLoad(true)
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (client.id === undefined) {
        baseApi.post("clients", client).then(
          (response) => {
            console.log(response);
            setShowModal(false);
            initClient();
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

        baseApi.put("clients/" + client.id, client).then(
          (response) => {
            console.log(response);
            setShowModal(false);
            initClient();
          }
        ).catch(
          (error) => {
            // for (const key in error.response.data.errors) {
            //   if (Object.hasOwnProperty.call(error.response.data.errors, key)) {
            //     const element = error.response.data.errors[key];
            //     console.log(element.toString());
            //   }
            // }
            // console.log(error.response.data.errors);

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
            <Form.Label>Nom</Form.Label>
            <Form.Control required name='nom' value={client.nom} onChange={(e) => onInputChange(e)} type='text' ></Form.Control>
          </FormGroup>
          <FormGroup as={Col}>
            <Form.Label>Téléphone</Form.Label>
            <Form.Control required name='telephone' value={client.telephone} onChange={(e) => onInputChange(e)} type='text' ></Form.Control>
          </FormGroup>

        </Row>
        <div><Button className='mt-3' type="submit" disabled={load}>
          {load ? <><Spinner animation="border" size='sm' /><span>Chargement...</span></> : <span className='m-2'>Enregistrer</span>}
        </Button></div>
      </Form>
    </>
  )
}

export default SaveClient