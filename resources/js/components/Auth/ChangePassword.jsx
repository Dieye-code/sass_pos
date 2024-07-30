import React, { useState } from 'react'
import { Button, Card, Form, FormGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Env } from '../../config/Env';

function ChangePassword() {

    const navigate = useNavigate();

    const [validated, setValidated] = useState()
    const [infos, setInfos] = useState({ oldPassword: '', password: '' })
    const [error, setError] = useState('');

    const eventChange = (e) => setInfos({ ...infos, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        setError("");
        e.preventDefault();
        return true;
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            baseApi.post('user/change-password', infos).then((result) => {

            }).catch(e => {
                setError(e.response?.data?.error);
            })
        }

        setValidated(true);
    }
    return (
        <>
            <Card style={{ width: '18rem' }} className='w-75 position-absolute top-50 start-50 d-flex aligns-items-center  card translate-middle'>

                <Card.Img variant="top" src={Env.API_URL + 'images/logo.jpg'} style={{ width: 200, marginLeft: 'auto', marginRight: 'auto' }} />
                <Card.Body>
                    <Card.Title>Changer le code</Card.Title>
                    <Form validated={validated} onSubmit={handleSubmit} noValidate>
                        <span className='text-danger'>{error}</span>
                        <FormGroup>
                            <Form.Label>Ancien Code</Form.Label>
                            <Form.Control type='text' required name='oldPassword' value={infos.oldPassword} onChange={eventChange} />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Code</Form.Label>
                            <Form.Control type='text' required name='password' value={infos.password} onChange={eventChange} />
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