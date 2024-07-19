import { Document, Image, Page, PDFViewer, Text, View } from '@react-pdf/renderer'
import React, { useEffect, useState } from 'react'
import { Env } from '../../config/Env';
import { useParams } from 'react-router-dom';
import { baseApi } from '../../services/BaseService';

function Facture() {

    const { id } = useParams();


    const [facture, setFacture] = useState()
    const [logo, setLogo] = useState("assets/images/logo-80x80.png");

    useEffect(() => {

        if (localStorage.getItem("abonnement_logo") != undefined && localStorage.getItem("abonnement_logo") != null && localStorage.getItem("abonnement_logo") != "")
            setLogo("storage/" + localStorage.getItem("abonnement_logo"));

        baseApi.get('ventes/' + id).then((resulte) => {
            setFacture(resulte.data)
        })
    }, [])

    return (

        <PDFViewer height={455}>
            <Document>
                <Page size="A5" style={styles.page}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                        <View>
                            <Image src={Env.API_URL + logo} style={{ height: 50, width: 50, borderRadius: 15 }} />
                            <Text >{localStorage.getItem('abonnement_nom')}</Text>
                            <Text style={{fontStyle: 'italic', fontWeight: 'light', fontSize: 13}} >{localStorage.getItem('abonnement_adresse')}</Text>
                            <Text style={{fontStyle: 'italic', fontWeight: 'light', fontSize: 13}} >{localStorage.getItem('abonnement_telephone')}</Text>
                        </View>
                        <Text style={{ color: "#212E5E", fontSize: 20, fontWeight: 'bold' }}>FACTURE</Text></View>
                    <View >
                        <Text>client: <Text style={{ fontWeight: 'bold' }}>{facture?.client?.nom}</Text></Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, backgroundColor: "#1A2232", color: 'white', padding: "10" }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Produit</Text>
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Prix</Text>
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Qte</Text>
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Total</Text>
                    </View>


                    {facture?.produits.map(element => {
                        return (
                            <>
                                <View style={{ width: '100%', borderBottom: 'solid, 1px' }}></View>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottom: '2px solid gray', marginTop: 10, paddingBottom: 5 }}>
                                    <Text style={styles.f_14}>{element.libelle}</Text>
                                    <Text style={styles.f_14}>{element.pivot?.montant_vente} F</Text>
                                    <Text style={styles.f_14_r}>{element.pivot?.quantite}</Text>
                                    <Text style={styles.f_14_r}>{element.pivot?.montant_vente * element.pivot?.quantite} F</Text>
                                </View>
                            </>);
                    })}
                    <View style={{ marginTop: 20 }}></View>
                    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
                        <Text style={{ fontSize: 18, }}>Montant total</Text>
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{facture?.montant_total} F</Text>
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
                        <Text style={{ fontSize: 18 }}>Montant payé</Text>
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{facture?.paiements?.reduce((mt, m) => mt + m.montant, 0)} F</Text>
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
                        <Text style={{ fontSize: 18 }}>{facture?.montant_total - facture?.paiements?.reduce((mt, m) => mt + m.montant, 0) > 0 ? 'Montant restant' : ''}</Text>
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{facture?.montant_total - facture?.paiements?.reduce((mt, m) => mt + m.montant, 0) > 0 ? facture?.montant_total - facture?.paiements?.reduce((mt, m) => mt + m.montant, 0)+"F" : ''}</Text>
                    </View>

                </Page>
            </Document>
        </PDFViewer>
    )
}

const styles = {
    page: {
        // backgroundColor: '#E4E4E4',
        padding: 20
    },
    row: {
        flexDirection: 'row',

    },
    section_row: {
        margin: 10,
        padding: 10,
        flexGrow: 1,

    },
    f_14: {
        fontSize: 14
    },
    f_14_r: {
        fontSize: 14,
        textAlign: 'right'
    }

};


export default Facture