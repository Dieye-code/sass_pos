import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';
import { baseApi } from '../../services/BaseService';
import { Env } from '../../config/Env';
import { Button, Card, Form, FormGroup } from 'react-bootstrap';

function ChangePassword() {

    const { id } = useParams();

    const [password, setPassword] = useState('');
    const [abonnement, setAbonnement] = useState();
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    useEffect(() => {
        baseApi.get("abonnements/" + id).then((result) => {
            setAbonnement(result.data);
            
        })
    }, [])

    const onInputChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
      } else {
  
        let tab = {
          password: password
        }
          
        baseApi.post("abonnements/"+abonnement.id+"/change-password", tab).then(
          (response) => {
            setPassword("");
            
            swal({
              text: "Code de sécurité cahngé avec succés",
              icon: "success",
              buttons: true,
              showCancelButton: false,
            });
          }
        ).catch(
          (error) => {
            swal({
              text: error.response?.data,
              icon: "info",
              buttons: true,
              showCancelButton: false,
            });
          }
        )
      }
      setValidated(true);
    };


    return (
        
        <>
            <Card style={{width: '50%'}} className='m-auto'>

                <Card.Img variant="top" src={Env.API_URL + 'images/logo.jpg'} style={{ width: 200, marginLeft: 'auto', marginRight: 'auto' }} />
                <Card.Body>
                    <Card.Title>Changer le code d'accès de  {abonnement?.nom}</Card.Title>
                    <Form  noValidate validated={validated} onSubmit={handleSubmit}>
                        {error != '' ? <><span className='text-danger'>{error}</span></> : <></> }
                        
                        <FormGroup>
                            <Form.Label>Code</Form.Label>
                            <Form.Control type='text' required name='password' value={password} onChange={onInputChange} />
                        </FormGroup>
                        <Button variant='primary' className='mt-3' type='submit'>Changer</Button>
                        <br />

                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default ChangePassword