import React, { useEffect, useState } from 'react'
import '../../ui/css/DetailsProduct.css'
import Header from '../../ui/Header'
import Footer from '../../ui/Footer'
import { add, deleteCart, getListCart, getPaymentCart, getTotalPrice, minus } from '../../service/Cart'
import MySwal from "sweetalert2";

const Cart = () => {
  const [idUser, setIdUser] = useState(localStorage.getItem('idUser')|| "");
  const [listProduct, setListProduct] = useState();
  const [total, setTotal] = useState(0)
  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  useEffect(() => {
    if (idUser) {
      getListCart(idUser).then(res => {
        setListProduct(res)
      })
      getTotalPrice(idUser).then(res => {
        setTotal(res)
      })
    }
  }, [idUser, listProduct, total])

  const handleId = (id) => {
    setIdUser(id);
  }

  const onMinusQuanity = (value) => {
    console.log(value.id);
    minus(value.id, idUser)
  }

  const onAddQuanity = (value) => {
    add(value.id, idUser)
  }

  const onHandlePayment = () => {
    getPaymentCart(idUser, total).then(res => {
      window.location.href = res
    })
  }

  const onHandleDeleteProduct = async (e) => {
    MySwal.fire({
      title: "Xóa Blog",
      text: `Bạn muốn xóa blog ${e.nameProduct} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy bỏ",
    }).then(async (res) => {
      if (res.isConfirmed) {
        await deleteCart(e.id, idUser);
        MySwal.fire(
          "Xóa thành công!",
          `${e.nameProduct} đã được xóa.`,
          "success"
        );
      }
    });
  };

  if (!listProduct) return <>
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
      <div style={{ marginTop: '100px' }}>
        {/* Breadcrumb Section Begin */}
        <section className="breadcrumb-section set-bg" >
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="breadcrumb__text">
                  <h2>Shopping Cart</h2>
                  <div className="breadcrumb__option">
                    <a href="./index.html">Home</a>
                    <span>Shopping Cart</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Breadcrumb Section End */}
        {/* Shoping Cart Section Begin */}
        <section className="shoping-cart spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="shoping__cart__table">
                  <table>
                    <thead>
                      <tr>
                        <th className="shoping__product">Sản phẩm</th>
                        <th>Giá tiền</th>
                        <th>Số lượng</th>
                        <th>Tổng</th>
                        <th />
                      </tr>
                    </thead>
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
                  </table>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
              </div>
              <div className="col-lg-6">
                <div className="shoping__checkout">
                  <h5>Tổng Tiền Giỏ Hàng</h5>
                  <ul>
                    <li>Tổng <span>{formatNumber(total)}đ</span></li>
                  </ul>
                  <div className='row'>
                    <div className='col-8'></div>
                    <a style={{ width: '25%', fontSize: '11px', padding: '0', color: 'white' }} onClick={() => onHandlePayment()} className="primary-btn col-lg-3 col-3 ml-30">Thanh Toán</a>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Cart
