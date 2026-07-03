import axios from "axios";

const BaseAPI = axios.create({
    baseURL: 'http://localhost:3010',
    headers: {
        'Content-Type': 'application/json'
    }
})

BaseAPI.interceptors.request.use(config => {
    const acToken = localStorage.getItem('accessToken')
    if (acToken) {
        config.headers.Authorization = `Bearer ${acToken}`
    }
    return config
})

export default BaseAPI