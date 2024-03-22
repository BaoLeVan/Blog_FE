import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import '../ui/css/Main.css'
import { getAllBlog } from '../service/BlogService'
import { format } from 'date-fns';
import { Link } from 'react-router-dom'



const Favorite = () => {
    const [blog, setBlog] = useState();
    useEffect(() => {
        getAllBlog().then(res => {
            setBlog(res)
        })
    }, [])
    console.log(blog);
    if (!blog) return (
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
            {/* Start top-section Area */}
            <section className="section--favorite">
                <div className="container">
                    <div className="row justify-content-between align-items-center d-flex">
                        <div className="col-lg-8 top-left">
                            <h1 style={{ color: 'white' }} className="mb-20">My Blog Favorite</h1>
                        </div>
                    </div>
                </div>
            </section>
            {/* Start post Area */}
            <div className="post-wrapper pt-100">
                {/* Start post Area */}
                <section className="post-area">
                    <div className="container">
                        <div className="row justify-content-center d-flex">
                            <div className="col-lg-10">
                                <div className="post-lists">
                                    {
                                        blog.map(value => (
                                            <div key={value.id} className="single-travel media pb-60">
                                                <img style={{ height: 'auto', width: '37%' }} className="img-fluid d-flex mr-2 col-3" src={value.imageBlog} alt />
                                                <div className="dates ml-20">
                                                    <span>{format(new Date(value.createDay), 'dd MMM, yyyy')}</span>
                                                </div>
                                                <div className="media-body align-self-center">
                                                    <h4 style={{position:'relative'}} className="mt-0 d-flex">
                                                        <Link className='hover--a format-content-title' to={`/detail/${value.id}`}>{value.title}</Link>
                                                        <span style={{position:'absolute',right:'0'}} ><i class="fas fa-trash-alt"></i></span>
                                                    </h4>
                                                    <p className='format-content'>{value.content}</p>
                                                    <div className="meta-bottom d-flex justify-content-between">
                                                        <p style={{ fontSize: '0.8rem' }} ><i class="far fa-eye"></i><span className="lnr lnr-heart ml-10" />{value.viewer} Viewer</p>
                                                        <p style={{ fontSize: '0.8rem' }} className='div-img'><span className="lnr lnr-bubble">{value.nameUser}</span><img className="image--user ml-5" src={value.imageUser} alt /></p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div className="justify-content-center d-flex">
                                        <a className="text-uppercase primary-btn loadmore-btn mt-40 mb-60" href="#"> Load More Post</a>
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

export default Favorite
