import axios from "axios";

export const getPayment = async (idUser,price) => {
    const res = await axios.get(`http://localhost:8080/api/payment/createPay?idAccount=${idUser}&price=${price}`)
    return res.data;
}