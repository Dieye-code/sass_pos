import React, { useEffect, useState } from 'react'
import { baseApi } from '../../services/BaseService';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

function Achats() {


  const columns = [
    {
      name: 'Date',
      selector: row => row.date,
      sortable: true,
    },
    {
      name: 'Montant Total',
      selector: row => row.montant_achat + " Francs CFA",
      sortable: true,
    },
    {
      name: 'Fournisseur',
      selector: row => row.fournisseur?.nom,
      sortable: true,
    },
    {
      name: 'Etat',
      selector: row => row.etat,
      sortable: true,
    },
    {
      name: 'Edit',
      cell: row => (<>
        <span className='text-primary btn'><i className="bi bi-pencil m-r-5"></i></span>
        <span className='text-danger btn'><i className="bi bi-trash m-r-5"></i></span>
      </>
      )
    },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: 'lignes par page',
    rangeSeparatorText: 'sur',
  };
  const [achats, setAchats] = useState([]);
  useEffect(() => {
    baseApi.get("achats").then((response) => {
      setAchats(response.data);
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
                  setAchats(data.data)
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
      <span className="btn btn-primary text-white"><Link className='text-white' to={'/save-achat'}>Nouveau Achat</Link> </span>
      {/* <Modal show={show} size='lg' centered
				onHide={handleClose}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Produit</Modal.Title>
				</Modal.Header>
				<Modal.Body>

					<SaveProduit newProduit={produit} setShowModal={setShow} />
				</Modal.Body>
			</Modal> */}
      <DataTable
        columns={columns}
        data={achats}
        pagination
        paginationComponentOptions={paginationComponentOptions}
      />
    </>
  )
}

export default Achats