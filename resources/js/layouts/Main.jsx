import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function Main() {
    return (
        <div>

            <div className="wrapper">
                <div>
                    <Header />
                    <Sidebar />

                    <main className="page-content pt-5">
                        <Outlet />
                    </main>
                    <div className="overlay nav-toggle-icon" />
                </div>

            </div>
        </div>
    )
}

export default Main