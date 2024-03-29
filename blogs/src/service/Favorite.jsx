import axios from "axios";

export const getListFavorite = async (page,id) => {
    const res = await axios.get(`http://localhost:8080/api/favorite?page=${page}&idUser=${id}`)
    return res.data;
}


export const getCountAndAddFavorite = async (idBlog,idUser) => {
    const res = await axios.post(`http://localhost:8080/api/favorite/count/${idBlog}/${idUser}`)
    return res.data;
}

export const checkCount = async (idUser) => {
    const res = await axios.get(`http://localhost:8080/api/favorite/checkCount/${idUser}`)
    return res.data;
}

export const checkFavoriteCount = async (idUser,idBlog) => {
    const res = await axios.get(`http://localhost:8080/api/favorite/checkFavorite?idUser=${idUser}&idBlog=${idBlog}`)
    return res.data;
}



