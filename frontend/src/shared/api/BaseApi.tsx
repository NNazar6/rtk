import axios from "axios";
import useToast from "../toast/hooks/useToast";
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

BaseAPI.interceptors.request.use(config => config,
    async error => {
        const { showToast } = useToast()
        if (error.status === 401) {
            const origConf = error.config
            const refTok = localStorage.getItem('refreshToken')
            if (refTok) {
                try {
                    const response = await axios.post(
                        'http://localhost:3010' + '/auth/refresh', { refTok }
                    )
                    const { accessToken } = response.data
                    localStorage.setItem('accessToken', accessToken)
                    origConf.headers.Authorization = `Bearer ${accessToken}`
                    return BaseAPI(origConf)
                } catch (error) {
                    localStorage.clear()
                    showToast('Необходимо заново авторизоваться', 'error')
                    return Promise.reject
                }

            }
            showToast('Необходимо заново авторизоваться', 'error')
            return Promise.reject

        }
    }
)

export default BaseAPI

