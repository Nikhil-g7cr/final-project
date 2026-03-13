import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:4000/api'
    // baseURL:'http://localhost:5000/'
})

//add interceptor to add token to all requests
api.interceptors.request.use((config)=>{
    let token=localStorage.getItem("token") 
    if(token){
        config.headers["Authorization"]= `Bearer ${token}`
    }
    return config;
}
, (error)=>{
    return Promise.reject(error)
})

export default api;