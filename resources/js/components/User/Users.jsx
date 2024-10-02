import React, { useEffect, useState } from 'react'
import { baseApi } from '../../services/BaseService';
import DataTable from 'react-data-table-component';
import { Button, Modal } from 'react-bootstrap';
import SaveUser from './SaveUser';

function Users() {

  const columns = [
    {
      name: 'Nom',
      cell: row => row.nom,
      sortable: true,
    },
    {
      name: 'Téléphone',
      selector: row => row.telephone,
      sortable: true,
    },
    {
      name: 'Role',
      selector: row => row.role,
      sortable: true,
    },
    {
      name: 'Etat',
      selector: row => {
        if (row.etat === 1) {

          return <>
            <span className='text-success'>Actif</span>
            <span className='text-danger btn' onClick={() => arrete(row.id)}><i className='bi bi-file-x-fill'></i> </span>
          </>
        } else {
          return <>
            <span className='text-danger'>Inactif</span>
            <span className='text-success btn' onClick={() => reactive(row.id)}><i className='bi bi-file-check-fill'></i> </span>
          </>
        }
      },
      sortable: true,
    },
    {
      name: 'Edit',
      cell: row => (<>
        <span className='text-primary btn' onClick={() => editUser(row)}>
          <i className="bi bi-pencil m-r-5"></i></span>
        <span className='text-danger btn' onClick={() => {
          deleteUser(row)
        }}><i className="bi bi-trash m-r-5"></i></span>
      </>
      )
    },
  ];
  const paginationComponentOptions = {
    rowsPerPageText: 'lignes par page',
    rangeSeparatorText: 'sur',
  };
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ nom: "", telephone: "", password: '', role: "user" });

  useEffect(() => {
    document.title = "utilisateurs"
    baseApi.get("users").then((response) => {
      setUsers(response.data);
    })
  }, [show])

  const handleClose = () => {
    setShow(false)
    initUser()
  };
  const handleShow = () => setShow(true);
  const initUser = () => {
    setUser({ nom: "", telephone: "", password: '', role: "user" });
  }

  const editUser = (r) => {
    setShow(true);
    setUser(r);
    console.log(r);

  }

  const deleteUser = (u) => {
    baseApi.delete(`users/${u.id}`).then(() => {
      setUsers(users.filter((user) => user.id !== u.id));
    });
  }

  const arrete = function (id) {
    console.log(id);

    swal({
      title: "Voulez-vous désactiver cet utilisateur?",
      icon: "error",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          baseApi.get('/users/' + id + '/arrete').then((response) => {
            if (response.status === 200) {
              swal("L'utilisateur a été bien arrété", {
                icon: "success",
              }).then(() => {

                baseApi.get("users").then((data) => {
                  setUsers(data.data)
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
    swal({
      title: "Voulez-vous réactiver cet utilisateur?",
      icon: "info",
      buttons: true,
      dangerMode: false,
    })
      .then((willDelete) => {
        if (willDelete) {
          baseApi.get('/users/'+id+'/active').then((response) => {
            if (response.status === 200) {
              swal("L\'utilisateur a été bien réactivé", {
                icon: "success",
              }).then(() => {

                baseApi.get("users").then((data) => {
                  setUsers(data.data)
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


  return (
    <>
      <Button className='mb-3' variant="primary" onClick={handleShow}>Nouveau Utilisateur</Button>
      <Modal show={show} size='lg' centered
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <SaveUser newUser={user} setShowModal={setShow} />
        </Modal.Body>
      </Modal>

      <DataTable
        columns={columns}
        data={users ?? []}
        pagination
        paginationComponentOptions={paginationComponentOptions}
      />
    </>
  )
}

export default Users