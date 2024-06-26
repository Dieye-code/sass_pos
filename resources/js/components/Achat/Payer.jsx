import React, { useEffect, useState } from 'react'
import { baseApi } from '../../services/BaseService';
import { useParams } from 'react-router-dom';
import { Col, Form, FormGroup, Image, Modal, Row, Table } from 'react-bootstrap';
import { Env } from '../../config/Env';

function Payer() {

  const [paiement, setPaiement] = useState({ montant: 0, mode_paiement: '2' })
  const [paiements, setPaiements] = useState([]);
  const [total, setTotal] = useState(0);
  const [achat, setAchat] = useState();
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    baseApi.get("achats/" + id).then((result) => {
      setAchat(result.data);
    })
    baseApi.get("achats/paiements/" + id).then((result) => {
      setPaiements(result.data);
      let t = 0;
      result.data.map(element => t += element.montant);
      setTotal(t);
    })
  }, [show, id])


  const onInputChange = (e) => {
    setPaiement({ ...paiement, [e.target.name]: e.target.value })
  }
  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);


  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {

      let tab = {
        montant: paiement.montant,
        mode_paiement: paiement.mode_paiement,
        achat_id: achat?.id
      }
      baseApi.post("achats/paiement", tab).then(
        (response) => {
          handleClose();
        }
      ).catch(
        (error) => {
          swal({
            text: error.response?.data[0],
            icon: "info",
            buttons: true,
            showCancelButton: false,
        });
          console.log(error.response.data);
        }
      )
    }
    setValidated(true);
  };

  return (
    <div>

      <Modal show={show} size='lg' centered
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Paiement d'un achat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <FormGroup>
              <Form.Label>Montant</Form.Label>
              <Form.Control type='number' name='montant' value={paiement.montant} required onChange={(e) => onInputChange(e)} />
            </FormGroup>
            <div>
              <Form.Check inline name="mode_paiement" value="2" checked type='radio' id='cash' onChange={(e) => onInputChange(e)}
                label={(<Image src={Env.API_URL + "images/cash.jpg"} width={40} height={40} roundedCircle className='mr-2' />)} />
              <Form.Check inline name="mode_paiement" value="3" type='radio' id='om' onChange={(e) => onInputChange(e)}
                label={(<Image src={Env.API_URL + "images/om.png"} width={40} height={40} roundedCircle className='mr-2' />)} />
              <Form.Check inline name="mode_paiement" value="4" type='radio' id='wave' onChange={(e) => onInputChange(e)}
                label={(<Image src={Env.API_URL + "images/wave.jpg"} width={40} height={40} roundedCircle className='mr-2' />)} />
              <Form.Check inline name="mode_paiement" value="5" type='radio' id='free' onChange={(e) => onInputChange(e)}
                label={(<Image src={Env.API_URL + "images/free-money.png"} width={40} height={40} roundedCircle className='mr-2' />)} />
            </div>

            <div>
              <button className='btn btn-primary'>Enregistrer</button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Row>
        <Col md='6'>
          <h5>Liste des produits achetés</h5>
          <Table striped bordered  >
            <thead>
              <tr>
                <th>Produit</th>
                <th>Montant</th>
                <th>Quantité</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>

              {achat?.produits?.map(element => {
                return (<tr>
                  <td>{element.libelle}</td>
                  <td>{element.pivot?.montant_achat + " Francs CFA"}</td>
                  <td>{element.pivot?.quantite}</td>
                  <td>{element.pivot?.montant_achat * element.pivot?.quantite + " Francs CFA"}</td>

                </tr>);
              })}
            </tbody>
          </Table>
          <b>Total: </b> {achat?.montant_total} Francs CFA
        </Col>
        <Col md='6'>
          <h5>Paiements</h5>
          {
            achat?.montant_total > total ?
              <><span className="btn btn-primary mb-2" onClick={handleShow}>Payer</span> </> :
              <></>
          }
          <Table striped bordered >
            <thead>
              <tr>
                <th>Montant</th>
                <th>Date</th>
                <th>Mode de Paiement</th>
              </tr>
            </thead>
            <tbody>

              {paiements.map(element => {
                return (<tr>
                  <td>{element.montant + " Francs CFA"}</td>
                  <td>{element.date}</td>
                  <td>{element.mode_paiement}</td>
                </tr>);
              })}
            </tbody>
          </Table>
          <b>Total paiement: </b> {total} Francs CFA
        </Col>
      </Row>
    </div>
  )
}

export default Payer