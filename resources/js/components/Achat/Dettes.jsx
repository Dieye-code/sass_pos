import React, { useEffect, useState } from 'react'
import { baseApi } from '../../services/BaseService'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

function Dettes() {

    const columns = [
        {
            name: 'Date',
            selector: row => row.achat?.date,
            sortable: true,
        },
        {
            name: 'Montant achat',
            selector: row => row.achat?.montant_total + " Francs CFA",
            sortable: true,
        },
        {
            name: 'Montant dette',
            selector: row => row.dette + " Francs CFA",
            sortable: true,
        },
        {
            name: 'Fournisseur',
            selector: row => row.achat?.fournisseur?.nom,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => {

                if (row.achat?.etat === "en attente") {
                    return <>
                        <span className='text-danger'>{row.achat?.etat}</span>
                        <Link to={`/achats/${row.achat?.id}/details`} >
                            <span className='text-primary btn'><i className='bi bi-cash-coin'></i> </span>
                        </Link>
                    </>
                } else {
                    if (row.achat?.etat == "en cours") {
                        return <>
                            <span className='text-primary'>{row.achat?.etat}</span>
                            <Link to={`/achats/${row.achat?.id}/details`} >
                                <span className='text-primary btn'><i className='bi bi-cash-coin'></i> </span>
                            </Link>
                        </>
                    } else {
                        return <>
                            <span className='text-success'>{row.achat?.etat}</span>
                            <Link to={`/achats/${row.achat?.id}/details`} >
                                <span className='text-primary btn'><i className='bi bi-cash-coin'></i> </span>
                            </Link>

                        </>

                    }
                }
            },
            sortable: true,
        }
    ];
    const paginationComponentOptions = {
      rowsPerPageText: 'lignes par page',
      rangeSeparatorText: 'sur',
    };

    const [dettes, setDettes] = useState([]);

    useEffect(() => {
        baseApi.get('dettes').then((response) => {
            setDettes(response.data);
        })
    }, [])

    return (
        <>

            <div className="row row-cols-1 row-cols-md-2 ">
                <div className="col">
                    <div className="card radius-10">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div>
                                    <p className="mb-0 text-secondary">Total dette</p>
                                    <h4 >{dettes.reduce((mt, a) => mt + a.dette, 0)} Francs CFA</h4>
                                </div>
                                <div className="widget-icon-large bg-gradient-purple text-white ms-auto"><i className="bi bi-currency-exchange"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h5>Liste des achats avec une dette</h5>
            <DataTable
                columns={columns}
                data={dettes}
                pagination
                paginationComponentOptions={paginationComponentOptions}
            />
        </>
    )
}

export default Dettes