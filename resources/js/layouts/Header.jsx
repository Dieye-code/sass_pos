import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {

    const navigate = useNavigate();

    const back = function (e) {
        navigate(-1);
    }
    return (
        <div>

            <header className="top-header">
                <nav className="navbar navbar-expand">
                    <div className="mobile-toggle-icon d-xl-none">
                        <i className="bi bi-list" />
                    </div>
                    <div className='btn btn-primary mx-3' onClick={back}><i className='bi bi-chevron-double-left'></i></div>
                    <div className="d-none d-xl-flex ms-auto top-navbar-right ms-3">
                        <ul className="navbar-nav align-items-center">
                            <li className="nav-item dropdown dropdown-large">
                                <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" data-bs-toggle="dropdown">
                                    <div className="user-setting d-flex align-items-center gap-1">
                                        <img src="/assets/images/avatars/avatar-1.png" className="user-img" />
                                        <div className="user-name d-none d-sm-block">{localStorage.getItem("nom" ?? "Sama Caisse" )}</div>
                                    </div>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <div className="d-flex align-items-center">
                                                <img src="/assets/images/avatars/avatar-1.png" className="rounded-circle" width={60} height={60} />
                                                <div className="ms-3">
                                                    <h6 className="mb-0 dropdown-user-name">{localStorage.getItem("nom" ?? "Sama Caisse" )}</h6>
                                                    <small className="mb-0 dropdown-user-designation text-secondary">HR Manager</small>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <a className="dropdown-item" href="pages-user-profile.html">
                                            <div className="d-flex align-items-center">
                                                <div className="setting-icon"><i className="bi bi-person-fill" /></div>
                                                <div className="setting-text ms-3"><span>Profile</span></div>
                                            </div>
                                        </a>
                                    </li>
                                    {/* <li>
                                        <a className="dropdown-item" href="#">
                                            <div className="d-flex align-items-center">
                                                <div className="setting-icon"><i className="bi bi-gear-fill" /></div>
                                                <div className="setting-text ms-3"><span>Setting</span></div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="index2.html">
                                            <div className="d-flex align-items-center">
                                                <div className="setting-icon"><i className="bi bi-speedometer" /></div>
                                                <div className="setting-text ms-3"><span>Dashboard</span></div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <div className="d-flex align-items-center">
                                                <div className="setting-icon"><i className="bi bi-piggy-bank-fill" /></div>
                                                <div className="setting-text ms-3"><span>Earnings</span></div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <div className="d-flex align-items-center">
                                                <div className="setting-icon"><i className="bi bi-cloud-arrow-down-fill" /></div>
                                                <div className="setting-text ms-3"><span>Downloads</span></div>
                                            </div>
                                        </a>
                                    </li> */}
                                    <li><hr className="dropdown-divider" /></li>
                                    <li className='dropdown-item'>
                                        <div className="d-flex align-items-center">
                                            <div className="setting-icon"><i className="bi bi-lock-fill" /></div>
                                            <div className="setting-text ms-3"><Link to={'/logout'}>Logout</Link></div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            {/* <li className="nav-item dropdown dropdown-large d-none d-sm-block">
                                <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" data-bs-toggle="dropdown">
                                    <div className="notifications">
                                        <span className="notify-badge">8</span>
                                        <i className="bi bi-bell-fill" />
                                    </div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end p-0">
                                    <div className="p-2 border-bottom m-2">
                                        <h5 className="h5 mb-0">Notifications</h5>
                                    </div>
                                    <div className="header-notifications-list p-2">
                                        <a className="dropdown-item" href="#">
                                            <div className="d-flex align-items-center">
                                                <div className="notification-box"><i className="bi bi-basket2-fill" /></div>
                                                <div className="ms-3 flex-grow-1">
                                                    <h6 className="mb-0 dropdown-msg-user">New Orders <span className="msg-time float-end text-secondary">1 m</span></h6>
                                                    <small className="mb-0 dropdown-msg-text text-secondary d-flex align-items-center">You have recived new orders</small>
                                                </div>
                                            </div>
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <div className="d-flex align-items-center">
                                                <div className="notification-box"><i className="bi bi-people-fill" /></div>
                                                <div className="ms-3 flex-grow-1">
                                                    <h6 className="mb-0 dropdown-msg-user">New Customers <span className="msg-time float-end text-secondary">7 m</span></h6>
                                                    <small className="mb-0 dropdown-msg-text text-secondary d-flex align-items-center">5 new user registered</small>
                                                </div>
                                            </div>
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <div className="d-flex align-items-center">
                                                <div className="notification-box"><i className="bi bi-file-earmark-bar-graph-fill" /></div>
                                                <div className="ms-3 flex-grow-1">
                                                    <h6 className="mb-0 dropdown-msg-user">24 PDF File <span className="msg-time float-end text-secondary">2 h</span></h6>
                                                    <small className="mb-0 dropdown-msg-text text-secondary d-flex align-items-center">The pdf files generated</small>
                                                </div>
                                            </div>
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <div className="d-flex align-items-center">
                                                <div className="notification-box"><i className="bi bi-collection-play-fill" /></div>
                                                <div className="ms-3 flex-grow-1">
                                                    <h6 className="mb-0 dropdown-msg-user">Time Response  <span className="msg-time float-end text-secondary">3 h</span></h6>
                                                    <small className="mb-0 dropdown-msg-text text-secondary d-flex align-items-center">5.1 min avarage time response</small>
                                                </div>
                                            </div>
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <div className="d-flex align-items-center">
                                                <div className="notification-box"><i className="bi bi-cursor-fill" /></div>
                                                <div className="ms-3 flex-grow-1">
                                                    <h6 className="mb-0 dropdown-msg-user">New Product Approved  <span className="msg-time float-end text-secondary">1 d</span></h6>
                                                    <small className="mb-0 dropdown-msg-text text-secondary d-flex align-items-center">Your new product has approved</small>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="p-2">
                                        <div><hr className="dropdown-divider" /></div>
                                        <a className="dropdown-item" href="#">
                                            <div className="text-center">View All Notifications</div>
                                        </a>
                                    </div>
                                </div>
                            </li> */}
                        </ul>
                    </div>
                </nav>
            </header>

        </div>
    )
}

export default Header