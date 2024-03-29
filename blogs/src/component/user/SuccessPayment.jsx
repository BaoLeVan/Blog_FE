import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function SuccessPayment() {
    const native = useNavigate();
    const {id} = useParams();
    const [resultPayment, setResultPayment] = useState();
    const [checkPayment,setCheckPayment] = useState(true);
    useEffect(() => {
        const setPaymentOk = async () => {
            const res = await axios.get(`http://localhost:8080/infor_payment/${id}`);
            setResultPayment(res.data);
        }
        setPaymentOk();
        native("/" , {state: {data: checkPayment}})
    }, []);
}