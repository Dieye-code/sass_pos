import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import {baseApi} from '../../services/BaseService'

function Creances() {

    const columns = [
        {
            name: 'Date',
            selector: row => row.vente?.date,
            sortable: true,
        },
        {
            name: 'Montant vente',
            selector: row => row.vente?.montant_total + " Francs CFA",
            sortable: true,
        },
        {
            name: 'Montant creance',
            selector: row => row.creance + " Francs CFA",
            sortable: true,
        },
        {
            name: 'Client',
            selector: row => row.vente?.client?.nom,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => {

                if (row.vente?.etat === "en attente") {
                    return <>
                        <span className='text-danger'>{row.vente?.etat}</span>
                        <Link to={`/ventes/${row.vente?.id}/details`} >
                            <span className='text-primary btn'><i className='bi bi-cash-coin'></i> </span>
                        </Link>
                    </>
                } else {
                    if (row.vente?.etat == "en cours") {
                        return <>
                            <span className='text-primary'>{row.vente?.etat}</span>
                            <Link to={`/ventes/${row.vente?.id}/details`} >
                                <span className='text-primary btn'><i className='bi bi-cash-coin'></i> </span>
                            </Link>
                        </>
                    } else {
                        return <>
                            <span className='text-success'>{row.vente?.etat}</span>
                            <Link to={`/ventes/${row.vente?.id}/details`} >
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

    const [creances, setCreances] = useState([]);

    useEffect(() => {
        baseApi.get('creances').then((response) => {
            setCreances(response.data);
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
                                    <p className="mb-0 text-secondary">Total créance</p>
                                    <h4 >{creances.reduce((mt, a) => mt + a.creance, 0)} Francs CFA</h4>
                                </div>
                                <div className="widget-icon-large bg-gradient-purple text-white ms-auto"><i className="bi bi-currency-exchange"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h5>Liste des ventes avec une creance</h5>
            <DataTable
                columns={columns}
                data={creances}
                pagination
                paginationComponentOptions={paginationComponentOptions}
            />
        </>
    )
}

export default Creances