import React, { useState } from 'react'
import { Button, Col, Form, FormGroup, Row } from 'react-bootstrap'
import { Env } from '../../config/Env';
import { baseApi } from '../../services/BaseService';

const app = import.meta.env.APP_URL

function SaveAgent({ setShowModal,
  newAgent = { prenom: "", nom: "", telephone: "", adresse: "", email: "", password: "", type: "agent", profil: "agent" }
}) {

  const [agent, setAgent] = useState(newAgent);
  const [validated, setValidated] = useState(false);

  const onInputChange = (e) => {
    setAgent({ ...agent, [e.target.name]: e.target.value })
  }
  const initAgent = () => {
    setAgent({ prenom: "", nom: "", telephone: "", adresse: "", email: "", password: "", type: "agent", profil: "agent" });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (agent.id === undefined) {
        baseApi.post("agents", agent).then(
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
        
      baseApi.put("agents/"+agent.id, agent).then(
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
          <FormGroup as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Prenom</Form.Label>
            <Form.Control required name='prenom' value={agent.prenom} onChange={(e) => onInputChange(e)} type='text' />
            <Form.Control.Feedback type="invalid">Le prénom du client est obligatoire</Form.Control.Feedback>
          </FormGroup>


          <FormGroup as={Col} md="6">
            <Form.Label>Nom</Form.Label>
            <Form.Control required name='nom' value={agent.nom} onChange={(e) => onInputChange(e)} type='text' ></Form.Control>
          </FormGroup>
          <FormGroup as={Col} md="6">
            <Form.Label>Téléphone</Form.Label>
            <Form.Control required name='telephone' value={agent.telephone} onChange={(e) => onInputChange(e)} type='text' ></Form.Control>
          </FormGroup>
          <FormGroup as={Col} md="6">
            <Form.Label>Adresse</Form.Label>
            <Form.Control required name='adresse' value={agent.adresse} onChange={(e) => onInputChange(e)} type='text' ></Form.Control>
          </FormGroup>
          <FormGroup as={Col} md="6">
            <Form.Label>Email</Form.Label>
            <Form.Control required name='email' value={agent.email} onChange={(e) => onInputChange(e)} type='email' ></Form.Control>
          </FormGroup>
          {agent.password !== undefined ? (
            <FormGroup as={Col} md="6">
              <Form.Label>Password</Form.Label>
              <Form.Control required name='password' value={agent.password} onChange={(e) => onInputChange(e)} type='password' ></Form.Control>
            </FormGroup>
          ) : <></>}


        </Row>

        <Button className='mt-3' type="submit">Enregistrer</Button>
      </Form>

    </>
  )
}

export default SaveAgent
