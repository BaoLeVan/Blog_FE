import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { format } from 'date-fns';
import { Link } from 'react-router-dom'
import { getListFavorite } from '../service/Favorite'
import ReactPaginate from "react-paginate";
import '../ui/css/Main.css'

const Favorite = () => {
    const [idUser, setIdUser] = useState();
    const [blog, setBlog] = useState();
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);


    const handleId = (id) => {
        setIdUser(id);
    }

    useEffect(() => {
        console.log(idUser);
        if (idUser) {
            getListFavorite(0, idUser).then(res => {
                setBlog(res.content)
                setTotalPages(res.totalPages)
            })
        }
    }, [idUser])

    const handlePageClick = (e) => {
        const pageNumber = e.selected;
        setCurrentPage(pageNumber);
        getListFavorite(pageNumber, idUser).then(res => {
            setBlog(res.content)
            setTotalPages(res.totalPages)
        })
    }

    // if (!blog) return (
    //     <div class="main">
    //         <div class="mario_bin"></div>
    //         <div class="mario_run">
    //             <div class="mario_run1"></div>
    //         </div>
    //         <div class="walls">
    //             <div class="wall"></div>
    //             <div class="wall"></div>
    //             <div class="wall"></div>
    //             <div class="wall"></div>
    //             <div class="wall"></div>
    //             <div class="wall"></div>
    //             <div class="wall"></div>
    //             <div class="wall"></div>
    //             <div class="wall"></div>
    //             <div class="wall"></div>
    //         </div>
    //         <div class="text"></div>
    //     </div>
    // )
    return (
        <>
            <Header handleId={handleId} />
            <section className="section--favorite">
                <div className="container">
                    <div className="row justify-content-between align-items-center d-flex">
                        <div className="col-lg-8 top-left">
                            <h1 style={{ color: 'white' }} className="mb-20">My Blog Favorite</h1>
                        </div>
                    </div>
                </div>
            </section>
            {blog &&
                <div className="post-wrapper pt-100">
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
                                                        <h4 style={{ position: 'relative' }} className="mt-0 d-flex">
                                                            <Link className='hover--a format-content-title' to={`/detail/${value.id}`}>{value.title}</Link>
                                                            <span style={{ position: 'absolute', right: '0' }} ><i class="fas fa-trash-alt"></i></span>
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
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <ReactPaginate
                                                forcePage={currentPage}
                                                breakLabel="..."
                                                nextLabel="Trang Sau"
                                                onPageChange={handlePageClick}
                                                pageRangeDisplayed={2}
                                                marginPagesDisplayed={2}
                                                pageCount={totalPages}
                                                previousLabel="Trang Trước"
                                                pageClassName="page-item"
                                                pageLinkClassName="page-link"
                                                previousClassName="page-item"
                                                previousLinkClassName="page-link"
                                                nextClassName="page-item"
                                                nextLinkClassName="page-link"
                                                breakClassName="page-item"
                                                breakLinkClassName="page-link"
                                                containerClassName="pagination"
                                                activeClassName="active"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            }
            <Footer />
        </>
    )
}

export default Favorite
