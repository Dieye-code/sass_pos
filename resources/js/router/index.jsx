import React from 'react';
import { Routes, BrowserRouter, Route, createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
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
import PaiementVente from '../components/Vente/PaiementVente';
import DetailClient from '../components/Client/DetailClient';
import DetailFournisseur from '../components/Fournisseur/DetailFournisseur';
import Dettes from '../components/Achat/Dettes';
import Creances from '../components/Vente/Creances';
import Facture from '../components/Vente/Facture';
import { useAuth } from '../components/Auth/AuthProvider';
import Login from '../components/Auth/Login';
import File from '../components/Auth/File';
import Register from '../components/Auth/Register';
import Logout from '../components/Auth/Logout';
import Rapports from '../components/Rapport/Rapports';
import Abonnements from '../components/Abonnement/Abonnements';
import Dashboard from '../components/Dashboard';
import ChangePassword from '../components/Auth/ChangePassword';
import NewAbonnement from '../components/Abonnement/NewAbonnement';
import Depenses from '../components/Depense/Depenses';

function Router(props) {


    const { token } = useAuth();
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <Main />, // Wrap the component in ProtectedRoute
            children: [
                { path: "/", element: <Home />, },
                { path: "/dashboard", element: <Dashboard />, },
                { path: "/fournisseurs", element: <Fournisseurs /> },
                { path: "/fournisseurs/:id/details", element: <DetailFournisseur /> },
                { path: "/clients", element: <Clients /> },
                { path: "/clients/:id/details", element: <DetailClient /> },
                { path: "/produits", element: <Produits /> },
                { path: "/achats", element: <Achats /> },
                { path: "/achats/:id/details", element: <Payer /> },
                { path: "/save-achat/:id?", element: <SaveAchat /> },
                { path: "/ventes", element: <Ventes /> },
                { path: "/save-vente/:id?", element: <SaveVente /> },
                { path: "/depenses", element: <Depenses /> },
                { path: "/ventes/:id/details", element: <PaiementVente /> },
                { path: "/liste-dette", element: <Dettes /> },
                { path: "/liste-creance", element: <Creances /> },
                { path: "/ventes/:id/facture", element: <Facture /> },
                {
                    path: "/rapports",
                    element: <Rapports />,
                },
                {
                    path: "/abonnements",
                    element: <Abonnements />,
                },
                {
                    path: "/new-abonnement",
                    element: <NewAbonnement />,
                },
                // {
                //     path: "/change-code",
                //     element: <ChangePassword />,
                // },
                {
                    path: "/logout",
                    element: <Logout />,
                },
                {
                    path: "/*",
                    element: <NotFound />
                }
            ],
        },
    ];
    const routesForNotAuthenticatedOnly = [
        {
            path: "/",
            element: <File />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
    ];

    const router = createBrowserRouter([
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);
    return <RouterProvider router={router} />;
    // return (
    //     <div>
    //         <BrowserRouter>
    //             <div className="py-4">
    //                 <Routes>
    //                     <Route path='/' element={<Main />}>
    //                         <Route index element={<Home />}></Route>
    //                         <Route path="fournisseurs" element={<Fournisseurs />}></Route>
    //                         <Route path="fournisseurs/:id/details" element={<DetailFournisseur />}></Route>
    //                         <Route path="clients" element={<Clients />}></Route>
    //                         <Route path="clients/:id/details" element={<DetailClient />}></Route>
    //                         <Route path="produits" element={<Produits />}></Route>
    //                         <Route path="achats" element={<Achats />}></Route>
    //                         <Route path="achats/:id/details" element={<Payer />}></Route>
    //                         <Route path="save-achat/:id?" element={<SaveAchat />}></Route>
    //                         <Route path="ventes" element={<Ventes />}></Route>
    //                         <Route path="save-vente/:id?" element={<SaveVente />}></Route>
    //                         <Route path="ventes/:id/details" element={<PaiementVente />}></Route>
    //                         <Route path="liste-dette" element={<Dettes />}></Route>
    //                         <Route path="liste-creance" element={<Creances />}></Route>
    //                         <Route path="ventes/:id/facture" element={<Facture />}></Route>
    //                     </Route>
    //                     <Route path="*" element={<NotFound />}></Route>
    //                 </Routes>
    //             </div>
    //         </BrowserRouter>
    //     </div>
    // );
}

export default Router;