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

    if (!blog) return (
        <>
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
    )
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
            <div className="post-wrapper pt-100">
                <section className="post-area">
                    <div className="container">
                        <div className="row justify-content-center d-flex">
                            {
                                blog.map(value => (
                                    <div style={{ margin: "0 20px 20px 20px" }} className="card1 col-lg-3 col-md-6 ">
                                        <div style={{ overflow: 'hidden' }} className="card1-image">
                                            <img style={{ height: '176px', width: '100%' }} src={value.imageBlog} alt />
                                        </div>
                                        <Link to={`/detail/${value.id}`} className="card1-title format-content-title">{value.title}</Link>
                                        <p className="card1-body format-content-new">
                                            {value.content}
                                        </p>
                                        <p className="footer1">Viết bởi <span className="by-name1">{value.nameUser}</span> on <span className="date1">{format(new Date(value.createDay), 'dd MMM, yyyy')}</span></p>
                                    </div>
                                ))
                            }
                            {blog > 6 ?
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
                                </div> : <></>}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}

export default Favorite
