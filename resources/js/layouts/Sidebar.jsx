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
                        <Link to="/agents"><i className="bi bi-people-fill" /> Agents</Link>
                        <Link to="/biens"><i className="bi bi-house" /> Biens</Link>
                    </li>
                    <li>
                        <a href="#" className="has-arrow">
                            <div className="parent-icon"><i className="bi bi-house-door"></i>
                            </div>
                            <div className="menu-title">Dashboard</div>
                        </a>
                        <ul>
                            <li> <a href="index.html"><i className="bi bi-arrow-right-short"></i>eCommerce</a>
                            </li>
                            <li> <a href="index2.html"><i className="bi bi-arrow-right-short"></i>Sales</a>
                            </li>
                            <li> <a href="index3.html"><i className="bi bi-arrow-right-short"></i>Analytics</a>
                            </li>
                            <li> <a href="index4.html"><i className="bi bi-arrow-right-short"></i>Project Management</a>
                            </li>
                            <li> <a href="index5.html"><i className="bi bi-arrow-right-short"></i>CMS Dashboard</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="has-arrow">
                            <div className="parent-icon"><i className="bi bi-grid"></i>
                            </div>
                            <div className="menu-title">Application</div>
                        </a>
                        <ul>
                            <li> <a href="app-emailbox.html"><i className="bi bi-arrow-right-short"></i>Email</a>
                            </li>
                            <li> <a href="app-chat-box.html"><i className="bi bi-arrow-right-short"></i>Chat Box</a>
                            </li>
                            <li> <a href="app-file-manager.html"><i className="bi bi-arrow-right-short"></i>File Manager</a>
                            </li>
                            <li> <a href="app-to-do.html"><i className="bi bi-arrow-right-short"></i>Todo List</a>
                            </li>
                            <li> <a href="app-invoice.html"><i className="bi bi-arrow-right-short"></i>Invoice</a>
                            </li>
                            <li> <a href="app-fullcalender.html"><i className="bi bi-arrow-right-short"></i>Calendar</a>
                            </li>
                        </ul>
                    </li>
                    <li className="menu-label">UI Elements</li>
                    <li>
                        <a href="#" className="has-arrow">
                            <div className="parent-icon"><i className="bi bi-award"></i>
                            </div>
                            <div className="menu-title">Widgets</div>
                        </a>
                        <ul>
                            <li> <a href="widgets-static-widgets.html"><i className="bi bi-arrow-right-short"></i>Static Widgets</a>
                            </li>
                            <li> <a href="widgets-data-widgets.html"><i className="bi bi-arrow-right-short"></i>Data Widgets</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="has-arrow">
                            <div className="parent-icon"><i className="bi bi-bag-check"></i>
                            </div>
                            <div className="menu-title">eCommerce</div>
                        </a>
                        <ul>
                            <li> <a href="ecommerce-products-list.html"><i className="bi bi-arrow-right-short"></i>Products List</a>
                            </li>
                            <li> <a href="ecommerce-products-grid.html"><i className="bi bi-arrow-right-short"></i>Products Grid</a>
                            </li>
                            <li> <a href="ecommerce-products-categories.html"><i className="bi bi-arrow-right-short"></i>Categories</a>
                            </li>
                            <li> <a href="ecommerce-orders.html"><i className="bi bi-arrow-right-short"></i>Orders</a>
                            </li>
                            <li> <a href="ecommerce-orders-detail.html"><i className="bi bi-arrow-right-short"></i>Order details</a>
                            </li>
                            <li> <a href="ecommerce-add-new-product.html"><i className="bi bi-arrow-right-short"></i>Add New Product</a>
                            </li>
                            <li> <a href="ecommerce-add-new-product-2.html"><i className="bi bi-arrow-right-short"></i>Add New Product 2</a>
                            </li>
                            <li> <a href="ecommerce-transactions.html"><i className="bi bi-arrow-right-short"></i>Transactions</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a className="has-arrow" href="#">
                            <div className="parent-icon"><i className="bi bi-cloud-arrow-down"></i>
                            </div>
                            <div className="menu-title">Icons</div>
                        </a>
                        <ul>
                            <li> <a href="icons-line-icons.html"><i className="bi bi-arrow-right-short"></i>Line Icons</a>
                            </li>
                            <li> <a href="icons-boxicons.html"><i className="bi bi-arrow-right-short"></i>Boxicons</a>
                            </li>
                            <li> <a href="icons-feather-icons.html"><i className="bi bi-arrow-right-short"></i>Feather Icons</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </aside>

        </div>
    )
}

export default Sidebar