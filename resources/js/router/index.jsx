import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Home from '../components/Home';
import List from '../components/List';
import NotFound from '../components/NotFound';
import Main from '../layouts/Main';
import Agents from '../components/Agent/Agents';
import Biens from '../components/Bien/Biens';
import ViewBien from '../components/Bien/ViewBien';
import Fournisseurs from '../components/Fournisseur/Fournisseurs';
function Router(props) {
    return (
        <div>
            <BrowserRouter>
                <div className="py-4">
                    <Routes>
                        <Route path='/' element={<Main />}>
                            <Route index element={<Home />}></Route>
                            <Route path="fournisseurs" element={<Fournisseurs />}></Route>
                            <Route path="agents" element={<Agents />}></Route>
                            <Route path="biens" element={<Biens />}></Route>
                            <Route path='biens/:id' element={<ViewBien />} ></Route>
                        </Route>
                        <Route path="*" element={<NotFound />}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default Router;