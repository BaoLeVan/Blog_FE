import React from 'react'
import '../ui/css/databoard.css'
const SideBar = () => {
    return (
        <>
            <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
                <div className="sidenav-header">
                    <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
                    <a className="navbar-brand m-0" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">
                        <span className="ms-1 font-weight-bold text-white">Dashboard </span>
                    </a>
                </div>
                <hr className="horizontal light mt-0 mb-2" />
                <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link text-white " href="../pages/dashboard.html">
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">dashboard</i>
                                </div>
                                <span className="nav-link-text ms-1">Chart</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white " href="../pages/tables.html">
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">table_view</i>
                                </div>
                                <span className="nav-link-text ms-1">Add Blog</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white " href="../pages/billing.html">
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">receipt_long</i>
                                </div>
                                <span className="nav-link-text ms-1">Edit Blog</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white " href="../pages/virtual-reality.html">
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">view_in_ar</i>
                                </div>
                                <span className="nav-link-text ms-1">Manage Blog</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white " href="../pages/rtl.html">
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">format_textdirection_r_to_l</i>
                                </div>
                                <span className="nav-link-text ms-1">RTL</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white " href="../pages/notifications.html">
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">notifications</i>
                                </div>
                                <span className="nav-link-text ms-1">Notifications</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="sidenav-footer position-absolute w-100 bottom-0 ">
                    <div className="mx-3">
                        <a className="btn bg-gradient-primary w-100" href="https://www.creative-tim.com/product/material-dashboard-pro?ref=sidebarfree" type="button">Logout</a>
                    </div>
                </div>
            </aside>

        </>
    )
}

export default SideBar
