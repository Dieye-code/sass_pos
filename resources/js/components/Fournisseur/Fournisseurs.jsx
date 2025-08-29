import React, { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component';
import Savefournisseur from './SaveFournisseur';
import { Button, Form, Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import { baseApi } from '../../services/BaseService';
import { jwtDecode } from 'jwt-decode';



const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
		<Form.Control
			id="search"
			type="text"
			placeholder="Filtrer par nom"
			aria-label="Search Input"
			value={filterText}
			onChange={onFilter}
		/>
		<Button variant="outline-secondary" type="button" onClick={onClear}>
			X
		</Button>
	</div>
);


function Fournisseurs() {

	const decoded = localStorage.getItem("token") != null ? jwtDecode(localStorage.getItem("token" ?? "")) : null;
	const navigate = useNavigate();

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
				<span className='text-primary btn'>
					<Link to={'/fournisseurs/' + row.id + '/details'}><i className="bi bi-eye m-r-5"></i></Link>
				</span>
			</>
			)
		},
	];
	const paginationComponentOptions = {
		rowsPerPageText: 'lignes par page',
		rangeSeparatorText: 'sur',
	};

	const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const [filteredItems, setFilteredItems] = useState([]);
	const [show, setShow] = useState(false);
	const [fournisseurs, setFournisseurs] = useState([]);
	const [fournisseur, setFournisseur] = useState({ nom: "", telephone: "", adresse: "" });
	useEffect(() => {
		if (decoded == null)
			return navigate("/login");
		if (decoded?.role != 'admin')
			return navigate(-1);
		baseApi.get("fournisseurs").then((response) => {
			setFournisseurs(response.data);
		})
	}, [show])


	useEffect(() => {
		setFilteredItems(fournisseurs.filter(item =>
			(item.nom && item.nom.toLowerCase().includes(filterText.toLowerCase()))
		));
	}, [filterText, fournisseurs])

	const initfournisseur = () => {
		setFournisseur({ nom: "", telephone: "", adresse: "" });
	}

	const editFournisseur = (a) => {
		setFournisseur({ id: a.id, nom: a.nom, telephone: a.telephone, adresse: a.adresse })
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


	const SubHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};
		return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
	}, [filterText, resetPaginationToggle]);

	return (
		<>
			<Button className='mb-3' variant="primary" onClick={handleShow}>Nouveau fournisseur</Button>
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
			</Modal>
			<DataTable
				noDataComponent="Pas de données trouvées"
				columns={columns}
				data={filteredItems.length > 0 || filterText ? filteredItems : fournisseurs}
				pagination
				subHeader={true}
				subHeaderComponent={SubHeaderComponentMemo}
				paginationComponentOptions={paginationComponentOptions}
			/>
		</>
	)
}

export default Fournisseurs