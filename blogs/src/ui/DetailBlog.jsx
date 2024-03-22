import React, { useEffect, useState } from 'react'
import '../ui/css/Main.css'
import Header from './Header'
import Footer from './Footer'
import { findBlogByTopic, getBlogById } from '../service/BlogService'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns';
import { getAllCategory } from '../service/Category'
import MyFacebookComments from './MyFacebookComments'
import { getAllTopic } from '../service/TopicService'


const DetailBlog = () => {
    const [blog, setBlog] = useState();
    const [categorys, setCategorys] = useState();
    const [idCate, setIdCate] = useState();
    const [topic, setTopic] = useState();
    const [listSearch, setListSearch] = useState();
    const [idTopic, setIdTopic] = useState();
    const native = useNavigate()
    const param = useParams();
    const { a } = param;

    useEffect(() => {
        if (blog) {
            setIdCate(blog.idCategory);
        }
    }, [blog])

    useEffect(() => {
        if (idCate) {
            getAllTopic(idCate).then(res => {
                console.log(res);
                setTopic(res)
            })
        }
    }, [idCate])
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

    useEffect(() => {
        if (listSearch) {
            native("/findBlogByTopic", { state: { blog: listSearch, idCate }})
        }
    }, [listSearch])

    const onFindBLog = (id) => {
        findBlogByTopic(0, id).then(res => {
            setListSearch(res);
            setIdTopic(id);
        })
    }

   

    if (!blog || !categorys || !topic) return (
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
                                    <div className='d-flex justify-content-center'>
                                        <img style={{ width: '80%', height: '18rem' }} className="img-fluid" src={blog.imageBlog} alt />
                                    </div>
                                    <div className="top-wrapper ">
                                        <div className="row d-flex justify-content-between">
                                            <h2 style={{ width: '100%' }} className="col-lg-8 col-md-12 text-uppercase">
                                                {blog.title}
                                            </h2>

                                        </div>
                                    </div>
                                    <div className="single-post-content">
                                        {blog.description}
                                    </div>
                                    <section className="comment-sec-area pt-80 pb-80">
                                        <div className="container">
                                            <MyFacebookComments id={a} />
                                            <div className="fb-comments" data-href="https://hocweb90ngay.com" data-width={1000} data-numposts={5} />
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
                                        <a href="#"><button className="btn"><i class="far fa-star"></i> Favorite</button></a>
                                        <a href="#"><button className="btn"><i className="fa fa-twitter" aria-hidden="true" /> follow</button></a>
                                    </div>
                                </div>
                                <div className="single_widget cat_widget">
                                    <h4 style={{ fontSize: '18px' }} className="text-uppercase pb-20 d-flex justify-content-center">Những ngôn ngữ liên quan</h4>
                                    <ul>
                                        {
                                            topic.map(value => (
                                                <li>
                                                    <a onClick={e => onFindBLog(value.id)}>{value.nameTopic} </a>
                                                </li>

                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className="single_widget tag_widget">
                                    <h4 style={{ fontSize: '18px' }} className="text-uppercase pb-20 d-flex justify-content-center">Category</h4>
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
