import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { baseApi } from '../../services/BaseService';
import { formatDate } from '../../config/Env';

function NewAbonnement() {

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
            name: 'Téléphone',
            selector: row => row.telephone,
            sortable: true,
        },
        {
            name: 'Nom Propriétaire',
            selector: row => row.user?.nom,
            sortable: true,
        },
        {
            name: 'action',
            selector: row => {
                return (
                    <>
                        <span className='text-success btn' onClick={() => activer(row.id)}><i className='bi bi-file-check-fill'></i> </span>
                    </>
                )
            },
            sortable: true,
        },
    ];

    const paginationComponentOptions = {
        rowsPerPageText: 'lignes par page',
        rangeSeparatorText: 'sur',
    };


    const activer = function (id) {
        console.log(id);

        swal({
            title: "Voulez-vous activé l'abonnement de ce boutique?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        })
        .then((willDelete) => {
            if (willDelete) {
                baseApi.get('abonnements/' + id + '/active-new').then((response) => {
                    if (response.status === 200) {
                        swal("Le boutique a été bien activé", {
                            icon: "success",
                        }).then(() => {

                            baseApi.get("new-abonnements").then((data) => {
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
        baseApi.get('new-abonnements').then(
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

export default NewAbonnement