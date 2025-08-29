import React, { useEffect, useMemo, useState } from 'react'
import { Env } from '../../config/Env';
import { Button, Form, Image, Modal } from 'react-bootstrap';
import SaveProduit from './SaveProduit';
import DataTable from 'react-data-table-component';
import { baseApi } from '../../services/BaseService';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { TextField } from '@mui/material';



const styleTextField = {
	height: "32px",
	width: "200px",
	borderRadius: "3px",
	borderTopLeftRadius: "5px",
	borderBottomLeftRadius: "5px",
	borderTopRightRadius: "0",
	borderBottomRightRadius: "0",
	border: "1px solid #e5e5e5",
	padding: "0 32px 0 16px",
  };

const styleButton = {
	borderTopLeftRadius: "0",
	borderBottomLeftRadius: "0",
	borderTopRightRadius: "5px",
	borderBottomRightRadius: "5px",
	height: "34px",
	width: "32px",
	textAlign: "center",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
  };

const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<>
		<input
			id="search"
			style={styleTextField}
			type="text"
			placeholder="Rechercher par nom"
			aria-label="Search Input"
			value={filterText}
			onChange={onFilter}
		/>
		<Button style={styleButton}  type="button" onClick={onClear}>
			X
		</Button >
	</>
);

function Produits() {


	const decoded = localStorage.getItem("token") != null ? jwtDecode(localStorage.getItem("token" ?? "")) : null;
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
			name: 'Action',
			cell: row => (<>
				{decoded?.role == 'admin' ? <>

					<span className='text-primary btn' onClick={() => {
						editProduit(row)
					}}><i className="bi bi-pencil m-r-5"></i></span>
					<span className='text-danger btn' onClick={() => {
						deleteProduit(row)
					}}><i className="bi bi-trash m-r-5"></i></span>
				</>
					: <></>}
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
	const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const filteredItems = produits.filter(item => item.libelle && item.libelle.toLowerCase().includes(filterText.toLowerCase()));
	

	const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
		  if (filterText) {
			setResetPaginationToggle(!resetPaginationToggle);
			setFilterText('');
		  }
		};
		return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
	  }, [filterText, resetPaginationToggle]);


	useEffect(() => {
		if (decoded == null)
			return navigate("/login");
		if (decoded?.role == 'super admin')
			return navigate(-1);
		baseApi.get("produits").then((response) => {
			setProduits(response.data);
		})

		if(decoded?.role == 'admin'){
			columns.push();
		}

	}, [show])
	const initProduit = () => {
		setProduit({ libelle: "", prix: 0, quantite: 0 });
	}


	const editProduit = (a) => {
		if (decoded?.role != 'admin')
			return;
		setProduit({ id: a.id, libelle: a.libelle, prix: a.prix, quantite: a.quantite })
		handleShow()
	}

	const deleteProduit = (c) => {
		if (decoded?.role != 'admin')
			return;
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
	const handleShow = () => {

		if (decoded?.role != 'admin')
			return;
		setShow(true)
	};



	return (
		<>
			{decoded?.role == 'admin' ? <><Button className='mb-3' variant="primary" onClick={handleShow}>Nouveau Produit</Button></> : <></>}

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
				data={filteredItems}
				pagination
				subHeader subHeaderComponent={subHeaderComponentMemo}
				paginationComponentOptions={paginationComponentOptions}
			/>
		</>
	)
}

export default Produits