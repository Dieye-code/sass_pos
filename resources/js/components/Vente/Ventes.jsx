import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { baseApi } from '../../services/BaseService';
import Facture from './Facture';
import { BlobProvider, PDFViewer } from '@react-pdf/renderer';
import { formatDate } from '../../config/Env';

function Ventes() {


  const columns = [
    {
      name: 'Date',
      selector: row => formatDate(row.date),
      sortable: true,
    },
    {
      name: 'Montant Total',
      selector: row => Intl.NumberFormat().format(row.montant_total) + " Francs CFA",
      sortable: true,
    },
    {
      name: 'Client',
      selector: row => row.client?.nom,
      sortable: true,
    },
    {
      name: 'Etat',
      selector: row => {

        if (row.etat === "en attente") {
          return <>
            <span className='text-danger'>{row.etat}</span>
            <Link to={`/ventes/${row.id}/details`} >
              <span className='text-primary btn'><i className='bi bi-cash-coin'></i> </span>
            </Link>
          </>
        } else {
          if (row.etat == "en cours") {
            return <>
              <span className='text-primary'>{row.etat}</span>
              <Link to={`/ventes/${row.id}/details`} >
                <span className='text-primary btn'><i className='bi bi-cash-coin'></i> </span>
              </Link>
            </>
          } else {
            return <>
              <span className='text-success'>{row.etat}</span>
              <Link to={`/ventes/${row.id}/details`} >
                <span className='text-primary btn'><i className='bi bi-cash-coin'></i> </span>
              </Link>
              <span className='text-danger btn' onClick={() => retour(row)}><i className='bi bi-cart-x fs-5'></i> </span>
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
  const [ventes, setVentes] = useState([]);
  useEffect(() => {
    baseApi.get("ventes").then((response) => {
      setVentes(response.data.reverse());
    })
  }, [])

  

	const retour = (c) => {
		swal({
			title: "Voulez-vous retourner cette vente?",
			icon: "error",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					baseApi.delete('/ventes/' + c.id + '/retour').then((response) => {
						if (response.status === 200) {
							swal("La vente a été bien retourner", {
								icon: "success",
							}).then(() => {

								baseApi.get("ventes").then((data) => {
									setVentes(data.data);
								})
							});
						} else {
							swal("Erreur lors du retour de la vente", {
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

  return (
    <>
      <span className="btn btn-primary text-white  mb-2">
        <Link className='text-white' to={'/save-vente'}>Nouvelle Vente</Link>
      </span>
      <DataTable
        columns={columns}
        data={ventes}
        pagination
        paginationComponentOptions={paginationComponentOptions}
      />
    </>
  )
}

export default Ventes