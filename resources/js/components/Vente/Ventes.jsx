import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { baseApi } from '../../services/BaseService';

function Ventes() {


  const columns = [
    {
      name: 'Date',
      selector: row => row.date,
      sortable: true,
    },
    {
      name: 'Montant Total',
      selector: row => row.montant_total + " Francs CFA",
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
            <Link to={`/ventes/paiement/${row.id}`} >
              <span className='text-primary btn'><i className='bi bi-cash-coin'></i> </span>
            </Link>
          </>
        } else {
          if (row.etat == "en cours") {
            return <>
              <span className='text-primary'>{row.etat}</span>
              <Link to={`/ventes/paiement/${row.id}`} >
                <span className='text-primary btn'><i className='bi bi-cash-coin'></i> </span>
              </Link>
            </>
          } else {
            return <>
              <span className='text-success'>{row.etat}</span>
              <Link to={`/ventes/paiement/${row.id}`} >
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
  const [ventes, setVentes] = useState([]);
  useEffect(() => {
    baseApi.get("ventes").then((response) => {

      setVentes(response.data.reverse());
    })
  }, [])

  const deleteAchat = (c) => {
    swal({
      title: "Voulez-vous supprimer ce Produit?",
      icon: "error",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          baseApi.delete('/achats/' + c.id).then((response) => {
            console.log(response);
            if (response.status === 200) {
              swal("Le produit a été bien supprimer", {
                icon: "success",
              }).then(() => {

                baseApi.get("achats").then((data) => {
                  setAchats(data.data.reverse())
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


  return (
    <>

      <span className="btn btn-primary text-white">
        <Link className='text-white' to={'/save-vente'}>Nouveau Vente</Link>
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