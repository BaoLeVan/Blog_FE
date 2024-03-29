import React, { useEffect, useState } from 'react'
import '../ui/css/Header.css'
import { getAllCategory } from '../service/Category';
import { Link, useLocation } from 'react-router-dom';
import { checkCount } from '../service/Favorite';
import { getCountCart, getListCart } from '../service/Cart';
import { getUserById } from '../service/User';
import swal from 'sweetalert';
import { getPayment } from '../service/Payment';
import MySwal from "sweetalert2";



const Header = (props) => {
  const [category, setCategory] = useState();
  const [idUser, setIdUser] = useState(3);
  const [count, setCount] = useState();
  const [countC, setCountC] = useState();
  const { handleId, countFavorite, countCart, countCartNew, check } = props;
  const [test, setTest] = useState();
  const [user, setUser] = useState();
  const [status, setStatus] = useState(false);
  const [checkPayment, setCheckPayment] = useState(false);
  const price = 500000;

  const onHandlePayment = () => {
    MySwal.fire({
      title: 'Thông tin Vip',
      html: `
        <div class="d-flex justify-content-center">
          <div class="card2">
            <p class="heading">
              Vé Vip
            </p>
            <p>
              + Có thể đăng blog riêng cho bạn
            </p>
            <p id="buyButton">Mua</p>
          </div>
        </div>`
      
    });
  
    document.getElementById('buyButton').onclick = onHandlePay;
  }
  
  const onHandlePay = () => {
    console.log(idUser);
    getPayment(idUser, price).then(res => {
      window.location.href = res;
    });
  }

useEffect(() => {
  console.log(idUser);
  if (idUser) {
    getUserById(idUser).then(res => {
      setUser(res);
    })
  }
}, [idUser])

useEffect(() => {
  if (user) {
    setStatus(user.status);
    setCheckPayment(check)
  }
  if (checkPayment == true) {
    swal({
      title: "Thanh Toán Thành Công",
      text: "Chúc bạn 1 ngày mới tốt lành",
      button: {
        text: "OK",
      },
    });
  }
}, [user])

useEffect(() => {
  getListCart(idUser).then(res => {
    setTest(res)
  })
}, [test])

useEffect(() => {
  setCount(countFavorite);
}, [countFavorite])

useEffect(() => {
  setCountC(countCart)
}, [countCart])

useEffect(() => {
  setCountC(countCartNew)
}, [countCartNew])

useEffect(() => {
  handleId(idUser)
}, [idUser])

useEffect(() => {
  getAllCategory().then(res => {
    setCategory(res)
  })
}, [])

useEffect(() => {
  checkCount(idUser).then(res => {
    setCount(res)
  })
  getCountCart(idUser).then(res => {
    setCountC(res)
  })
}, [idUser, test])
if (!category) return null
return (
  <>
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <div className="container">
        <Link className="navbar-brand" to={"/"}><img src="https://firebasestorage.googleapis.com/v0/b/newfirebase-1fe01.appspot.com/o/images%2Flogo.png?alt=media&token=d4fb7cd9-e2c0-46b8-be91-b2fe7699c5d9" alt="..." /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i className="fas fa-bars ms-1" />
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
            {
              status ?
                <></> :
                <li className="nav-item">
                  <div onClick={onHandlePayment} class="tooltip-container">
                    <span class="text-1">Mua Vip 👆</span>
                    <span >Click! 👋</span>
                  </div>
                </li>
            }
            <li className="nav-item"><Link to={"/product"} style={{ color: 'black', fontSize: '15px', fontWeight: '600' }} className="nav-link" href="#about">Công nghệ</Link></li>
            <li className="nav-item"><Link to={"/cart"} style={{ color: 'black', fontSize: '15px', fontWeight: '600' }} className="nav-link" >
              <i style={{ position: 'relative' }} class="fas fa-shopping-cart">
                <div style={{ position: 'absolute', top: '-55%', transform: 'translateX(220%)' }}>{countC}</div>
              </i>
            </Link></li>
            <li className="nav-item"><Link to={"/favorite"} style={{ color: 'black', fontSize: '15px', fontWeight: '600' }} className="nav-link" ><i style={{ position: 'relative' }} class="fas fa-star">
              <div style={{ position: 'absolute', top: '-55%', transform: 'translateX(220%)' }}>{count}</div>
            </i></Link></li>
            <li className="nav-item"><a style={{ color: 'black', fontSize: '15px', fontWeight: '600' }} className="nav-link" href="#about">About Us</a></li>
            <li className="nav-item"><a style={{ color: 'black', fontSize: '15px', fontWeight: '600' }} className="nav-link" href="#about">Chủ Đề</a></li>
            <li className="nav-item"><Link to={"/login"} style={{ color: 'black', fontSize: '15px', fontWeight: '600' }} className="nav-link" href="#contact">Đăng Nhập</Link>
            </li>
            <li className="nav-item">
              <div style={{ height: '0px' }} class="dropdown">
                <span style={{ padding: '4px' }} class="btn" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fas fa-caret-down"></i>
                </span>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><Link class="dropdown-item" to={'/profile'}>Thông tin </Link></li>
                  <li><a class="dropdown-item" href="#">Đăng xuất</a></li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <div style={{ height: '0px' }} class="dropdown">
                <span style={{ padding: '4px' }} class="btn" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fas fa-caret-down"></i>
                </span>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><Link class="dropdown-item" to={'/manageBlog'}>Quản lý</Link></li>
                  <li><a class="dropdown-item" href="#">Đăng xuất</a></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>
)
}

export default Header
