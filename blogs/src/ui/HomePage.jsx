import React, { useEffect, useState } from 'react'
import '../ui/css/Main.css'
import '../ui/css/Carosel.css'
import Header from './Header'
import Footer from './Footer'
import { getAllBlog, getBlogHighView, getListBlogCurrent, getPageBlog } from '../service/BlogService'
import { format } from 'date-fns';
import { Link, useLocation } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const HomePage = () => {
  const [blogs, setBlogs] = useState();
  const [blogHighView, setBlogHighView] = useState();
  const [blogCurrent, setBlogCurrent] = useState();
  const [idUser, setIdUser] = useState(localStorage.getItem("idUser"));
  const location = useLocation();
  const data = location.state?.data || [];
  const [check, setCheck] = useState(data || "");
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false)
  
  const handleId = (id) => {
    setIdUser(id);
  }

  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    getBlogHighView().then(res => {
      setBlogHighView(res)
    })
    getListBlogCurrent().then(res => {
      setBlogCurrent(res);
    })
    
  }, [])

  useEffect(() => {
    setLoading(true)
    getPageBlog(page).then(res => {
      console.log(res);
      setLoading(false)
      setBlogs(prev => prev ? [...prev, ...res.content] : [...res.content])
      setTotalPages(res.totalPages)
    })
}, [page])
  
  console.log(blogs);
  if (!blogHighView || !blogCurrent) return (
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
      <div>
        <Header handleId={handleId} check={check} />
        <header className="masthead">
          <div className="container">
            <div className="masthead-subheading">Chào mừng bạn tới Blog của tôi!</div>
            <div className="masthead-heading text-uppercase">It's Nice To Meet You</div>
          </div>
        </header>
        <section style={{ padding: '50px 0' }} className="category-area" id="news">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="menu-content pb-70 col-lg-8">
                <div className="title text-center">
                  <h1 style={{ fontSize: '34px' }} className="mb-2">Blog nổi bật</h1>
                  <p>Blog là nơi tôi chia sẻ những câu chuyện, kinh nghiệm và cảm xúc của mình để kết nối với cộng đồng và lan tỏa sự sáng tạo.</p>
                </div>
              </div>
            </div>
            <Slider {...settings}>
              {
                blogHighView.map(value => (
                  <div>
                    <img style={{ width: '320px', height: '250px' }} src={value.imageBlog} alt="img1" />
                    <p style={{ marginBottom: '5px' }} >{format(new Date(value.createDay), 'dd MMM, yyyy')}</p>
                    <div style={{ width: '300px', textAlign: 'center' }}>
                      <Link style={{ fontWeight: '700', color: '#222', fontSize: '18px' }} to={`/detail/${value.id}`} >{value.title}</Link>
                    </div>
                  </div>
                ))
              }
            </Slider>
          </div>
        </section>
        {/* Start travel Area */}
        <section className="travel-area section-gap" id="travel">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="menu-content pb-70 pt-50 col-lg-8">
                <div className="title text-center">
                  <h1 style={{ fontSize: '34px' }} className="mb-2">Danh sách Blog</h1>
                  <p>
                    Blog là một tài nguyên quan trọng cung cấp các bài viết, thông tin và kiến thức đa dạng về một loạt các chủ đề, từ kinh doanh và công nghệ đến cuộc sống hàng ngày và sức khỏe, giúp người đọc mở rộng hiểu biết và tìm kiếm thông tin hữu ích.</p>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              {blogs && (
                blogs.map(value => (
                  <div className="col-lg-6 ">
                    <div key={value.id} className="single-travel media pb-60">
                      <img style={{ height: 'auto', width: '37%' }} className="img-fluid d-flex mr-2 col-3" src={value.imageBlog} alt />
                      <div className="dates ml-20">
                        <span>{format(new Date(value.createDay), 'dd MMM, yyyy')}</span>
                      </div>
                      <div className="media-body align-self-center">
                        <h4 className="mt-0"><Link className='hover--a format-content-title' to={`/detail/${value.id}`}>{value.title}</Link></h4>
                        <p className='format-content'>{value.content}</p>
                        <div className="meta-bottom d-flex justify-content-between">
                          <p style={{ fontSize: '0.8rem' }} ><i class="far fa-eye"></i><span className="lnr lnr-heart ml-10" />{value.viewer} Viewer</p>
                          <p style={{ fontSize: '0.8rem' }} className='div-img'><span className="lnr lnr-bubble">{value.nameUser}</span><img className="image--user ml-5" src={value.imageUser} alt /></p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )
              }
              {
                page < totalPages && (
                  <div className='row d-flex justify-content-center mt-4'>
                    <a style={{
                      fontSize: '9px', borderTop: " #62bdfc 0.5px solid",
                      color: "black",
                      padding: " 0 7px",
                      fontSize: "10px", textAlign: 'center'
                    }} className="col-2 primary-btn load-more mt-60" onClick={() => setPage(page + 1)} >{loading ? "Loading...." : "Show more"}</a>
                  </div>
                )
              }
            </div>
          </div>
        </section>
        {/* Blog Gan Day */}
        <section className="fashion-area section-gap" id="fashion">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="menu-content pb-40 col-lg-8">
                <div className="title text-center pt-5">
                  <h1 style={{ fontSize: '34px' }} className="mb-3">Blog gần đây</h1>
                  <p>Blog gần đây không chỉ là nền tảng để chia sẻ kiến thức và trải nghiệm cá nhân, mà còn là một công cụ quan trọng cho giao tiếp và tương tác trực tuyến.</p>
                </div>
              </div>
            </div>
            <div className="row">
              {
                blogCurrent.map(value => (
                  <div className="card1 col-lg-3 col-md-6 ">
                    <div style={{ overflow: 'hidden' }} className="card1-image">
                      <img style={{ height: '176px', width: '100%' }} src={value.imageBlog} alt />
                    </div>
                    <Link style={{ color: 'black' }} to={`/detail/${value.id}`} className="card1-title format-content-title">{value.title}</Link>
                    <p className="card1-body format-content-new">
                      {value.content}
                    </p>
                    <p className="footer1">Viết bởi <span className="by-name1">{value.nameUser}</span> on <span className="date1">{format(new Date(value.createDay), 'dd MMM, yyyy')}</span></p>
                  </div>
                ))
              }
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default HomePage
