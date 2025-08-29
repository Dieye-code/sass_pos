import React, { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { baseApi } from '../../services/BaseService';
import Facture from './Facture';
import { BlobProvider, PDFViewer } from '@react-pdf/renderer';
import { formatDate } from '../../config/Env';
import { jwtDecode } from 'jwt-decode';
import { Button, Form } from 'react-bootstrap';


const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
    <Form.Control
      id="search"
      type="text"
      placeholder="Filtrer par client ou date"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <Button variant="outline-secondary" type="button" onClick={onClear}>
      X
    </Button>
  </div>
);

function Ventes() {

  const decoded = localStorage.getItem("token") != null ? jwtDecode(localStorage.getItem("token" ?? "")) : null;

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
      name: 'Vendeur',
      selector: row => row.user?.nom,
      sortable: true,
    },
    {
      name: 'Etat',
      grow: 2,
      selector: row => {

        if (row.etat === "en attente") {
          return <>
            <span className='text-danger'>{row.etat}</span>
            <Link to={`/ventes/${row.id}/details`} >
              <span className='text-primary btn'><i className='bi bi-cash-coin'></i> </span>
            </Link>
            <span className='text-danger btn' onClick={() => retour(row)}><i className='bi bi-cart-x fs-5'></i> </span>
          </>
        } else {
          if (row.etat == "en cours") {
            return <>
              <span className='text-primary'>{row.etat}</span>
              <Link to={`/ventes/${row.id}/details`} >
                <span className='text-primary btn'><i className='bi bi-cash-coin'></i> </span>
              </Link>
              <span className='text-danger btn' onClick={() => retour(row)}><i className='bi bi-cart-x fs-5'></i> </span>
            </>
          } else {
            return <>
              <span className='text-success'>{row.etat}</span>
              <Link to={`/ventes/${row.id}/details`} >
                <span className='text-primary btn'><i className='bi bi-cash-coin'></i> </span>
              </Link>
              {decoded?.role == 'admin' ?
                <span className='text-danger btn' onClick={() => retour(row)}><i className='bi bi-cart-x fs-5'></i> </span>
                : <></>}
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
  
  
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [filteredItems, setFilteredItems] = useState([]);
  const [ventes, setVentes] = useState([]);
  useEffect(() => {
    if ( decoded == null)
        return navigate("/login");
    baseApi.get("ventes").then((response) => {
      setVentes(response.data.reverse());
    })
  }, [])
  
    useEffect(() => {
      setFilteredItems(ventes.filter(item => 
        (item.date && formatDate(item.date).toLowerCase().includes(filterText.toLowerCase())) || 
        (item.client?.nom && item.client?.nom.toLowerCase().includes(filterText.toLowerCase()))
      ));
    }, [filterText, ventes])



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
      <span className="btn btn-primary text-white  mb-2">
        <Link className='text-white' to={'/save-vente'}>Nouvelle Vente</Link>
      </span>
      <DataTable
        noDataComponent="Pas de données trouvées"
        columns={columns}
        data={filteredItems.length > 0 || filterText ? filteredItems : ventes}
        pagination
        subHeader={true}
        subHeaderComponent={SubHeaderComponentMemo}
        paginationComponentOptions={paginationComponentOptions}
      />
    </>
  )
}

export default Ventes