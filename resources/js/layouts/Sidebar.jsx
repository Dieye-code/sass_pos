import React from 'react'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';

function Sidebar() {

    const decoded = jwtDecode(localStorage.getItem("token" ?? ""));
    return (
        <div>
            <aside className="sidebar-wrapper" data-simplebar="true">
                <div className="sidebar-header">
                    <div>
                        <img src="/assets/images/logo-80x80.png" className="logo-icon" alt="logo icon" />
                    </div>
                    <div>
                        <h4 className="logo-text">{localStorage.getItem("abonnement_nom" ?? "Sama Caisse") ?? "Sama Caisse"}</h4>


                    </div>
                    <div className="toggle-icon ms-auto">
                        <i className="bi bi-chevron-double-left"></i>
                    </div>
                </div>
                <ul className="metismenu" id="menu">
                    {decoded.role == 'super admin' ?
                        <>
                            <li>
                                <Link to="/dashboard"><i className="bi bi-house-fill ml-sb" /> Home</Link>
                            </li>
                            <li>
                                <Link to="/type-abonnements"><i className="bi bi-house ml-sb" />Type Abonnements</Link>
                            </li>
                            <li>
                                <Link to="/abonnements"><i className="bi bi-people-fill ml-sb" /> Abonnements</Link>
                            </li>
                        </>
                        :
                        <>
                            <li>
                                <Link to="/"><i className="bi bi-house-fill ml-sb" /> Home</Link>
                            </li>
                            {decoded.role == 'admin' ?
                                <>
                                    <li>
                                        <Link to="/fournisseurs"><i className="bi bi-people-fill ml-sb" /> Fournisseurs</Link>
                                    </li>
                                    <li>
                                        <Link to="/clients"><i className="bi bi-people-fill ml-sb" /> Clients</Link>
                                    </li>
                                    <li>
                                        <Link to="/produits"><i className="bi bi-diagram-3-fill ml-sb" /> Produits</Link>
                                    </li>
                                </>
                                : <></>}
                            <li>
                                <Link to="/achats"><i className="bi bi-minecart-loaded ml-sb" /> Achats</Link>
                            </li>
                            <li>
                                <Link to="/ventes"><i className="bi bi-cart-check-fill ml-sb" /> Ventes</Link>
                            </li>
                            {decoded.role == 'admin' ?
                                <li>
                                    <Link to="/depenses"><i className="bi bi-cash-coin ml-sb" /> <span className='ml-1' >Depenses</span></Link>
                                </li>
                                : <></>}
                            <li>
                                <Link to="/rapports"><i className="bi bi-receipt-cutoff ml-sb" /> Rapports</Link>
                            </li>
                            {decoded.role == 'admin' ?
                                <li>
                                    <Link to="/users"><i className="ml-sb bi bi-people-fill" /> Utilisateurs</Link>
                                </li>
                                : <></>}
                        </>
                    }
                    <li>
                        <Link to="/logout"><i className="bi bi-lock-fill ml-sb" /> Logout</Link>
                    </li>


                </ul>
            </aside>

        </div>
    )
}

export default Sidebar