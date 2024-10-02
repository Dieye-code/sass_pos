import React, { useState } from 'react'
import { Button, Form, FormGroup, Row, Spinner } from 'react-bootstrap';
import { baseApi } from '../../services/BaseService';

function SaveUser({ setShowModal, newUser = { nom: "", telephone: "", password: '', role: "user" } }) {



    const [user, setUser] = useState(newUser);
    const [validated, setValidated] = useState(false);
    const [load, setLoad] = useState(false);

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const initUser = () => {
        setUser({ nom: "", telephone: "", role: "user" });
    }

    const handleSubmit = async (e) => {
        setLoad(true);
        e.preventDefault();
        console.log(user);

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            try {
                if (user.id == undefined) {
                    baseApi.post('users', user).then((result) => {
                        setShowModal(false)
                        initUser();
                    });
                } else {
                    baseApi.put('users/' + user.id, user).then((result) => {
                        setShowModal(false)
                        initUser();
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }

        setValidated(true);
        setLoad(false);
    }
    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <FormGroup >
                        <Form.Label>Nom</Form.Label>
                        <Form.Control required name='nom' value={user.nom} onChange={(e) => onInputChange(e)} type='text' ></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Téléphone</Form.Label>
                        <Form.Control required name='telephone' value={user.telephone} onChange={(e) => onInputChange(e)} type='text' ></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Role</Form.Label>
                        <Form.Select size="sm" name='role' value={user.role} onChange={(e) => onInputChange(e)}>
                            <option value={'user'}>user</option>
                            <option value={'admin'}>admin</option>
                        </Form.Select>
                    </FormGroup>
                    {user.id == undefined || user.id == null ? <>
                        <FormGroup>
                            <Form.Label>Password</Form.Label>
                            <Form.Control required name='password' value={user.password} onChange={(e) => onInputChange(e)} type='password' ></Form.Control>
                        </FormGroup>
                    </> : <></>}

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

export default SaveUser