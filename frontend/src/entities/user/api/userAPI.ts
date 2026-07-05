import BaseAPI from "../../../shared/api/BaseApi";

export const UserAPI = {
    getProfile: () => BaseAPI.get('/profile/me'),
    deleteUser: (id) => BaseAPI.delete('/profile/' + id),
    editProfile: (data) => BaseAPI.put('/profile/me', data)
}