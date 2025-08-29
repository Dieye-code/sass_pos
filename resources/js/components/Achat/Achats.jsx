import React, { useEffect, useMemo, useState } from 'react'
import { baseApi } from '../../services/BaseService';
import { Button, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../../config/Env';
import { jwtDecode } from 'jwt-decode';


const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
    <Form.Control
      id="search"
      type="text"
      placeholder="Filtrer par libellé"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <Button variant="outline-secondary" type="button" onClick={onClear}>
      X
    </Button>
  </div>
);

function Achats() {

  const decoded = localStorage.getItem("token") != null ? jwtDecode(localStorage.getItem("token" ?? "")) : null;
  const navigate = useNavigate();


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
          </>
        } else {
          if (row.etat == "en cours") {
            return <>
              <span className='text-primary'>{row.etat}</span>
              <Link to={`/achats/${row.id}/details`} >
                <span className='text-primary btn'><i className='bi bi-cash-coin'></i> </span>
              </Link>
            </>
          } else {
            return <>
              <span className='text-success'>{row.etat}</span>
              <Link to={`/achats/${row.id}/details`} >
                <span className='text-primary btn'><i className='bi bi-cash-coin'></i> </span>
              </Link>

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

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [achats, setAchats] = useState([]);
  useEffect(() => {

    if (decoded == null)
      return navigate("/login")

    if (decoded?.role != 'admin')
      return navigate(-1);

    document.title = "Achat produit"
    baseApi.get("achats").then((response) => {
      setAchats(response.data.reverse())
    })
  }, [])

  useEffect(() => {
    setFilteredItems(achats.filter(item => 
      (item.date && formatDate(item.date).toLowerCase().includes(filterText.toLowerCase())) || 
      (item.fournisseur?.nom && item.fournisseur?.nom.toLowerCase().includes(filterText.toLowerCase()))
    ));
  }, [filterText, achats])

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

  const SubHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };
    return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
  }, [filterText, resetPaginationToggle]);

  return (
    <>
      <span className="btn btn-primary text-white  mb-2"><Link className='text-white' to={'/save-achat'}>Nouveau Achat</Link> </span>
      <DataTable
        noDataComponent="Pas de données trouvées"
        columns={columns}

        data={filteredItems.length > 0 || filterText ? filteredItems : achats}
        pagination
        subHeader={true}
        subHeaderComponent={SubHeaderComponentMemo}

        paginationComponentOptions={paginationComponentOptions}
      />
    </>
  )
}

export default Achats