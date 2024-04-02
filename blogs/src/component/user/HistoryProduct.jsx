import React, { useEffect, useState } from 'react'
import '../../ui/css/Profile.css'
import Header from '../../ui/Header'
import Footer from '../../ui/Footer'
import { getProductHistory, getUserById } from '../../service/User'
import { Link } from 'react-router-dom'

const HistoryProduct = () => {
    const [idUser, setIdUser] = useState();
    const [user, setUser] = useState();
    const [status, setStatus] = useState(false);
    const [history, setHistory] = useState();
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false)

    const handleId = (id) => {
        setIdUser(id);
    }

    useEffect(() => {
        if (idUser) {
            getUserById(idUser).then(res => {
                setUser(res);
            })
        }
        if (user) {
            setStatus(user.status)
        }
    }, [idUser, user])

    useEffect(() => {
        if (idUser) {
            setLoading(true)
            getProductHistory(page, idUser).then(res => {
                console.log(res);
                setLoading(false)
                setHistory(prev => prev ? [...prev, ...res.content] : [...res.content]);
                setTotalPages(res.totalPages)
            })
        }
    }, [page, idUser])

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    if (!user || !history) return <>
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
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Sản Phẩm</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Tiền</th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Trạng thái</th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Ngày mua</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                history.map(value => (
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex px-2 py-1">
                                                                <div>
                                                                    <img src={value.imageProduct} className="avatar avatar-sm me-3 border-radius-lg" alt="user1" />
                                                                </div>
                                                                <div className="d-flex flex-column justify-content-center">
                                                                    <h6 className="mb-0 text-sm">{value.nameProduct}</h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <p className="text-xs font-weight-bold mb-0">{formatNumber(value.cartQuantity * value.priceProduct)}đ</p>
                                                        </td>
                                                        <td className="align-middle text-center text-sm">
                                                            <span className="badge badge-sm bg-gradient-success">Đã thanh toán</span>
                                                        </td>
                                                        <td className="align-middle text-center">
                                                            <span className="text-secondary text-xs font-weight-bold">23/04/18</span>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    {
                                        page < totalPages && (
                                            <div className='row d-flex justify-content-center mt-4'>
                                                <a style={{
                                                    fontSize: '9px', borderTop: " #62bdfc 0.5px solid",
                                                    color: "black",
                                                    padding: " 0 7px",
                                                    fontSize: "10px",textAlign:'center'
                                                }} className="col-2 primary-btn load-more mt-60" onClick={() => setPage(page + 1)} >{loading ? "Loading...." : "Show more"}</a>
                                            </div>
                                        )
                                    }
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

export default HistoryProduct
