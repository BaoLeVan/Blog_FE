import React from 'react'
import '../ui/css/databoard.css'
import logout from '../illustration-signup.jpg'

const Logout = () => {
    return (
        <main className="main-content  mt-0">
            <section>
                <div className="page-header min-vh-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                                <div className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                                 style={{ backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/newfirebase-1fe01.appspot.com/o/images%2Fillustration-signup.jpg?alt=media&token=fad57f60-043f-4b79-b865-fbc408775b33")', backgroundSize: 'cover' }}>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                                <div className="card card-plain">
                                    <div className="card-header">
                                        <h4 className="font-weight-bolder">Đăng ký</h4>
                                        <p className="mb-0">Nhập thông tin để đăng nhập</p>
                                    </div>
                                    <div className="card-body">
                                        <form role="form">
                                            <div className="input-group input-group-outline mb-3">
                                                <label className="form-label">Tài khoản</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="input-group input-group-outline mb-3">
                                                <label className="form-label">Tên</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="input-group input-group-outline mb-3">
                                                <label className="form-label">Số điện thoại</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="input-group input-group-outline mb-3">
                                                <label className="form-label">Email</label>
                                                <input type="email" className="form-control" />
                                            </div>
                                            <div className="input-group input-group-outline mb-3">
                                                <label className="form-label">Mật Khẩu</label>
                                                <input type="password" className="form-control" />
                                            </div>
                                        
                                            <div className="text-center">
                                                <button type="button" className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0">Đăng Ký</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                        <p className="mb-2 text-sm mx-auto">
                                            Bạn đã có tài khoản?
                                            <a href="../pages/sign-in.html" className="text-primary text-gradient font-weight-bold">Đăng Nhập</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    )
}

export default Logout
