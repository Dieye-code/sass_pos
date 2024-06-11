import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseApi } from '../../services/BaseService';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { Env } from '../../config/Env';

function ViewBien() {

    const { id } = useParams();

    const [bien, setBien] = useState(null);

    useEffect(() => {
        baseApi.get('biens/' + id)
            .then((result) => {
                setBien(result.data);
            })
    }, [])

    return (
        <>
            <div className="row">
                <Col style={{ width: '80%', margin: '0 auto' }} xs="6">
                    <Card >
                        <Card.Body>
                            <div className='d-flex justify-content-center mb-5'>
                                <Image src={bien?.photo ? Env.API_URL + "storage/" + bien?.photo : Env.API_URL + "/home.png"} width={200} rounded ></Image>
                                <div className="btn text-primary " style={{position: 'absolute', top: '150px', marginLeft: '175px'}} ><i className='bi bi-camera fs-5'></i></div>
                            </div>
                            <p>Propriétaire: <b>{bien?.agent?.user?.prenom} {bien?.agent?.user?.nom}</b></p>
                            <p>Catégorie: <b>{bien?.categorie}</b></p>
                            <p>Description: <b>{bien?.description}</b></p>
                            <p>Adresse: <b>{bien?.adresse}</b></p>
                            <p>Type: <b>{bien?.type}</b></p>

                            <h5 className='text-decoration-underline'>Liste des biens</h5>

                        </Card.Body>
                    </Card>
                </Col>
            </div>

        </>
    )
}

export default ViewBien