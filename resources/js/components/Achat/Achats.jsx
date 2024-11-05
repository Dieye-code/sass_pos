import React, { useEffect, useState } from 'react'
import { baseApi } from '../../services/BaseService';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { formatDate } from '../../config/Env';
import { jwtDecode } from 'jwt-decode';

function Achats() {

  const decoded = jwtDecode(localStorage.getItem("token" ?? ""));

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
      name: 'Fournisseur',
      selector: row => row.fournisseur?.nom,
      sortable: true,
    },
    {
      name: 'Etat',
      selector: row => {

        if (row.etat === "en attente") {
          return <>
            <span className='text-danger'>{row.etat}</span>
            <Link to={`/achats/${row.id}/details`} >
              <span className='text-primary btn'><i className='bi bi-cash-coin'></i> </span>
            </Link>
              {decoded.role == 'admin' ?
                <span className='text-danger btn' onClick={() => retour(row)}><i className='bi bi-cart-x fs-5'></i> </span>
                : <></>}
          </>
        } else {
          if (row.etat == "en cours") {
            return <>
              <span className='text-primary'>{row.etat}</span>
              <Link to={`/achats/${row.id}/details`} >
                <span className='text-primary btn'><i className='bi bi-cash-coin'></i> </span>
              </Link>
              {decoded.role == 'admin' ?
                <span className='text-danger btn' onClick={() => retour(row)}><i className='bi bi-cart-x fs-5'></i> </span>
                : <></>}
            </>
          } else {
            return <>
              <span className='text-success'>{row.etat}</span>
              <Link to={`/achats/${row.id}/details`} >
                <span className='text-primary btn'><i className='bi bi-cash-coin'></i> </span>
              </Link>
              {decoded.role == 'admin' ?
                <span className='text-danger btn' onClick={() => retour(row)}><i className='bi bi-cart-x fs-5'></i> </span>
                : <></>}

            </>

          }
        }
      },
      sortable: true,
    },
    // {
    //   name: 'Edit',
    //   cell: row => (<>
    //     <span className='text-primary btn'><i className="bi bi-pencil m-r-5"></i></span>
    //     <span className='text-danger btn'><i className="bi bi-trash m-r-5"></i></span>
    //   </>
    //   )
    // },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: 'lignes par page',
    rangeSeparatorText: 'sur',
  };
  const [achats, setAchats] = useState([]);
  useEffect(() => {
    document.title = "Achat produit"
    baseApi.get("achats").then((response) => {
      setAchats(response.data.reverse())
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

  

  const retour = (c) => {
    swal({
      title: "Voulez-vous retourner cette achat?",
      icon: "error",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          baseApi.delete('/achats/' + c.id + '/retour').then((response) => {
            if (response.status === 200) {
              swal("L'achat a été bien retourner", {
                icon: "success",
              }).then(() => {

                baseApi.get("achats").then((data) => {
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
      <span className="btn btn-primary text-white  mb-2"><Link className='text-white' to={'/save-achat'}>Nouveau Achat</Link> </span>
      <DataTable
        noDataComponent="Pas de données trouvées"
        columns={columns}
        data={achats}
        pagination
        paginationComponentOptions={paginationComponentOptions}
      />
    </>
  )
}

export default Achats