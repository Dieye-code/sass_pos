import React, { useState } from 'react'
import { useAuth } from './AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Form, FormGroup, Row } from 'react-bootstrap';
import { Env } from '../../config/Env';
import { baseApi } from '../../services/BaseService';

function Register() {

    const { setToken } = useAuth();
    const navigate = useNavigate();

    const [validated, setValidated] = useState()
    const [infos, setInfos] = useState({ nom: '', adresse: '', telephone: '', nomUser: '', telephoneUser: '', password: '' })
    const [errors, setErrors] = useState([]);
    const [image, setImage] = useState()

    const eventChange = (e) => setInfos({ ...infos, [e.target.name]: e.target.value })
    const HandleChangeFile = (e) => {

        const imageFile = e.target.files[0];
        if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
            swal({
                text: "Le logo doit etre une image!",
                icon: "info",
                buttons: true,
                showCancelButton: false,
            });
            e.value = '';
            e.target.value = '';
            e.preventDefault();
            return;
        }
        imageFile ? setImage(imageFile) : '';
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        var formData = new FormData();
        formData.append('nom', infos.nom);
        formData.append('adresse', infos.adresse);
        formData.append('telephoneAbonnement', infos.telephone);
        formData.append('nomUser', infos.nomUser);
        formData.append('telephone', infos.telephoneUser);
        formData.append('password', infos.password);
        image ? formData.append('logo', image) : '';
        setErrors([]);
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            baseApi.post('register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((result) => {
                    navigate('/login', { replace: true });
                })
                .catch((error) => {
                    if (error.response.status == 400) {
                        if (Array.isArray(error.response.data)) {
                            console.log(error.response.data);
                            setErrors(error.response.data);
                        }
                        else {
                            // setErrors(error.response.data);
                        }
                    }
                })
        }

        setValidated(true);
    }

    return (
        <>

            <div class="row row-cols-1 row-cols-lg-4 gx-0">
                <div class="col">
                    <div class="card rounded-0">
                        <div class="card-body">
                            <div class="text-center">
                                <h5 class="mb-4">Basic</h5>
                                <h1 class="card-price"><span class="fs-6 text-secondary">$</span>49<span class="fs-6 text-secondary">/mo</span></h1>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><i class="bi bi-check-circle me-2"></i>3 Months Support</li>
                                <li class="list-group-item"><i class="bi bi-check-circle me-2"></i>Demo Instalation</li>
                                <li class="list-group-item"><i class="bi bi-check-circle me-2"></i>Automatic Updates</li>
                                <li class="list-group-item"><i class="bi bi-check-circle me-2"></i>Theme Documentation</li>
                                <li class="list-group-item"><i class="bi bi-check-circle me-2"></i>Free Subdomain</li>
                                <li class="list-group-item"><i class="bi bi-check-circle me-2"></i>Community Access</li>
                                <li class="list-group-item"><i class="bi bi-check-circle me-2"></i>Dedicated Phone Support</li>
                            </ul>
                            <div class="text-center mt-3 d-grid d-lg-block">
                                <a href="javascript:;" class="btn btn-outline-primary rounded-0 px-4 shadow">BUY NOW</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card rounded-0">
                        <div class="card-body">
                            <div class="text-center">
                                <h5 class="mb-4">Small Business</h5>
                                <h1 class="card-price"><span class="fs-6 text-secondary">$</span>299<span class="fs-6 text-secondary">/mo</span></h1>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><i class="bi bi-check-circle me-2"></i>3 Months Support</li>
                                <li class="list-group-item"><i class="bi bi-check-circle me-2"></i>Demo Instalation</li>
                                <li class="list-group-item"><i class="bi bi-check-circle me-2"></i>Automatic Updates</li>
                                <li class="list-group-item"><i class="bi bi-check-circle me-2"></i>Theme Documentation</li>
                                <li class="list-group-item"><i class="bi bi-check-circle me-2"></i>Free Subdomain</li>
                                <li class="list-group-item"><i class="bi bi-check-circle me-2"></i>Community Access</li>
                                <li class="list-group-item"><i class="bi bi-check-circle me-2"></i>Dedicated Phone Support</li>
                            </ul>
                            <div class="text-center mt-3 d-grid d-lg-block">
                                <a href="javascript:;" class="btn btn-outline-primary rounded-0 px-4 shadow">BUY NOW</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card rounded-0 border border-3 border-primary">
                        <div class="card-body">
                            <div class="text-center">
                                <h5 class="mb-4">Professional</h5>
                                <h1 class="card-price"><span class="fs-6 text-secondary">$</span>399<span class="fs-6 text-secondary">/mo</span></h1>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><i class="bi bi-check-circle me-2"></i>3 Months Support</li>
                                <li class="list-group-item"><i class="bi bi-check-circle me-2"></i>Demo Instalation</li>
                                <li class="list-group-item"><i class="bi bi-check-circle me-2"></i>Automatic Updates</li>
                                <li class="list-group-item"><i class="bi bi-check-circle me-2"></i>Theme Documentation</li>
                                <li class="list-group-item"><i class="bi bi-check-circle me-2"></i>Free Subdomain</li>
                                <li class="list-group-item"><i class="bi bi-check-circle me-2"></i>Community Access</li>
                                <li class="list-group-item"><i class="bi bi-check-circle me-2"></i>Dedicated Phone Support</li>
                            </ul>
                            <div class="text-center mt-3 d-grid d-lg-block">
                                <a href="javascript:;" class="btn btn-primary rounded-0 px-4 shadow">BUY NOW</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Card style={{ width: '18rem' }} className='w-75 position-absolute top-50 start-50 d-flex aligns-items-center  card translate-middle'>

                <Card.Img variant="top" src={'/images/logo.jpg'} style={{ width: 200, marginLeft: 'auto', marginRight: 'auto' }} />
                <Card.Body>
                    <Card.Title>Inscrire sur sama caisse</Card.Title>
                    <Form validated={validated} onSubmit={handleSubmit} noValidate>
                        {errors.map((e) => {
                            return <><span className='text-danger'>{e}</span><br /></>
                        })}
                        <Row>
                            <FormGroup as={Col} md="6">
                                <Form.Label>Nom de la boutique</Form.Label>
                                <Form.Control type='text' required name='nom' value={infos.nom} onChange={eventChange} />
                            </FormGroup>
                            <FormGroup as={Col} md="6">
                                <Form.Label>Adresse de la boutique</Form.Label>
                                <Form.Control type='text' required name='adresse' value={infos.adresse} onChange={eventChange} />
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup as={Col} md="6">
                                <Form.Label>Numéro de téléphone de la boutique</Form.Label>
                                <Form.Control type='text' required name='telephone' value={infos.telephone} onChange={eventChange} />
                            </FormGroup>
                            <FormGroup as={Col} md="6">
                                <Form.Label>Logo de la boutique</Form.Label>
                                <Form.Control type='file' accept="image/png, image/jpg, image/jpeg" name='logo' onChange={e => HandleChangeFile(e)} />
                            </FormGroup>
                        </Row>
                        <Row className='mt-3'>
                            <FormGroup as={Col} md="4">
                                <Form.Label>Nom de l'utilisateur</Form.Label>
                                <Form.Control type='text' required name='nomUser' value={infos.nomUser} onChange={eventChange} />
                            </FormGroup>
                            <FormGroup as={Col} md="4">
                                <Form.Label>Téléphone de l'utilisateur</Form.Label>
                                <Form.Control type='text' required name='telephoneUser' value={infos.telephoneUser} onChange={eventChange} />
                            </FormGroup>
                            <FormGroup as={Col} md="4">
                                <Form.Label>Code</Form.Label>
                                <Form.Control type='password' required name='password' value={infos.password} onChange={eventChange} />
                            </FormGroup>
                        </Row>
                        <Button variant='primary' className='mt-3' type='submit'>S'inscrire</Button><br />
                        <span style={{ fontSize: 16, marginTop: 15 }}>connectez-vous <Link to={'/login'} style={{ fontWeight: 'bold' }}>ici</Link>  et commencez maintenant !</span>
                    </Form>
                </Card.Body>
            </Card> */}
        </>
    )
}

export default Register