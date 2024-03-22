import axios from "axios";

export const getAllBlogByAdmin = async (page,id) => {
    const res = await axios.get(`http://localhost:8080/api/blog/admin/search?page=${page}&id=${id}`)
    return res.data;
}

// export const getAllNoAcceptBlog


export const addBlogByAdmin = async (blog) => {
    const res = await axios.post(`http://localhost:8080/api/blog/admin/addBlog`,blog)
    return res.data;
}

export const editBlogByAdmin = async (blog) => {
    const res = await axios.post(`http://localhost:8080/api/blog/admin/editBlog`,blog)
    return res.data;
}