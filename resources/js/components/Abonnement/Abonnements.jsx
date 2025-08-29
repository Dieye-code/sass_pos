import React, { useEffect, useState } from 'react'
import { baseApi } from '../../services/BaseService';
import DataTable from 'react-data-table-component';
import { formatDate } from '../../config/Env';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import ChangeAbonnement from './ChangeAbonnement';
import { Modal } from 'react-bootstrap';

function Abonnements() {

    const decoded = localStorage.getItem("token") != null ? jwtDecode(localStorage.getItem("token" ?? "")) : null;
    const navigate = useNavigate();

    const columns = [
        {
            name: 'Nom boutique',
            selector: row => row.nom,
            sortable: true,
        },
        {
            name: 'Adresse',
            selector: row => row.adresse,
            sortable: true,
        },
        {
            name: 'Date abonnement',
            selector: row => formatDate(row.date),
            sortable: true,
        },
        {
            name: 'Date fin abonnement',
            selector: row => formatDate(row.dateLimit),
            sortable: true,
        },
        {
            name: 'Etat',
            grow: 2.5,
            selector: row => {

                var date = new Date(row.dateLimit);
                var now = new Date();
                let month = date.getTime() - now.getTime();

                if (row.etat === 1) {

                    if (Math.round(month / (24 * 60 * 60 * 1000)) <= 30) {
                        return <>
                            <span className='text-warning'>en expiration</span>
                            <span className='text-danger btn' onClick={() => arrete(row.id)}><i className='bi bi-file-x-fill'></i> </span>
                            <span className='text-primary btn' onClick={() => { setAbonnement(row); setShow(true); }}><i className='bi bi-calendar3'></i> </span>
                            <Link to={`/abonnements/${row.id}/change-password`} >
                                <span className='text-primary btn'><i className='bi bi-lock-fill'></i> </span>
                            </Link>
                            <span className='text-danger btn' onClick={() => { supprimer(row.id); }}><i className='bi bi-trash-fill'></i> </span>

                        </>

                    } else {
                        return <>
                            <span className='text-success'>en cours</span>
                            <span className='text-danger btn' onClick={() => arrete(row.id)}><i className='bi bi-file-x-fill'></i> </span>
                            <span className='text-primary btn' onClick={() => { setAbonnement(row); setShow(true); }}><i className='bi bi-calendar3'></i> </span>
                            <Link to={`/abonnements/${row.id}/change-password`} >
                                <span className='text-primary btn'><i className='bi bi-lock-fill'></i> </span>
                            </Link>
                            <span className='text-danger btn' onClick={() => { supprimer(row.id); }}><i className='bi bi-trash-fill'></i> </span>

                        </>
                    }
                } else {

                    return <>
                        <span className='text-danger'>arreté</span>
                        <span className='text-success btn' onClick={() => reactive(row.id)}><i className='bi bi-file-check-fill'></i> </span>
                        <span className='text-primary btn' onClick={() => { setAbonnement(row); setShow(true); }}><i className='bi bi-calendar3'></i> </span>
                        <span className='text-danger btn' onClick={() => { supprimer(row.id); }}><i className='bi bi-trash-fill'></i> </span>
                        {/* <Link to={`/achats/${row.id}/details`} >
                                <span className='text-primary btn'><i className='bi bi-person-x'></i> </span>
                            </Link> */}
                    </>
                }
            },
            sortable: true,
        },
    ];

    const paginationComponentOptions = {
        rowsPerPageText: 'lignes par page',
        rangeSeparatorText: 'sur',
    };


    const arrete = function (id) {

        swal({
            title: "Voulez-vous arrêté l'abonnement de ce boutique?",
            icon: "error",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    baseApi.get('abonnements/' + id + '/arrete').then((response) => {
                        if (response.status === 200) {
                            swal("Le produit a été bien arrêté", {
                                icon: "success",
                            }).then(() => {

                                baseApi.get("abonnements").then((data) => {
                                    setAbonnements(data.data)
                                })
                            });
                        } else {
                            swal("Erreur lors du traitement de l'opération", {
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
    const reactive = function (id) {

        swal({
            title: "Voulez-vous réactivé l'abonnement de ce boutique?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        })
            .then((willDelete) => {
                if (willDelete) {
                    baseApi.get('abonnements/' + id + '/active').then((response) => {
                        if (response.status === 200) {
                            swal("Le boutique a été bien réactivé", {
                                icon: "success",
                            }).then(() => {

                                baseApi.get("abonnements").then((data) => {
                                    setAbonnements(data.data)
                                })
                            });
                        } else {
                            swal("Erreur lors du traitement de l'opération", {
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

    const supprimer = function (id) {

        swal({
            title: "Attention",
            text: "Voulez-vous supprimer l'abonnement de ce boutique? Attention toutes les données seront supprimées!",
            icon: "error",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    
                    
                    baseApi.get('abonnements/' + id + '/supprimer').then((response) => {
                        
                        if (response.status === 200) {
                            swal("L'abonnement a été bien supprimé", {
                                icon: "success",
                            }).then(() => {

                                baseApi.get("abonnements").then((data) => {
                                    setAbonnements(data.data)
                                })
                            });
                        } else {
                            swal("Erreur lors du traitement de l'opération", {
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

    const [abonnements, setAbonnements] = useState([]);
    const [show, setShow] = useState(false);
    const [abonnement, setAbonnement] = useState();

    const handleClose = () => {
        setShow(false)
        initfournisseur()
    };
    const handleShow = () => setShow(true);


    useEffect(() => {
		if(decoded == null)
			return navigate("/login")
        
        if ( decoded?.role != 'super admin')
            return navigate(-1);
        baseApi.get('abonnements').then(
            result => {
                setAbonnements(result.data)
            }
        )
    }, [show]);

    return (
        <>

            <Modal show={show} size='lg' centered
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Renouvelé son abonnement</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <ChangeAbonnement newAbonnement={abonnement} setShowModal={setShow} />
                </Modal.Body>
            </Modal>

            <DataTable
                noDataComponent="Pas de données trouvées"
                columns={columns}
                data={abonnements}
                pagination
                paginationComponentOptions={paginationComponentOptions}
            />
        </>
    )
}

export default Abonnements