import axios from "axios";

export async function getUserById(id) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function getBlogByUserId(page, id) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/user/blog?page=${page}&idUser=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}
export async function getProductHistory(page, id) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/user/historyProduct?page=${page}&idUser=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

