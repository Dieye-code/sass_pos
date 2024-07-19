import React, { useState } from 'react'
import { useAuth } from './AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Form, FormGroup } from 'react-bootstrap';
import { Env } from '../../config/Env';
import { baseApi } from '../../services/BaseService';
import { jwtDecode } from 'jwt-decode';

function Login() {

    // const { setToken }  = useAuth();
    const user = useAuth();
    const navigate = useNavigate();

    const [validated, setValidated] = useState()
    const [infos, setInfos] = useState({ telephone: '', password: '' })
    const [error, setError] = useState('');

    const eventChange = (e) => setInfos({ ...infos, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        setError("");
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            baseApi.post('login', infos).then((result) => {
                if (result.data.abonnement != undefined) {
                    localStorage.setItem('abonnement_nom', result.data.abonnement.nom);
                    localStorage.setItem('abonnement_adresse', result.data.abonnement.adresse);
                    localStorage.setItem('abonnement_logo', result.data.abonnement.logo);
                    localStorage.setItem('abonnement_telephone', result.data.abonnement.telephone);
                } else {
                    localStorage.clear();
                }
                localStorage.setItem('token', result.data.access_token);
                const token = jwtDecode(result.data.access_token)
                localStorage.setItem('nom', token.nom);
                user.setNewToken(result.data.access_token);
                user.setNewRole(token.role);
                if (token.role == "admin")
                    navigate('/dashboard');
                navigate('/', { replace: true });
            }).catch(e => {
                setError(e.response?.data?.error);
            })
        }

        setValidated(true);
    }

    return (
        <>
            <Card style={{ width: '18rem' }} className='w-75 position-absolute top-50 start-50 d-flex aligns-items-center  card translate-middle'>

                <Card.Img variant="top" src={'/images/logo.jpg'} style={{ width: 200, marginLeft: 'auto', marginRight: 'auto' }} />
                <Card.Body>
                    <Card.Title>Authentification</Card.Title>
                    <Form validated={validated} onSubmit={handleSubmit} noValidate>
                        <span className='text-danger'>{error}</span>
                        <FormGroup>
                            <Form.Label>Téléphone</Form.Label>
                            <Form.Control type='text' required name='telephone' value={infos.telephone} onChange={eventChange} />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Code</Form.Label>
                            <Form.Control type='password' required name='password' value={infos.password} onChange={eventChange} />
                        </FormGroup>
                        <Button variant='primary' className='mt-3' type='submit'>Login</Button>
                        <br />

                        <span style={{ fontSize: 16 }}>Pas encore de compte? S'inscrire <Link to={'/register'} style={{ fontWeight: 'bold' }}>ici</Link>  et commencez maintenant !</span>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default Login