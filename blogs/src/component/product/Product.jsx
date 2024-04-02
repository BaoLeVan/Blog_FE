import React, { useEffect, useRef, useState } from 'react'
import Header from '../../ui/Header';
import Footer from '../../ui/Footer';
import '../../ui/css/Product.css'
import { getAllProduct, getBlogForProduct } from '../../service/Product';
import { Link, useLocation } from 'react-router-dom';
import swal from 'sweetalert';
import { addToCart, getCountCart } from '../../service/Cart'
import MySwal from "sweetalert2";
import { format } from 'date-fns';

const Product = () => {
    const [idUser, setIdUser] = useState();
    const [products, setProducts] = useState();
    const location = useLocation();
    const data = location.state?.data || [];
    const [checkPayment, setCheckPayment] = useState(data || "");
    const [countCartNew, setCountCartNew] = useState();
    const [blog, setBlog] = useState();



    useEffect(() => {
        getAllProduct(0).then(res => {
            console.log(res);
            setProducts(res.content);
        })
        if (checkPayment == true) {
            swal({
                title: "Thành Công",
                text: "Chúc bạn 1 ngày mới tốt lành",
                button: {
                    text: "OK",
                },
            });
        }
    }, [])
    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const handleId = (id) => {
        setIdUser(id);
    }

    useEffect(() => {
        getBlogForProduct().then(res => {
            setBlog(res)
        })
    }, [])

    const onHandleAddProduct = (e) => {
        addToCart(e.id, idUser).then(res => {
            MySwal.fire({
                title: "Đặt thành công",
                text: `${e.nameProduct}` + "đã vào giỏ hàng",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Đồng ý",
            })
        }).then(() => {
            getCountCart(idUser).then(res => {
                console.log(res);
                setCountCartNew(res)
            })
        })
    }

    if (!products || !blog) return (
        <div class="main">
            <div class="mario_bin"></div>
            <div class="mario_run">
                <div class="mario_run1"></div>
            </div>
            <div class="walls">
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
            </div>
            <div class="text"></div>
        </div>
    )
    return (
        <>
            <Header handleId={handleId} countCartNew={countCartNew} />
            <>
                <div className="header_section">
                    <div className="banner_section layout_padding">
                        <div className="container">
                            <div id="banner_slider" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="banner_img"><img src="images/banner-img.png" /></div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="banner_taital_main">
                                                    <h1 className="banner_taital">Công Nghệ</h1>
                                                    <h5 className="tasty_text">Khám phá thế giới công nghệ</h5>
                                                    <p className="banner_text">Công nghệ đã trở thành một phần không thể tách rời trong cuộc sống hàng ngày của chúng ta.</p>
                                                    <div className="btn_main">
                                                        <div className="about_bt"><a href="#">About Us</a></div>
                                                        <div className="callnow_bt active"><a href="#">Call Now</a></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="banner_img"><img src="images/banner-img.png" /></div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="banner_taital_main">
                                                    <h1 className="banner_taital">coffee</h1>
                                                    <h5 className="tasty_text">Tasty Of DozeCafe</h5>
                                                    <p className="banner_text">more-or-less normal distribution of letters, as opposed to using </p>
                                                    <div className="btn_main">
                                                        <div className="about_bt"><a href="#">About Us</a></div>
                                                        <div className="callnow_bt active"><a href="#">Call Now</a></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="banner_img"><img src="images/banner-img.png" /></div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="banner_taital_main">
                                                    <h1 className="banner_taital">coffee</h1>
                                                    <h5 className="tasty_text">Tasty Of DozeCafe</h5>
                                                    <p className="banner_text">more-or-less normal distribution of letters, as opposed to using </p>
                                                    <div className="btn_main">
                                                        <div className="about_bt"><a href="#">About Us</a></div>
                                                        <div className="callnow_bt active"><a href="#">Call Now</a></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a className="carousel-control-prev" href="#banner_slider" role="button" data-slide="prev">
                                    <i className="fa fa-arrow-left" />
                                </a>
                                <a className="carousel-control-next" href="#banner_slider" role="button" data-slide="next">
                                    <i className="fa fa-arrow-right" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="related-product">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title related__product__title">
                                    <h2>Sản Phẩm</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {products.map(value => (
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <div className="product__item">
                                        <div className="product__item__pic set-bg" >
                                            <img style={{ width: '100%', height: '95%' }} src={value.imageProduct} alt="" />
                                            <ul className="product__item__pic__hover">
                                                <li><a ><i className="fa fa-heart" /></a></li>
                                                <li><Link to={`/detailProduct/${value.id}`}><i className="fa fa-retweet" /></Link></li>
                                                <li><a onClick={() => onHandleAddProduct(value)} ><i className="fa fa-shopping-cart" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="product__item__text">
                                            <h6><Link to={`/detailProduct/${value.id}`}>{value.nameProduct}</Link></h6>
                                            <h6>{formatNumber(value.price)}đ</h6>
                                        </div>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </section>
                {/* Blog Section Begin */}
                <section className="from-blog spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title from-blog__title">
                                    <h2>From The Blog</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {
                                blog.map(value => (
                                    <div className="col-lg-4 col-md-4 col-sm-6">
                                        <div className="blog__item">
                                            <div className="blog__item__pic">
                                                <img style={{ height: '200px', width: '90%' }} src={value.imageBlog} alt />
                                            </div>
                                            <div className="blog__item__text">
                                                <ul style={{padding:'0'}}>
                                                    <li><i className="fa fa-calendar-o" /><i class="far fa-calendar-alt"></i> {format(new Date(value.createDay), 'dd MMM, yyyy')}</li>
                                                    <li><i className="fa fa-comment-o" /> <i class="far fa-eye"></i><span className="lnr lnr-heart ml-10" />{value.viewer} Viewer</li>
                                                </ul>
                                                <Link style={{color:'black',fontWeight:'bold'}} className="card1-title ml-0" to={`/detail/${value.id}`}>{value.title}</Link>
                                                <p className="format-content-new">{value.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </section>

            </>
            <Footer />
        </>

    )
}

export default Product
