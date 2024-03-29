import React, { useEffect, useState } from 'react'
import SideBar from '../../ui/SideBar'
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import Swal from "sweetalert2";
import { getAllCategory } from '../../service/Category'
import { getAllTopic } from '../../service/TopicService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../ui/css/Button.css'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import storage from '../../config/firebase'
import { addBlogByAdmin } from '../../service/Admin';
import Header from '../../ui/Header'
import Footer from '../../ui/Footer'
import { getUserById } from '../../service/User'
import { getPayment } from '../../service/Payment';
import swal from 'sweetalert';

const UserAddBlog = () => {
    const navigate = useNavigate();
    const [categorys, setCategorys] = useState();
    const [idCate, setIdCate] = useState(0);
    const [topic, setTopic] = useState();
    const [imgUpload, setImgUpload] = useState(null);
    const [imgUrls, setImgUrls] = useState([]);
    const [value, setValue] = useState('');
    const [idUser, setIdUser] = useState();
    const [user, setUser] = useState();
    const [status, setStatus] = useState(false);

    const handleId = (id) => {
        setIdUser(id);
    }

    useEffect(() => {
        console.log(idUser);
        if (idUser) {
            getUserById(idUser).then(res => {
                setUser(res);
            })
        }
        if (user) {
            setStatus(user.status)
        }
    }, [idUser,user])

    useEffect(() => {
        getAllCategory().then(res => {
            setCategorys(res)
        })
        getAllTopic(idCate).then(res => {
            setTopic(res)
        })
    }, [])
    const toolbarOptions = [
        ['bold', 'italic', 'underline'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    ];

    const initialValue = {
        title: "",
        description: "",
        createDay: "",
        imageBlog: "",
        content: "",
        categoryId: "",
        topicId: "",
        view: 0,
        userId: idUser
    }

    console.log(status);
    const module = {
        toolbar: toolbarOptions,
    }

    const validationObject = {
        title: Yup.string().required("Tên không được để trống").min(2, "Tên Blog ít nhất 2 ký tự").max(255, "Tên Blog tối đa 255 ký tự"),
        createDay: Yup.date().required("Ngày khởi tạo không được để trống"),
        categoryId: Yup.string().required("Vui lòng chọn ít nhất một chủ đề"),
        topicId: Yup.string().required("Vui lòng chọn ít nhất một topic"),
        description: Yup.string().max(65535, "Nội dung tối đa 65535 ký tự"),
        content: Yup.string().required("Nội dung không được để trống"),
    }
    const imgListRef = ref(storage, "images/")

    const UploadFiles = (files) => {
        Promise.all(
            files.map(file => {
                const imgRef = ref(storage, `images/${file.name}`);
                return uploadBytes(imgRef, file).then(snapshot => {
                    return getDownloadURL(snapshot.ref)
                })
            })
        ).then(urls => {
            setImgUrls(urls)
        })
    }

    useEffect(() => {
        if (imgUpload) {
            UploadFiles(imgUpload);
        }
    }, [imgUpload]);

    const handleSelectFiles = (e) => {
        const files = Array.from(e.target.files);
        console.log(files);
        setImgUpload(files)
    }

    const handleSelectChange = (e, setFieldValue) => {
        const { name, value } = e.target;
        setFieldValue(name, value)
        setIdCate(e.target.value);
    };
    useEffect(() => {
        if (idCate !== '') {
            getAllTopic(idCate)
                .then(res => {
                    setTopic(res);
                })
        }
    }, [idCate]);

    if (!categorys || !topic || !user) return (
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
            <div className="container mt-7">
                <div className="main-body">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src={user.image} alt="Admin" className="rounded-circle p-1 bg-primary" width={110} />
                                        <div className="mt-3">
                                            <h4>{user.name}</h4>
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0"><i style={{ color: '#344767', padding: '0 10px 0 5px' }} class="fas fa-key"></i>Đổi mật khẩu</h6>
                                        </li>
                                        {
                                            status ?
                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <Link to={"/user/addBlog"}>
                                                        <h6 className="mb-0"><i style={{ color: '#344767', padding: '0 13px 0 5px' }} class="fas fa-bookmark"></i>Đăng blog</h6>
                                                    </Link>
                                                </li> : <></>
                                        }
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <Link to={"/historyProduct"}>
                                                <h6 className="mb-0"><i style={{ color: '#344767', padding: '0 10px 0 5px' }} class="fas fa-history"></i>Lịch sử mua hàng</h6>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card">
                                <h3 style={{ paddingTop: "20px", display: 'flex', justifyContent: 'center' }}>Tạo Blog Của Bạn</h3>
                                <div className="card-body">
                                    <Formik initialValues={initialValue}
                                        validationSchema={Yup.object(validationObject)}
                                        onSubmit={(data) => {
                                            data.description = value
                                            data.imageBlog = imgUrls[0]
                                            console.log(data);
                                            addBlogByAdmin(data).then(res => {
                                                console.log(res);
                                                Swal.fire({
                                                    title: "Blog đã được lưu thành công!",
                                                    html: "Chuyển hướng màn hình sau <b></b>s.",
                                                    timer: 2000,
                                                    timerProgressBar: true,
                                                })
                                            })
                                        }}
                                        render={({
                                            setFieldValue
                                        }) => (
                                            <div className="container-fluid mb-5">
                                                <Form >
                                                    <div className="tab-content" id="myTabContent">
                                                        <div className="tab-pane fade show active" id="info" role="tabpanel"
                                                            aria-labelledby="info-tab">
                                                            <div className="row mt-2 d-flex justify-content-center">
                                                                <div className="col-12">
                                                                    <div className="row mt-3">
                                                                        <div className="col-2
                               d-flex align-items-center">
                                                                            <b>Ảnh Blog</b><span
                                                                                style={{ color: 'red' }}>&nbsp;*</span>
                                                                        </div>
                                                                        <div className="col row"
                                                                            style={{ marginLeft: "initial" }}>
                                                                            <div className="custom-file col">
                                                                                <input
                                                                                    onChange={handleSelectFiles}
                                                                                    type="file"
                                                                                    id="inputPoster"
                                                                                    accept="image/*"
                                                                                    required={true}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <Field type="hidden" className="form-control"
                                                                        name="imageBlog" value={imgUrls} />
                                                                    <div className="row mt-3">
                                                                        <div className="col-2
                               d-flex align-items-center">
                                                                            <b>Tên Blog</b><span
                                                                                style={{ color: 'red' }}>&nbsp;*</span>
                                                                        </div>
                                                                        <div className="col">
                                                                            <Field type="text" className="form-control"
                                                                                name="title" />
                                                                            <ErrorMessage name="title" component='p'
                                                                                className="form-err"
                                                                                style={{ margin: '0', color: 'red' }} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mt-3">
                                                                        <div className="col-2
                               d-flex align-items-center">
                                                                            <b>Nội dung</b><span
                                                                                style={{ color: 'red' }}>&nbsp;*</span>
                                                                        </div>
                                                                        <div className="col">
                                                                            <Field type="text" className="form-control"
                                                                                name="content" />
                                                                            <ErrorMessage name="content" component='p'
                                                                                className="form-err"
                                                                                style={{ margin: '0', color: 'red' }} />
                                                                        </div>
                                                                    </div>
                                                                    <Field type="hidden" className="form-control"
                                                                        name="viewer" />
                                                                    <div className="row mt-3">
                                                                        <div className="col-2 d-flex align-items-center">
                                                                            <b>Chủ đề</b><span style={{ color: 'red' }}>&nbsp;*</span>
                                                                        </div>
                                                                        <div className="col">
                                                                            <Field as="select" className="custom-select" name="categoryId"
                                                                                onChange={(e) => handleSelectChange(e, setFieldValue)}>
                                                                                <option value="" disabled>--Option Select--</option>
                                                                                {categorys.map((value) => (
                                                                                    <option key={value.id} value={value.id}>
                                                                                        {value.typeCategory}
                                                                                    </option>
                                                                                ))}
                                                                            </Field>
                                                                            <ErrorMessage name="categoryId" component='p'
                                                                                className="form-err"
                                                                                style={{ margin: '0', color: 'red' }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mt-3">
                                                                        <div className="col-2
                               d-flex align-items-center">
                                                                            <b>Topic</b><span
                                                                                style={{ color: 'red' }}>&nbsp;*</span>
                                                                        </div>
                                                                        <div className="col">
                                                                            {topic.map((value) => (
                                                                                <div className="form-check form-check-inline"
                                                                                    key={value.id}>
                                                                                    <Field className="form-check-input"
                                                                                        id={"value" + value.id}
                                                                                        type="radio"
                                                                                        name="topicId"
                                                                                        value={"" + value.id} />
                                                                                    <label className="form-check-label"
                                                                                        htmlFor={"value" + value.id}>{value.nameTopic}</label>
                                                                                </div>
                                                                            ))}
                                                                            <ErrorMessage name="topicId" component='p'
                                                                                className="form-err"
                                                                                style={{ margin: '0', color: 'red' }} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mt-3">
                                                                        <div className="col-2
                               d-flex align-items-center">
                                                                            <b>Ngày tạo</b><span
                                                                                style={{ color: 'red' }}>&nbsp;*</span>
                                                                        </div>
                                                                        <div className="col">
                                                                            <Field style={{ padding: '0.375rem 0.3rem 0.375rem 0.75rem' }} type="date" className="form-control"
                                                                                name="createDay" />
                                                                            <ErrorMessage name="createDay" component='p'
                                                                                className="form-err"
                                                                                style={{ margin: '0', color: 'red' }} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mt-3">
                                                                        <div className="col-2
                               d-flex align-items-center">
                                                                            <b>Mô tả</b><span
                                                                                style={{ color: 'red' }}>&nbsp;*</span>
                                                                        </div>
                                                                        <div className="col">
                                                                            <ReactQuill
                                                                                modules={module}
                                                                                name="description"
                                                                                theme="snow"
                                                                                placeholder='Nhập nội dung blog'
                                                                                className='h-50 mb-16'
                                                                                value={value}
                                                                                onChange={setValue}
                                                                            />
                                                                            <ErrorMessage name="description " component='p'
                                                                                className="form-err"
                                                                                style={{ margin: '0', color: 'red' }} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex justify-content-center mt-3">
                                                            <div>
                                                                <button type="submit" className="btn__add-new mr-2">
                                                                    Lưu lại
                                                                </button>
                                                            </div>
                                                            <div>
                                                                <Link to="/movie">
                                                                    <button type="button" className="btn__add-new">Quay lại
                                                                    </button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-2"></div>
                                                </Form>
                                            </div>
                                        )}
                                    >
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default UserAddBlog
