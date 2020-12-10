import axios from 'axios';

//http://localhost:8000
//https://scrapping25.herokuapp.com/
const instance = axios.create({
    baseURL: "https://scrapping25.herokuapp.com/"
})

export default instance