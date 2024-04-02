import React, { useEffect, useState } from 'react'
import '../../ui/css/Profile.css'
import Header from '../../ui/Header'
import Footer from '../../ui/Footer'
import { getBlogByUserId, getUserById } from '../../service/User'
import { Link } from 'react-router-dom'

const Profile = () => {
    const [idUser, setIdUser] = useState();
    const [user, setUser] = useState();
    const [blog, setBlog] = useState();
    const [status, setStatus] = useState(false);
    const handleId = (id) => {
        setIdUser(id);
    }

    useEffect(() => {
        if (idUser) {
            getUserById(idUser).then(res => {
                setUser(res);
            })
            getBlogByUserId(0, idUser).then(res => {
                setBlog(res.content);
            })
        }
        if (user) {
            setStatus(user.status)
        }
    }, [idUser,user])


    if (!user || !blog) return <>
        <Header handleId={handleId} />
        <div className="main">
            <div className="mario_bin"></div>
            <div className="mario_run">
                <div className="mario_run1"></div>
            </div>
            <div className="walls">
                <div className="wall"></div>
                <div className="wall"></div>
                <div className="wall"></div>
                <div className="wall"></div>
                <div className="wall"></div>
                <div className="wall"></div>
                <div className="wall"></div>
                <div className="wall"></div>
                <div className="wall"></div>
                <div className="wall"></div>
            </div>
            <div className="text"></div>
        </div>
    </>

    return (
        <>
            <Header handleId={handleId} />
            <div className="container mt-7">
                <div className="main-body">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src={user.image} alt="Admin" className="rounded-circle p-1 bg-primary" width={110} />
                                        <div className="mt-3">
                                            <h4>{user.name}</h4>
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0"><i style={{ color: '#344767', padding: '0 10px 0 5px' }} class="fas fa-key"></i>Đổi mật khẩu</h6>
                                        </li>
                                        {
                                            status ? 
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <Link to={"/user/addBlog"}>
                                                    <h6 className="mb-0"><i style={{ color: '#344767', padding: '0 13px 0 5px' }} class="fas fa-bookmark"></i>Đăng blog</h6>
                                                </Link>
                                            </li> : <></>
                                        }
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <Link to={"/historyProduct"}>
                                                <h6 className="mb-0"><i style={{ color: '#344767', padding: '0 10px 0 5px' }} class="fas fa-history"></i>Lịch sử mua hàng</h6>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row mb-3">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <h6 className="mb-0">Tên:</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input type="text" className="form-control pl-2" value={user.name} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <h6 className="mb-0 ">Email:</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input type="text" className="form-control pl-2" value={user.email} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <h6 className="mb-0">Số điện thoại:</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input type="text" className="form-control pl-2" value={user.number} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <h6 className="mb-0">Địa chỉ:</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input type="text" className="form-control pl-2" value={user.address} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="d-flex align-items-center mb-3">Blog của bạn</h5>
                                            {
                                                blog.map(value => (
                                                    <>
                                                        <p key={value.id} >{value.title}</p>
                                                        <div className="progress mb-3" style={{ height: 5 }}>
                                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '80%' }} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} />
                                                        </div>
                                                    </>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Profile
