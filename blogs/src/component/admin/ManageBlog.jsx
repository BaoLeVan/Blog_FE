import React, { useEffect, useState } from 'react'
import '../../ui/css/databoard.css'
import SideBar from '../../ui/SideBar'
import { getAllBlog } from '../../service/BlogService';
import { Link } from 'react-router-dom';


const ManageBlog = () => {
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    getAllBlog().then(res => {
      setBlogs(res)
    })
  }, [])

  if (!blogs) return (
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
      <div className='row'>
        <div className='col-3'>
          <SideBar />
        </div>
        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg col-9">
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-12">
                <div className="card my-4">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                      <h6 className="text-white text-capitalize ps-3">Quản lý Blog</h6>
                    </div>
                  </div>
                  <div className="card-body px-0 pb-2">
                    <div className="table-responsive p-0">
                      <table className="table align-items-center mb-0">
                        <tbody style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                          {
                            blogs.map(value => (
                              <div className="card col-4 ml-10 mr-10 mb-4" style={{ width: '18rem' }}>
                                <img style={{ width: '100%', height: '172px' }} src={value.imageBlog} className="card-img-top" />
                                <div className="card-body">
                                  <h5 className="card-title format-manage-title">{value.title}</h5>
                                  <p className="card-text format-manage-content">{value.content}</p>
                                  <div style={{ justifyContent: 'space-between' }} className='d-flex'>
                                    <Link to={`/editBlog/${value.id}`} className="btn btn-primary">Sửa</Link>
                                    <a style={{ background: '#e72626', color: 'white' }} className="btn btn-primary">Xóa</a>
                                  </div>
                                </div>
                              </div>
                            ))
                          }






                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default ManageBlog
