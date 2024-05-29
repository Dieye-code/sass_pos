import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Home from '../components/Home';
import NotFound from '../components/NotFound';
import Main from '../layouts/Main';
import Fournisseurs from '../components/Fournisseur/Fournisseurs';
import Clients from '../components/Client/Clients';
import Produits from '../components/Produit/Produits';
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
                            <Route path="fournisseurs" element={<Fournisseurs />}></Route>
                            <Route path="fournisseurs" element={<Fournisseurs />}></Route>
                        </Route>
                        <Route path="*" element={<NotFound />}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default Router;