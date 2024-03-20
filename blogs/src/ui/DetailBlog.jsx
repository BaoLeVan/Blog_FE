import React, { useEffect, useState } from 'react'
import '../ui/css/Main.css'
import Header from './Header'
import Footer from './Footer'
import { getBlogById } from '../service/BlogService'
import { Link, useParams } from 'react-router-dom'
import { format } from 'date-fns';
import { getAllCategory } from '../service/Category'
import { FacebookProvider, Comments } from 'react-facebook';
import MyFacebookComments from './MyFacebookComments'




const DetailBlog = () => {
    const [blog, setBlog] = useState();
    const [categorys, setCategorys] = useState();
    const param = useParams();

    useEffect(() => {
        getAllCategory().then(res => {
            setCategorys(res)
        })
    }, [])

    useEffect(() => {
        const { id } = param;
        getBlogById(id).then(res => {
            setBlog(res)
        })
    }, [param])

    console.log(blog);
    if (!blog || !categorys) return (
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
            <Header />
            <div className="post-wrapper pt-100">
                <section className="post-area">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div key={blog.id} className="col-lg-8">
                                <div className="single-page-post">
                                    <img className="img-fluid" src={blog.imageBlog} alt />
                                    <div className="top-wrapper ">
                                        <div className="row d-flex justify-content-between">
                                            <h2 className="col-lg-8 col-md-12 text-uppercase">
                                                {blog.title}
                                            </h2>
                                            <div className="col-lg-4 col-md-12 right-side d-flex justify-content-end">
                                                <div className="desc">
                                                    <h2>{blog.nameUser}</h2>
                                                    <h3>{format(new Date(blog.createDay), 'dd MMM, yyyy')}</h3>
                                                </div>
                                                <div className="user-img">
                                                    <img className='image---user' src={blog.imageUser} alt />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-post-content">
                                        {blog.description}
                                    </div>
                                    {/* <div className="bottom-wrapper">
                                                <div className="row">
                                                    <div className="col-lg-4 single-b-wrap col-md-12">
                                                        <i className="fa fa-heart-o" aria-hidden="true" />
                                                        lily and 4 people like this
                                                    </div>
                                                    <div className="col-lg-4 single-b-wrap col-md-12">
                                                        <i className="fa fa-comment-o" aria-hidden="true" /> 06 comments
                                                    </div>
                                                    <div className="col-lg-4 single-b-wrap col-md-12">
                                                        <ul className="social-icons">
                                                            <li><a href="#"><i className="fa fa-facebook" aria-hidden="true" /></a></li>
                                                            <li><a href="#"><i className="fa fa-twitter" aria-hidden="true" /></a></li>
                                                            <li><a href="#"><i className="fa fa-dribbble" aria-hidden="true" /></a></li>
                                                            <li><a href="#"><i className="fa fa-behance" aria-hidden="true" /></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div> */}
                                    <section className="comment-sec-area pt-80 pb-80">
                                        <div className="container">
                                            <MyFacebookComments id={param} />
                                            <div className="fb-comments" data-href="https://hocweb90ngay.com" data-width={700} data-numposts={5} />
                                        </div>
                                    </section>
                                </div>
                            </div>
                            <div className="col-lg-4 sidebar-area ">
                                <div className="single_widget about_widget">
                                    <img style={{ objectFit: 'cover', height: '50px', height: '50px' }} src={blog.imageUser} alt />
                                    <h2 className="text-uppercase">{blog.nameUser}</h2>
                                    <p>
                                        {blog.title}
                                    </p>
                                    <div className="social-link">
                                        <a href="#"><button className="btn"><i className="fa fa-facebook" aria-hidden="true" /> Like</button></a>
                                        <a href="#"><button className="btn"><i className="fa fa-twitter" aria-hidden="true" /> follow</button></a>
                                    </div>
                                </div>
                                <div className="single_widget recent_widget">
                                    <h4 className="text-uppercase pb-20">Recent Posts</h4>
                                    <div className="active-recent-carusel">
                                        <div className="item">
                                            <img src="img/asset/slider.jpg" alt />
                                            <p className="mt-20 title text-uppercase">Home Audio Recording <br />
                                                For Everyone</p>
                                            <p>02 Hours ago <span> <i className="fa fa-heart-o" aria-hidden="true" />
                                                06 <i className="fa fa-comment-o" aria-hidden="true" />02</span></p>
                                        </div>
                                        <div className="item">
                                            <img src="img/asset/slider.jpg" alt />
                                            <p className="mt-20 title text-uppercase">Home Audio Recording <br />
                                                For Everyone</p>
                                            <p>02 Hours ago <span> <i className="fa fa-heart-o" aria-hidden="true" />
                                                06 <i className="fa fa-comment-o" aria-hidden="true" />02</span></p>
                                        </div>
                                        <div className="item">
                                            <img src="img/asset/slider.jpg" alt />
                                            <p className="mt-20 title text-uppercase">Home Audio Recording <br />
                                                For Everyone</p>
                                            <p>02 Hours ago <span> <i className="fa fa-heart-o" aria-hidden="true" />
                                                06 <i className="fa fa-comment-o" aria-hidden="true" />02</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="single_widget tag_widget">
                                    <h4 className="text-uppercase pb-20">Category</h4>
                                    <ul>
                                        {
                                            categorys.map(value => (
                                                <li><Link to={""}>{value.typeCategory}</Link></li>
                                            ))
                                        }
                                    </ul>
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

export default DetailBlog
