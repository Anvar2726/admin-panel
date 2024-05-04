import axios from "axios";

const request = axios.create({
    baseURL: 'https://663536fe9bb0df2359a423d5.mockapi.io/',
    timeout: 10000,
    
})

export default request;