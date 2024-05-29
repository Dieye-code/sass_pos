import React, { useEffect, useState } from 'react'
import { baseApi } from '../../services/BaseService';
import DataTable from 'react-data-table-component';
import { Button, Image, Modal } from 'react-bootstrap';
import SaveBien from './SaveBien';
import { Env } from '../../config/Env';
import { Link } from 'react-router-dom';

function Biens() {

  const columns = [
    {
      name: 'Categorie',
      grow: 2,
      cell: row => {
        if (row.photo != null)
          return (<>
            <Image src={Env.API_URL + "/storage/" + row.photo} width={30} height={30} roundedCircle />
            {row.categorie}
          </>)
        else
          return (row.categorie)
      },
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
      grow: 2,
      sortable: true,
    },
    {
      name: 'Localisation',
      selector: row => row.localisation,
      sortable: true,
    },
    {
      name: 'Adresse',
      selector: row => row.adresse,
      grow: 1.5,
      sortable: true,
    },
    {
      name: 'Type',
      selector: row => row.type,
      grow: 2,
      sortable: true,
    },
    {
      name: 'Agent',
      selector: row => row.agent.user.prenom + " " + row.agent.user.nom,
      sortable: true,
    },
    {
      name: 'Edit',
      cell: row => (<>
        <span className='text-primary btn' onClick={() => {
          updateBien(row)
        }}><i className="bi bi-pencil "></i></span>
        <span className='text-danger btn' onClick={() => {
          deleteBien(row)
        }}><i className="bi bi-trash"></i></span>

        <Link to={row.id} className='btn text-primary' ><i className="bi bi-eye-fill"></i></Link>
        
        {/* <span className='text-primary btn' onClick={() => navigate("/biens/"+row.id)} ><i className="bi bi-eye-fill"></i></span> */}
        
        {/* <span className='text-primary btn' onClick={() => {
          viewBien(row)
        }}><i className="bi bi-eye-fill"></i></span> */}
      </>
      )
    },
  ];
  const paginationComponentOptions = {
    rowsPerPageText: 'lignes par page',
    rangeSeparatorText: 'sur',
  };
  const [biens, setBiens] = useState([]);
  const [bien, setBien] = useState({ categorie: '', description: '', localisation: '', type: '', adresse: '', agent_id: '' });
  const [show, setShow] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    baseApi.get('/biens').then(
      (response) => {
        console.log(response.data);
        setBiens(response.data);
      }
    );
  }, [show]);

  const handleClose = () => {
    setShow(false)
    initBien()
  };
  const handleCloseDetail = () => setShowDetail(false);
  const initBien = () => setBien({ categorie: '', description: '', localisation: '', type: '', adresse: '', agent_id: '' });
  const handleShow = () => setShow(true);

  const updateBien = (bien) => {
    setBien({ id: bien.id, categorie: bien.categorie, description: bien.description, localisation: bien.localisation, type: bien.type, adresse: bien.adresse, agent_id: bien.agent_id })
    setShow(true)
  }
  const viewBien = (bien) => {
    setShowDetail(true)
  }

  const deleteBien = (bien) => {
    
		swal({
			title: "Voulez-vous supprimer ce bien?",
			icon: "error",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					baseApi.delete('/biens/' + bien.id).then((response) => {
						console.log(response);
						if (response.status === 200) {
							swal("Le bien a été bien supprimer", {
								icon: "success",
							}).then(() => {

								baseApi.get("biens").then((data) => {
									setBiens(data.data)
								})
							});
						} else {
							swal("Erreur lors de la suppression de l'agent", {
								icon: "error",
							});
						}
					}).catch((error) => {

						swal("Erreur au niveau du serveur", {
							icon: "error",
						});
					})
				}
			});
  }

  return (
    <>
      <Button className='mb-2' variant="primary" onClick={handleShow}>Nouveau Bien</Button>
      <Modal show={show} size='lg' centered
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>Enregistrement d'un bien</Modal.Header>
        <Modal.Body>
          <SaveBien setShowModal={setShow} newBien={bien} />
        </Modal.Body>
      </Modal>
      <Modal show={showDetail} size='lg' centered
        onHide={handleCloseDetail}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>Détail Bien</Modal.Header>
        <Modal.Body>
          {/* <SaveBien setShowModal={setShow} newBien={bien} /> */}
        </Modal.Body>
      </Modal>
      <DataTable
        columns={columns}
        data={biens}
        pagination
        paginationComponentOptions={paginationComponentOptions}
      />
    </>
  )
}

export default Biens