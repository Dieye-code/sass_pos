import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { baseApi } from '../../services/BaseService'

function SaveBien({ setShowModal, newBien = { categorie: '', description: '', localisation: '', type: '', adresse: '', agent_id: '' } }) {

    const [bien, setBien] = useState(newBien)
    const [image, setImage] = useState()
    const [agents, setAgents] = useState([])
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        console.log(newBien);
        console.log(bien);
        baseApi.get('agents').then(
            (result) => setAgents(result.data)
        )
    }, [])


    const handleChange = (e) => {
        setBien({ ...bien, [e.target.name]: e.target.value })
    }

    const HandleChangeFile = (e) => {
        setImage(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            var formData = new FormData();
            formData.append('categorie', bien.categorie);
            formData.append('description', bien.description);
            formData.append('localisation', bien.localisation);
            formData.append('type', bien.type);
            formData.append('adresse', bien.adresse);
            formData.append('agent_id', bien.agent_id);
            formData.append('photo', image);
            console.log(formData);
            if(bien.id == undefined){
                baseApi.post('biens', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((result) => {
                    setShowModal(false)
                });
            } else {
                console.log(bien);
                baseApi.put('biens/'+bien.id, bien).then((result) => {
                    setShowModal(false)
                });
            }
        }

        setValidated(true);
    }
    return (
        <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
            <Row>
                <Form.Group as={Col} md='6' >
                    <Form.Label>Categorie</Form.Label>
                    <Form.Select name='categorie' required value={bien.categorie} onChange={(e) => handleChange(e)} >
                        <option value="">...........</option>
                        <option value={'maison'}>Maison</option>
                        <option value={'appartement'}>Appartement</option>
                        <option value={'chambre_sdb'}>Chambre salle de bain</option>
                        <option value={'chambre'}>Chambre simple</option>
                        <option value={'salon'}>Salon</option>
                        <option value={'magasin'}>Magasin</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <Form.Label>Localisation</Form.Label>
                    <Form.Control type="text" name='localisation' required value={bien.localisation} onChange={(e) => handleChange(e)} />
                </Form.Group>
                <Form.Group as={Col} md="12">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} required name='description' value={bien.description} onChange={(e) => handleChange(e)} />
                </Form.Group>

                <Form.Group as={Col} md='6' >
                    <Form.Label>Type</Form.Label>
                    <Form.Select name='type' onChange={(e) => handleChange(e)} value={bien.type} required>
                        <option value="">...........</option>
                        <option value={'vente'}>Vente</option>
                        <option value={'locatif'}>Locatif</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control type="text" name='adresse' required value={bien.adresse} onChange={(e) => handleChange(e)} />
                </Form.Group>
                {bien.id === undefined ? (<Form.Group as={Col} md="6">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control type='file' name='photo' required onChange={(e) => HandleChangeFile(e)} />
                </Form.Group>) : ''
                }
                <Form.Group as={Col} md='6' >
                    <Form.Label>Agent</Form.Label>
                    <Form.Select required name='agent_id' onChange={(e) => handleChange(e)} value={bien.agent_id}>

                        <option value="">...........</option>
                        {agents.map((element) => {
                            return <option value={element.id}>{element.user.prenom + " " + element.user.nom}</option>;
                        })}
                    </Form.Select>
                </Form.Group>
            </Row>
            <Button className='mt-2' variant="primary" type="submit">Enregistrer</Button>
        </Form>
    )
}

export default SaveBien