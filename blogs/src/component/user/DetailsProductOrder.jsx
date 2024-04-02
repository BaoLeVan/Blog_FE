import React, { useEffect, useState } from 'react'
import '../../ui/css/Profile.css'
import Header from '../../ui/Header'
import Footer from '../../ui/Footer'
import { getProductHistory, getUserById } from '../../service/User'
import { Link } from 'react-router-dom'

const DetailsProductOrder = () => {
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
                                    <tbody>
                                        {
                                            listProduct.map(value => (
                                                <tr>
                                                    <td className="shoping__cart__item">
                                                        <img style={{ height: '86px', width: '125px' }} src={value.imageProduct} alt />
                                                        <h5>{value.nameProduct}</h5>
                                                    </td>
                                                    <td className="shoping__cart__price">
                                                        {formatNumber(value.price)}đ
                                                    </td>
                                                    <td className="shoping__cart__quantity">
                                                        <div className="quantity">
                                                            {
                                                                value.quantity > 1 ?
                                                                    <button onClick={() => onMinusQuanity(value)} class="button--minus ">
                                                                        -
                                                                    </button> : <span></span>
                                                            }
                                                            <div className="pro-qty">
                                                                <input type="text" value={value.quantity} />
                                                            </div>
                                                            <button onClick={() => onAddQuanity(value)} class="button--add ">
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="shoping__cart__total">
                                                        {formatNumber(value.price * value.quantity)}đ
                                                    </td>
                                                    <td className="shoping__cart__item__close">
                                                        <span onClick={() => onHandleDeleteProduct(value)} className="icon_close" ><i class="fas fa-times-circle"></i></span>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
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

export default DetailsProductOrder
