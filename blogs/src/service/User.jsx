import axios from "axios";

export const getUserById = async (id) => {
    const res = await axios.get(`http://localhost:8080/api/user/${id}`)
    return res.data;
}

export const getBlogByUserId = async (page,id) => {
    const res = await axios.get(`http://localhost:8080/api/user/blog?page=${page}&idUser=${id}`)
    return res.data;
}
export const getProductHistory = async (page,id) => {
    const res = await axios.get(`http://localhost:8080/api/user/historyProduct?page=${page}&idUser=${id}`)
    return res.data;
}