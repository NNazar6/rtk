import BaseAPI from "../../../shared/api/BaseApi"

export const LessonsAPI = {
    getAllLessons: async () => await BaseAPI.get('/lessons'),
    createLesson: async (data: any) => await BaseAPI.post('/lessons', data),
    patchLessons: async (status: any, id: any) => await BaseAPI.patch('/lessons/' + id, {status})    
}