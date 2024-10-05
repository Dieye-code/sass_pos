import React, { useEffect, useState } from 'react'
import { baseApi } from '../../services/BaseService';
import DataTable from 'react-data-table-component';
import { Button, Modal } from 'react-bootstrap';
import SaveDepenses from './SaveDepenses';
import { formatDate } from '../../config/Env';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Depenses() {


    const decoded = jwtDecode(localStorage.getItem("token" ?? ""));
    const navigate = useNavigate();

    const columns = [
        {
            name: 'Libelle',
            selector: row => row.libelle,
            sortable: true,
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

    const [show, setShow] = useState(false);
    const [depenses, setDepenses] = useState([]);
    const [depense, setDepense] = useState({ libelle: "", montant: 0, date: "" });
    useEffect(() => {
        if (decoded.role != 'admin')
            return navigate(-1);
        baseApi.get("depenses").then((response) => {
            setDepenses(response.data.reverse());
        })
    }, [show])

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

    return (
        <>
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
                columns={columns}
                data={depenses}
                pagination
                paginationComponentOptions={paginationComponentOptions}
            />
        </>
    )
}

export default Depenses