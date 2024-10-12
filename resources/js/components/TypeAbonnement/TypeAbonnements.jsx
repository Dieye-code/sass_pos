import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { baseApi } from '../../services/BaseService';
import DataTable from 'react-data-table-component';
import { Button, Modal } from 'react-bootstrap';
import SaveTypeAbonnement from './SaveTypeAbonnement';

function TypeAbonnements() {

  const decoded = jwtDecode(localStorage.getItem("token" ?? ""));
  const navigate = useNavigate();

  const columns = [
    {
      name: 'Type',
      selector: row => row.libelle,
      sortable: true,
    },
    {
      name: 'Inscription',
      selector: row => Intl.NumberFormat().format(row.inscription) + " Francs CFA",
      sortable: true,
    },
    {
      name: 'Mensualité',
      selector: row => Intl.NumberFormat().format(row.mensualite) + " Francs CFA",
      sortable: true,
    },
    {
      name: 'Remise annuelle',
      selector: row => row.mois_reduit_anne + " mois",
      sortable: true,
    },
    {
      name: 'Nombre utilisateur',
      selector: row => row.nombre_utilisateur,
      sortable: true,
    },
    {
      name: 'Nombre produits',
      selector: row => row.nombre_produit,
      sortable: true,
    },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: 'lignes par page',
    rangeSeparatorText: 'sur',
  };

  const [show, setShow] = useState(false);
  const [typeAbonnements, setTypeAbonnements] = useState([]);

  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);


  useEffect(() => {
    if (decoded.role != 'super admin')
      return navigate(-1);
    baseApi.get('type-abonnements').then(
      result => {
        setTypeAbonnements(result.data)
      }
    )
  }, [show]);


  return (
    <>
    <Button className='mb-3' variant="primary" onClick={handleShow}>Nouveau Type</Button>
    <Modal show={show} size='lg' centered
      onHide={handleClose}
      backdrop="static"
      keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Type abonnement</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <SaveTypeAbonnement  setShowModal={setShow} />
      </Modal.Body>
    </Modal>
      <DataTable
        noDataComponent="Pas de données trouvées"
        columns={columns}
        data={typeAbonnements}
        pagination
        paginationComponentOptions={paginationComponentOptions}
      />
    </>
  )
}

export default TypeAbonnements