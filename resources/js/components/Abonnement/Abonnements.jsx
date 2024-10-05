import React, { useEffect, useState } from 'react'
import { baseApi } from '../../services/BaseService';
import DataTable from 'react-data-table-component';
import { formatDate } from '../../config/Env';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Abonnements() {

    const decoded = jwtDecode(localStorage.getItem("token" ?? ""));
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
            selector: row => formatDate(row.date),
            sortable: true,
        },
        {
            name: 'Etat',
            selector: row => {
                if (row.etat === 1) {

                    return <>
                        <span className='text-success'>en cours</span>
                        <span className='text-danger btn' onClick={() => arrete(row.id)}><i className='bi bi-file-x-fill'></i> </span>
                        {/* <Link to={`/achats/${row.id}/details`} >
                            <span className='text-success btn'><i className='bi bi-cash-coin'></i> </span>
                        </Link> */}

                    </>
                } else {
                    return <>
                        <span className='text-danger'>arreté</span>
                        <span className='text-success btn' onClick={() => reactive(row.id)}><i className='bi bi-file-check-fill'></i> </span>
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
        console.log(id);

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
        console.log(id);

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

    const [abonnements, setAbonnements] = useState([]);


    useEffect(() => {
        if (decoded.role = 'super admin')
            return navigate(-1);
        baseApi.get('abonnements').then(
            result => {
                setAbonnements(result.data)
            }
        )
    }, []);

    return (
        <>

            <DataTable
                columns={columns}
                data={abonnements}
                pagination
                paginationComponentOptions={paginationComponentOptions}
            />
        </>
    )
}

export default Abonnements