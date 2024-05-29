import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <div>


            <aside className="sidebar-wrapper" data-simplebar="true">
                <div className="sidebar-header">
                    <div>
                        <img src="/assets/images/logo-icon.png" className="logo-icon" alt="logo icon" />
                    </div>
                    <div>
                        <h4 className="logo-text">Skodash</h4>
                    </div>
                    <div className="toggle-icon ms-auto"><i className="bi bi-chevron-double-left"></i>
                    </div>
                </div>
                <ul className="metismenu" id="menu">

                    <li>
                        <Link to="/"><i className="bi bi-house-fill" /> Home</Link>
                    </li>
                    <li>
                        <Link to="/fournisseurs"><i className="bi bi-people-fill" /> Fournisseurs</Link>
                    </li>
                    <li>
                        <Link to="/client"><i className="bi bi-people-fill" /> Clients</Link>
                    </li>
                    <li>
                        <Link to="/produits"><i className="bi bi-diagram-3-fill" /> Produits</Link>
                    </li>
                    <li>
                        <Link to="/achats"><i className="bi bi-minecart-loaded" /> Achats</Link>
                    </li>
                    <li>
                        <Link to="/ventes"><i className="bi bi-cart-check-fill" /> Ventes</Link>
                    </li>
                    <li>
                        <Link to="/rapports"><i className="bi bi-receipt-cutoff" /> Rapports</Link>
                    </li>
                </ul>
            </aside>

        </div>
    )
}

export default Sidebar