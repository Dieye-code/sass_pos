import React, { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component';
import SaveAgent from './SaveAgent';
import { Button, Modal } from 'react-bootstrap';
import { baseApi } from '../../services/BaseService';
import swal from 'sweetalert';

function Agents() {


	const columns = [
		{
			name: 'Prenom',
			selector: row => row.user.prenom,
			grow: 2,
			sortable: true,
		},
		{
			name: 'Nom',
			selector: row => row.user.nom,
			sortable: true,
		},
		{
			name: 'Téléphone',
			selector: row => row.telephone,
			sortable: true,
		},
		{
			name: 'Adresse',
			selector: row => row.adresse,
			grow: 1.5,
			sortable: true,
		},
		{
			name: 'Email',
			selector: row => row.user.email,
			grow: 2,
			sortable: true,
		},
		{
			name: 'Edit',
			cell: row => (<>
				<span className='text-primary btn' onClick={() => {
					editAgent(row)
				}}><i className="bi bi-pencil m-r-5"></i></span>
				<span className='text-danger btn' onClick={() => {
					deleteAgent(row)
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
	const [agents, setAgents] = useState([]);
	const [agent, setAgent] = useState({ prenom: "", nom: "", telephone: "", adresse: "", email: "", password: "", type: "agent", profil: "agent" });
	useEffect(() => {
		baseApi.get("agents").then((response) => {
			//console.log(response.data.data);
			setAgents(response.data);
		})
	}, [show])

	const initAgent = () => {
		setAgent({ prenom: "", nom: "", telephone: "", adresse: "", email: "", password: "", type: "agent", profil: "agent" });
	}

	const editAgent = (a) => {
		setAgent({ prenom: a.user.prenom, nom: a.user.nom, telephone: a.telephone, adresse: a.adresse, email: a.user.email, type: "agent", profil: "agent", id: a.id, user_id: a.user_id })
		handleShow()
	}

	const deleteAgent = (c) => {
		swal({
			title: "Voulez-vous supprimer cet agent?",
			icon: "error",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					baseApi.delete('/agents/' + c.id).then((response) => {
						console.log(response);
						if (response.status === 200) {
							swal("L'agent' a été bien supprimer", {
								icon: "success",
							}).then(() => {

								baseApi.get("agents").then((data) => {
									setAgents(data.data)
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

	const handleClose = () => {
		setShow(false)
		initAgent()
	};
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="primary" onClick={handleShow}>Nouveau Agent</Button>
			<Modal show={show} size='lg' centered
				onHide={handleClose}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Save Agent</Modal.Title>
				</Modal.Header>
				<Modal.Body>

					<SaveAgent newAgent={agent} setShowModal={setShow} />
				</Modal.Body>
				{/* <Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Annuler
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Enregistrer
					</Button>
				</Modal.Footer> */}
			</Modal>
			<DataTable
				columns={columns}
				data={agents}
				pagination
				paginationComponentOptions={paginationComponentOptions}
			/>
		</>
	)
}

export default Agents