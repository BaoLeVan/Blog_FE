import axios from "axios";

export async function getAllBlogByAdmin(page, id) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/admin/search?page=${page}&id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function addBlogByAdmin(blog) {
    const token = localStorage.getItem("token")
    const res = await axios.post(`http://localhost:8080/api/admin/addBlog`, blog, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function editBlogByAdmin(blog) {
    const token = localStorage.getItem("token")
    const res = await axios.patch(`http://localhost:8080/api/admin/editBlog`, blog, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function deleteBlogByAdmin(blog) {
    const token = localStorage.getItem("token")
    const res = await axios.delete(`http://localhost:8080/api/admin/delete/${blog.id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function getAllProductByAdmin(page, name) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/admin/manageProduct?page=${page}&name=${name}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function addProductByAdmin(product) {
    const token = localStorage.getItem("token")
    console.log(token);
    const res = await axios.post(`http://localhost:8080/api/admin/addProduct`, product, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function editProductByAdmin(product) {
    const token = localStorage.getItem("token")
    console.log(token);
    const res = await axios.patch(`http://localhost:8080/api/admin/editProduct`, product, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}