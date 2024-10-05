import React, { useEffect, useState } from 'react'
import { baseApi } from '../../services/BaseService';
import { useParams } from 'react-router-dom';
import { Col, Form, FormGroup, Image, Modal, Row, Table } from 'react-bootstrap';
import { Env, formatDate } from '../../config/Env';

function Payer() {

  const [paiement, setPaiement] = useState({ montant: 0, mode_paiement: '2' })
  const [paiements, setPaiements] = useState([]);
  const [total, setTotal] = useState(0);
  const [achat, setAchat] = useState();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
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
  const handleClose1 = () => {
    setShow1(false)
  };
  const handleShow1 = () => setShow1(true);


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
        }
      )
    }
    setValidated(true);
  };

  return (
    <div>

      <Modal show={show1} size='lg' centered
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}>

        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Image src={Env.API_URL + "storage/" + achat?.facture} width={300} />
        </Modal.Body>
      </Modal>

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
              <Form.Check className='text-center' inline name="paiement" value={6} type='radio' id='credit' onChange={(e) => onInputChange(e)}
                label={(<> Virement </>)} />
              <Form.Check className='text-center' inline name="paiement" value={7} type='radio' id='credit' onChange={(e) => onInputChange(e)}
                label={(<> Chéque </>)} />
            </div>

            <div>
              <button className='btn btn-primary'>Enregistrer</button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <div class="row row-cols-1 row-cols-md-2 row-cols-xl-2 row-cols-xxl-3">
        <div class="col">
          <div class="card border shadow-none radius-10">
            <div class="card-body">
              <div class="d-flex align-items-center gap-3">
                <div class="icon-box bg-light-primary border-0">
                  <i class="bi bi-person text-primary"></i>
                </div>
                <div class="info">
                  <h6 class="mb-2">Fournisseur</h6>
                  <p class="mb-1">{achat?.fournisseur?.nom}</p>
                  <p class="mb-1"><i>{achat?.fournisseur?.telephone}</i></p>
                  <p class="mb-1"><i>{achat?.fournisseur?.adresse}</i></p>
                  <p class="mb-1">{formatDate(achat?.date)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div class="card border shadow-none bg-light radius-10">
            <div class="card-body">
              <div class="d-flex align-items-center mb-4">
                <div>
                  <h5 class="mb-0">Etat de l'achat</h5>
                </div>
                <div class="ms-auto">
                  <button type="button" className={achat?.etat == 'en attente' ? 'btn alert-danger radius-30 px-4' : achat?.etat == 'en cours' ? 'btn alert-warning radius-30 px-4' : 'btn alert-success radius-30 px-4'}>{achat?.etat}</button>
                </div>
              </div>
              <div class="d-flex align-items-center mb-3">
                <div>
                  <p class="mb-0">Montant Total</p>
                </div>
                <div class="ms-auto">
                  <h5 class="mb-0">{Intl.NumberFormat().format(achat?.montant_total)} F</h5>
                </div>
              </div>
              <div class="d-flex align-items-center mb-3">
                <div>
                  <p class="mb-0">Montant payé</p>
                </div>
                <div class="ms-auto">
                  <h5 class="mb-0">{Intl.NumberFormat().format(total)} F</h5>
                </div>
              </div>
              {achat?.montant_total > total ? <>
                <div class="d-flex align-items-center mb-3">
                  <div>
                    <p class="mb-0">Montant restant</p>
                  </div>
                  <div class="ms-auto">
                    <h5 class="mb-0 text-danger">{Intl.NumberFormat().format(achat?.montant_total - total)} F</h5>
                  </div>
                </div>
              </> : <></>}

            </div>
          </div>
        </div>
      </div>


      <div class="row">
        <div class="col-12 col-lg-8">
          <div class="card border shadow-none radius-10">
            <div class="card-body">
              <div>
                <h5>Liste des produits vendus</h5>
              </div>
              <div class="table-responsive">
                <table class="table align-middle mb-0">
                  <thead class="table-light">
                    <tr>
                      <th>Produit</th>
                      <th>Prix</th>
                      <th>Quantite</th>
                      <th>Montant</th>
                    </tr>
                  </thead>
                  <tbody>
                    {achat?.produits?.map(element => {
                      return (<tr>
                        <td>{element.libelle}</td>
                        <td>{Intl.NumberFormat().format(element.pivot?.montant_achat) + " Francs CFA"}</td>
                        <td>{element.pivot?.quantite}</td>
                        <td>{Intl.NumberFormat().format(element.pivot?.montant_achat * element.pivot?.quantite) + " Francs"}</td>

                      </tr>);
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="card border shadow-none bg-light radius-10">
            <div class="card-body">
              <div >
                <h5>Paiements</h5>
              </div>
              {
                achat?.montant_total > total ?
                  <><span className="btn btn-primary mb-2" onClick={handleShow}>Payer</span> </> : <></>
              }
              <Table class="table align-middle mb-0" >
                <thead class="table-light">
                  <tr>
                    <th>
                      Montant
                    </th>
                    <th >
                      Date
                    </th>
                    <th >
                      Mode Paiement
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paiements?.map(element => {
                    return (
                      <tr>
                        <td >
                          {Intl.NumberFormat().format(element.montant) + "Francs"}
                        </td>
                        <td >
                          {formatDate(element.date)}
                        </td>
                        <td >
                          {element.mode_paiement}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payer