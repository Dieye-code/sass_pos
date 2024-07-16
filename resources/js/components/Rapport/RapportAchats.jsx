import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, Row } from 'react-bootstrap'
import { baseApi } from '../../services/BaseService';
import DataTable from 'react-data-table-component';

function RapportAchats() {


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
            name: 'Montant Payé',
            selector: row => row.paiements.reduce((mt, a) => mt + a.montant, 0) + " Francs CFA",
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

                return <><span className={row.etat === "en attente" ? 'text-danger' : row.etat === "en cours" ? 'text-warning' : 'text-success'}>{row.etat}</span></>
            },
            sortable: true,
        }
    ];

    const paginationComponentOptions = {
        rowsPerPageText: 'lignes par page',
        rangeSeparatorText: 'sur',
    };

    const [filter, setFilter] = useState('journalier');
    const [achats, setAchats] = useState([]);
    const [show, setShow] = useState(false);
    const [interval, setInterval] = useState({ debut: null, fin: null });

    useEffect(() => {
        getAchat('jour');
        setShow(false);
    }, []);

    const getAchat = function (e) {
        baseApi.get('achats/' + e).then(
            response => {
                setAchats(response.data)
            }
        )
    }
    const getAchatInterval = function () {
        baseApi.post('achats/intervalle', interval).then(
            response => {
                setAchats(response.data)
            }
        )
    }

    const onInputChange = (e) => {
        setFilter(e.target.value)
        switch (e.target.value) {
            case 'journalier':
                setShow(false);
                getAchat('jour');
                break;
            case 'hebdomadaire':
                setShow(false);
                getAchat('semaine');
                break;
            case 'mensuel':
                setShow(false);
                getAchat('mois');
                break;
            case 'intervalle':
                setShow(true);
                setAchats([]);
                break;

            default:
                break;
        }
    }

    return (
        <>
            <div key="inline-radio" className="mb-3">
                <Form.Check inline  label="Journalier" name="filter" type='radio' id="journalier" value={"journalier"} onChange={(e) => onInputChange(e)} />
                <Form.Check inline label="Hebdomadaire" name="filter" type='radio' id="hebdomadaire" value={"hebdomadaire"} onChange={(e) => onInputChange(e)} />
                <Form.Check inline label="Mensuel" name="filter" type='radio' id="mensuel" value={"mensuel"} onChange={(e) => onInputChange(e)} />
                <Form.Check inline label="intervalle" name="filter" type='radio' id="intervalle" value={"intervalle"} onChange={(e) => onInputChange(e)} />
            </div>

            {show ?
                <Row className='mb-3' >
                    <FormGroup as={Col} sm="5">
                        <Form.Label>Début</Form.Label>
                        <Form.Control type="date" value={interval?.debut} onChange={(e) => setInterval({ ...interval, ['debut']: e.target.value })} />
                    </FormGroup>
                    <FormGroup as={Col} sm="5">
                        <Form.Label>Fin</Form.Label>
                        <Form.Control type="date" value={interval?.fin} onChange={(e) => setInterval({ ...interval, ['fin']: e.target.value })} />
                    </FormGroup>
                    <FormGroup as={Col} sm="2">
                        <Form.Label></Form.Label>
                        <div className='col-auto text-end mb-2'>
                            <Button variant="primary" onClick={() => getAchatInterval()}>Filtrer</Button>
                        </div>
                    </FormGroup>
                </Row>
                : <> </>
            }




            <h6>Rapport achat {filter}</h6>
            <DataTable
                columns={columns}
                data={achats}
                pagination
                paginationComponentOptions={paginationComponentOptions}
            />

        </>
    )
}

export default RapportAchats