import React, { useEffect, useState } from 'react'
import { Env } from '../../config/Env';
import { Button, Image, Modal } from 'react-bootstrap';
import SaveProduit from './SaveProduit';
import DataTable from 'react-data-table-component';
import { baseApi } from '../../services/BaseService';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Produits() {


	const decoded = jwtDecode(localStorage.getItem("token" ?? ""));
	const navigate = useNavigate();

	const columns = [
		{
			name: 'Libelle',
			cell: row => row.libelle,
			sortable: true,
		},
		{
			name: 'Prix',
			selector: row => Intl.NumberFormat().format(row.prix) + " Francs CFA",
			sortable: true,
		},
		{
			name: 'Quantite en Stock',
			selector: row => row.quantite,
			sortable: true,
		},
		{
			name: 'Edit',
			cell: row => (<>
				<span className='text-primary btn' onClick={() => {
					editProduit(row)
				}}><i className="bi bi-pencil m-r-5"></i></span>
				<span className='text-danger btn' onClick={() => {
					deleteProduit(row)
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
	const [produits, setProduits] = useState([]);
	const [produit, setProduit] = useState({ libelle: "", prix: 0, quantite: 0 });
	useEffect(() => {
		if (decoded.role != 'admin')
			return navigate(-1);
		baseApi.get("produits").then((response) => {
			setProduits(response.data);
		})
	}, [show])
	const initProduit = () => {
		setProduit({ libelle: "", prix: 0, quantite: 0 });
	}


	const editProduit = (a) => {
		setProduit({ id: a.id, libelle: a.libelle, prix: a.prix, quantite: a.quantite })
		handleShow()
	}

	const deleteProduit = (c) => {
		swal({
			title: "Voulez-vous supprimer ce Produit?",
			icon: "error",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					baseApi.delete('/produits/' + c.id).then((response) => {
						if (response.status === 200) {
							swal("Le produit a été bien supprimer", {
								icon: "success",
							}).then(() => {

								baseApi.get("produits").then((data) => {
									setProduits(data.data)
									initProduit();
								})
							});
						} else {
							swal("Erreur lors de la suppression du produit", {
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
		initProduit()
	};
	const handleShow = () => setShow(true);



	return (
		<>
			<Button className='mb-3' variant="primary" onClick={handleShow}>Nouveau Produit</Button>
			<Modal show={show} size='lg' centered
				onHide={handleClose}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Produit</Modal.Title>
				</Modal.Header>
				<Modal.Body>

					<SaveProduit newProduit={produit} setShowModal={setShow} />
				</Modal.Body>
			</Modal>
			<DataTable
        noDataComponent="Pas de données trouvées"
				columns={columns}
				data={produits}
				pagination
				paginationComponentOptions={paginationComponentOptions}
			/>
		</>
	)
}

export default Produits