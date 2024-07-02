import React, { useEffect, useState } from 'react'
import SaveClient from './SaveClient';
import { Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { baseApi } from '../../services/BaseService';

function Clients() {

	const columns = [
		{
			name: 'Nom Complet',
			selector: row => row.nom,
			sortable: true,
		},
		{
			name: 'Téléphone',
			selector: row => row.telephone,
			sortable: true,
		},
		{
			name: 'Edit',
			cell: row => (<>
				<span className='text-primary btn' onClick={() => {
					editClient(row)
				}}><i className="bi bi-pencil m-r-5"></i></span>
				<span className='text-danger btn' onClick={() => {
					deleteClient(row)
				}}><i className="bi bi-trash m-r-5"></i></span>
			</>
			)
		},
	];
	const paginationComponentOptions = {
		rowsPerPageText: 'lignes par page',
		rangeSeparatorText: 'sur',
	};
	const [show, setShow] = useState(false);
	const [clients, setClients] = useState([]);
	const [client, setClient] = useState({ nom: "", telephone: ""});
	useEffect(() => {
		baseApi.get("clients").then((response) => {
			setClients(response.data);
		})
	}, [show])

	const initClient = () => {
		setClient({nom: "", telephone: ""});
	}

	const editClient = (a) => {
		setClient({ id: a.id, nom: a.nom, telephone: a.telephone })
		handleShow()
	}

	const deleteClient = (c) => {
		swal({
			title: "Voulez-vous supprimer ce client?",
			icon: "error",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					baseApi.delete('/clients/' + c.id).then((response) => {
						console.log(response);
						if (response.status === 200) {
							swal("Le client a été bien supprimer", {
								icon: "success",
							}).then(() => {

								baseApi.get("clients").then((data) => {
									setClients(data.data)
									initClient();
								})
							});
						} else {
							swal("Erreur lors de la suppression du client", {
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

	const handleClose = () => {
		setShow(false)
		initClient()
	};
	const handleShow = () => setShow(true);


  return (
		<>
			<Button className='mb-3' variant="primary" onClick={handleShow}>Nouveau client</Button>
			<Modal show={show} size='lg' centered
				onHide={handleClose}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Client</Modal.Title>
				</Modal.Header>
				<Modal.Body>

					<SaveClient newClient={client} setShowModal={setShow} />
				</Modal.Body>
			</Modal>
			<DataTable
				columns={columns}
				data={clients}
				pagination
				paginationComponentOptions={paginationComponentOptions}
			/>
		</>
  )
}

export default Clients