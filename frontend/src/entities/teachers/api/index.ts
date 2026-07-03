import BaseAPI from "../../../shared/api/BaseApi";

export const TeacherAPI = {
    getAllTeachers: async (params) => await BaseAPI.get('/teachers', {params}),
    getOneTeacher: async (id) => await BaseAPI.get(`/teachers/${id}`),
}