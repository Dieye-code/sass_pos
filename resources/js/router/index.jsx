import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Home from '../components/Home';
import NotFound from '../components/NotFound';
import Main from '../layouts/Main';
import Fournisseurs from '../components/Fournisseur/Fournisseurs';
import Clients from '../components/Client/Clients';
import Produits from '../components/Produit/Produits';
import Achats from '../components/Achat/Achats';
import Ventes from '../components/Vente/Ventes';
import SaveAchat from '../components/Achat/SaveAchat';
import SaveVente from '../components/Vente/SaveVente';
import Payer from '../components/Achat/Payer';
function Router(props) {
    return (
        <div>
            <BrowserRouter>
                <div className="py-4">
                    <Routes>
                        <Route path='/' element={<Main />}>
                            <Route index element={<Home />}></Route>
                            <Route path="fournisseurs" element={<Fournisseurs />}></Route>
                            <Route path="clients" element={<Clients />}></Route>
                            <Route path="produits" element={<Produits />}></Route>
                            <Route path="achats" element={<Achats />}></Route>
                            <Route path="save-achat/:id?" element={<SaveAchat />}></Route>
                            <Route path="achats/paiement/:id" element={<Payer />}></Route>
                            <Route path="ventes" element={<Ventes />}></Route>
                            <Route path="save-vente/:id?" element={<SaveVente />}></Route>
                        </Route>
                        <Route path="*" element={<NotFound />}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default Router;