import React, { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component';
import Savefournisseur from './SaveFournisseur';
import { Button, Modal } from 'react-bootstrap';
import { baseApi } from '../../services/BaseService';
import swal from 'sweetalert';

function Fournisseurs() {


	const columns = [
		{
			name: 'nom',
			selector: row => row.nom,
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
			name: 'Edit',
			cell: row => (<>
				<span className='text-primary btn' onClick={() => {
					editFournisseur(row)
				}}><i className="bi bi-pencil m-r-5"></i></span>
				<span className='text-danger btn' onClick={() => {
					deleteFournisseur(row)
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
	const [fournisseurs, setFournisseurs] = useState([]);
	const [fournisseur, setFournisseur] = useState({ nom: "", telephone: "", adresse: "" });
	useEffect(() => {
		baseApi.get("fournisseurs").then((response) => {
			setFournisseurs(response.data);
		})
	}, [show])

	const initfournisseur = () => {
		setFournisseur({nom: "", telephone: "", adresse: "" });
	}

	const editFournisseur = (a) => {
		setFournisseur({ id: a.id, nom: a.nom, telephone: a.telephone, adresse: a.adresse, agent_id: a.agent?.id })
		handleShow()
	}

	const deleteFournisseur = (c) => {
		swal({
			title: "Voulez-vous supprimer ce fournisseur?",
			icon: "error",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					baseApi.delete('/fournisseurs/' + c.id).then((response) => {
						console.log(response);
						if (response.status === 200) {
							swal("Lefournisseur' a été bien supprimer", {
								icon: "success",
							}).then(() => {

								baseApi.get("fournisseurs").then((data) => {
									setFournisseurs(data.data)
									initfournisseur();
								})
							});
						} else {
							swal("Erreur lors de la suppression du fournisseur", {
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
		initfournisseur()
	};
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="primary" onClick={handleShow}>Nouveau fournisseur</Button>
			<Modal show={show} size='lg' centered
				onHide={handleClose}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Fournisseur</Modal.Title>
				</Modal.Header>
				<Modal.Body>

					<Savefournisseur newFournisseur={fournisseur} setShowModal={setShow} />
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
				data={fournisseurs}
				pagination
				paginationComponentOptions={paginationComponentOptions}
			/>
		</>
	)
}

export default Fournisseurs