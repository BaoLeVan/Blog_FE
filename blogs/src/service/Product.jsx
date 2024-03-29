import axios from "axios";

export const getAllProduct = async (page) => {
    const res = await axios.get(`http://localhost:8080/api/product?page=${page}`)
    return res.data;
}

export const getProductById = async (id) => {
    const res = await axios.get(`http://localhost:8080/api/product/detailProduct/${id}`)
    return res.data;
}
export const getProductRelated = async () => {
    const res = await axios.get(`http://localhost:8080/api/product/related`)
    return res.data;
}