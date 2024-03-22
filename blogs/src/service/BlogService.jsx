import axios from "axios";

export const getAllBlog = async () => {
    const res = await axios.get("http://localhost:8080/api/blog")
    return res.data;
}

export const getBlogsMaxView = async () => {
    const res = await axios.get("http://localhost:8080/api/blog/maxBlog")
    return res.data;
}


export const getBlogById = async (id) => {
    const res = await axios.get(`http://localhost:8080/api/blog/detail/${id}`)
    return res.data;
}

export const getBlogHighView = async () => {
    const res = await axios.get("http://localhost:8080/api/blog/highView")
    return res.data;
}

export const getListBlogCurrent = async () => {
    const res = await axios.get("http://localhost:8080/api/blog/current")
    return res.data;
}

export const findBlogByTopic = async (page,id) => {
    const res = await axios.get(`http://localhost:8080/api/blog/findBlog?page=${page}&id=${id}`)
    return res.data;
}