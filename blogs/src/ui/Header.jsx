import React, { useEffect, useState } from 'react'
import '../ui/css/Header.css'
import { getAllCategory } from '../service/Category';
import { Link } from 'react-router-dom';



const Header = () => {
  const [category, setCategory] = useState();
  useEffect(() => {
    getAllCategory().then(res => {
      setCategory(res)
    })
  }, [])
  console.log(category);
  if (!category) return <div>Loading...</div>
  return (
    <>
      {/* <header className="default-header">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <a className="navbar-brand">
              <img src="https://firebasestorage.googleapis.com/v0/b/newfirebase-1fe01.appspot.com/o/images%2Flogo.png?alt=media&token=d4fb7cd9-e2c0-46b8-be91-b2fe7699c5d9" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse justify-content-end align-items-center" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li><Link to={"/"}>Home</Link></li>
                <li className="dropdown">
                  <a className="dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                    Category
                  </a>
                  <div className="dropdown-menu">
                    {
                    category.map(value => (
                      <a className="dropdown-item" href="single.html">{value.typeCategory}</a>
                    ))
                    }
                  </div>
                </li>
                <li><Link to={"/login"}>Đăng nhập</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </header> */}


      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
        <div className="container">
          <a className="navbar-brand" href="#page-top"><img src="https://firebasestorage.googleapis.com/v0/b/newfirebase-1fe01.appspot.com/o/images%2Flogo.png?alt=media&token=d4fb7cd9-e2c0-46b8-be91-b2fe7699c5d9" alt="..." /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="fas fa-bars ms-1" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
              <li className="nav-item"><a style={{color:'black',fontSize:'15px',fontWeight:'600'}} className="nav-link" href="#about">About Us</a></li>
              <li className="nav-item"><a style={{color:'black',fontSize:'15px',fontWeight:'600'}} className="nav-link" href="#contact">Đăng Nhập</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
