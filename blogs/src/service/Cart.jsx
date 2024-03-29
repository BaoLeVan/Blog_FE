import axios from "axios";

export const addToCart = async (idProduct,idUser) => {
    const res = await axios.get(`http://localhost:8080/api/cart/${idProduct}/${idUser}`)
    return res.data;
}

export const getListCart = async (idUser) => {
    const res = await axios.get(`http://localhost:8080/api/cart/${idUser}`)
    return res.data;
}

export const minus = async (idProduct,idUser) => {
    const res = await axios.get(`http://localhost:8080/api/cart/minus/${idProduct}/${idUser}`)
    return res.data;
}
export const add = async (idProduct,idUser) => {
    const res = await axios.get(`http://localhost:8080/api/cart/add/${idProduct}/${idUser}`)
    return res.data;
}
export const getTotalPrice = async (idUser) => {
    const res = await axios.get(`http://localhost:8080/api/cart/totalPrice/${idUser}`)
    return res.data;
}

export const getPaymentCart = async (idUser,totalPrice) => {
    const res = await axios.get(`http://localhost:8080/api/paymentCart?idAccount=${idUser}&totalPrice=${totalPrice}`)
    return res.data;
}

export const getCountCart = async (idUser) => {
    const res = await axios.get(`http://localhost:8080/api/cart/count/${idUser}`)
    return res.data;
}

export const deleteCart = async (idProduct,idUser) => {
    const res = await axios.delete(`http://localhost:8080/api/cart/deleteCart?idProduct=${idProduct}&idUser=${idUser}`)
    return res.data;
}