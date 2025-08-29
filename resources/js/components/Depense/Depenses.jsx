import React, { useEffect, useMemo, useState } from 'react'
import { baseApi } from '../../services/BaseService';
import DataTable from 'react-data-table-component';
import { Button, Form, Image, Modal } from 'react-bootstrap';
import SaveDepenses from './SaveDepenses';
import { Env, formatDate, getStorageLink } from '../../config/Env';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
		<Form.Control
			id="search"
			type="text"
			placeholder="Filtrer par libellé"
			aria-label="Search Input"
			value={filterText}
			onChange={onFilter}
		/>
		<Button variant="outline-secondary" type="button" onClick={onClear}>
			X
		</Button>
	</div>
);

function Depenses() {


    const decoded = localStorage.getItem("token") != null ? jwtDecode(localStorage.getItem("token" ?? "")) : null;
    const navigate = useNavigate();

    const columns = [
        {
            name: 'Libelle',
            selector: row => {
                return <>
                    {row.libelle}
                    <Image 
                        src={getStorageLink(row.pieces_justificatifs)} 
                        width='30' 
                        roundedCircle 
                        style={{objectFit: 'cover', marginLeft: '10px', cursor: 'pointer'}} 
                        onClick={() => {
                            setSelectedPiece(row.pieces_justificatifs);
                            setShowPiece(true);
                        }}
                    />
                </>
            },
            sortable: true,
            grow: 2
        },
        {
            name: 'Montant Total',
            selector: row => Intl.NumberFormat().format(row.montant) + " Francs CFA",
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => formatDate(row.date),
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => (<>
                <span className='text-primary btn' onClick={() => {
                    edit(row)
                }}><i className="bi bi-pencil m-r-5"></i></span>
                <span className='text-danger btn' onClick={() => {
                    deleteDepense(row)
                }}><i className="bi bi-trash m-r-5"></i></span>
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
    const [depenses, setDepenses] = useState([]);
    const [depense, setDepense] = useState({ libelle: "", montant: 0, date: "" });
    const [showPiece, setShowPiece] = useState(false);
    const [selectedPiece, setSelectedPiece] = useState("");
    useEffect(() => {
		if(decoded == null)
			return navigate("/login")
        if (decoded?.role != 'admin')
            return navigate(-1);
        baseApi.get("depenses").then((response) => {
            setDepenses(response.data.reverse());
        })
    }, [show])

    useEffect(() => {
        setFilteredItems(depenses.filter(item => item.libelle && item.libelle.toLowerCase().includes(filterText.toLowerCase())));
    }, [filterText, depenses])

    const init = () => {
        setDepense({ libelle: "", montant: 0, date: "" });
    }
    const edit = (a) => {
        setDepense({ id: a.id, libelle: a.libelle, montant: a.montant, date: a.date })
        handleShow()
    }
    const deleteDepense = (c) => {
        swal({
            title: "Voulez-vous supprimer cette dépense?",
            icon: "error",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    baseApi.delete('/depenses/' + c.id).then((response) => {
                        if (response.status === 200) {
                            swal("Le dépense a été bien supprimer", {
                                icon: "success",
                            }).then(() => {

                                baseApi.get("depenses").then((data) => {
                                    setDepenses(data.data)
                                    init();
                                })
                            });
                        } else {
                            swal("Erreur lors de la suppression de la dépense", {
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
        init()
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
            <Modal show={showPiece} onHide={() => setShowPiece(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Pièce Justificative</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <Image src={getStorageLink(selectedPiece)} style={{maxWidth: '100%', height: 'auto'}} />
                </Modal.Body>
            </Modal>
            <Button className='mb-3' variant="primary" onClick={handleShow}>Nouvelle Dépense</Button>
            <Modal show={show} size='lg' centered
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Dépense</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <SaveDepenses newDepense={depense} setShowModal={setShow} />
                </Modal.Body>
            </Modal>
            <DataTable
        noDataComponent="Pas de données trouvées"
                columns={columns}
                data={filteredItems.length > 0 || filterText ? filteredItems : depenses}
                pagination
                subHeader={true}
                subHeaderComponent={SubHeaderComponentMemo}
                paginationResetDefaultPage={resetPaginationToggle}
                paginationComponentOptions={paginationComponentOptions}
            />
        </>
    )
}

export default Depenses