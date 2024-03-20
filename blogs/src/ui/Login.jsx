import React from 'react'
import '../ui/css/Login.css'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <main className="main-content  mt-0">
            <div className="page-header align-items-start min-vh-100" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80")' }}>
                <span className="mask bg-gradient-dark opacity-6" />
                <div className="container my-auto">
                    <div className="row">
                        <div className="col-lg-4 col-md-8 col-12 mx-auto">
                            <div className="card z-index-0 fadeIn3 fadeInBottom">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                                        <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Đăng nhập</h4>
                                        <div className="row mt-3">
                                            <div className="col-2 text-center ms-auto">
                                                <a className="btn btn-link px-3" href="javascript:;">
                                                    <i class="fab fa-facebook-f text-white text-lg"></i>
                                                </a>
                                            </div>
                                            <div className="col-2 text-center px-1">
                                                <a className="btn btn-link px-3" href="javascript:;">
                                                    <i class="fab fa-github text-white text-lg"></i>
                                                </a>
                                            </div>
                                            <div className="col-2 text-center me-auto">
                                                <a className="btn btn-link px-3" href="javascript:;">
                                                    <i class="fab fa-google text-white text-lg"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form role="form" className="text-start">
                                        <div className="input-group input-group-outline my-3">
                                            <label className="form-label">Tài khoản</label>
                                            <input type="email" className="form-control" />
                                        </div>
                                        <div className="input-group input-group-outline mb-3">
                                            <label className="form-label">Mật khẩu</label>
                                            <input type="password" className="form-control" />
                                        </div>
                                        <div className="form-check form-switch d-flex align-items-center mb-3">
                                            <input className="form-check-input" type="checkbox" id="rememberMe" defaultChecked />
                                            <label className="form-check-label mb-0 ms-3" htmlFor="rememberMe">Remember me</label>
                                        </div>
                                        <div className="text-center">
                                            <button type="button" className="btn bg-gradient-primary w-100 my-4 mb-2">Đăng nhập</button>
                                        </div>
                                        <p className="mt-4 text-sm text-center">
                                            Chưa có tài khoản ?
                                            <Link  to={"/logout"} className="text-primary text-gradient font-weight-bold">Đăng ký</Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default Login
