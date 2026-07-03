import BaseAPI from "../../../shared/api/BaseApi";

export const AuthAPI = {
    register: async (data) => await BaseAPI.post('/auth/register', data),
    login: async (data) => (await BaseAPI.post('/auth/login', data)),
    logout: async () => await BaseAPI.post('/auth/logout')
}