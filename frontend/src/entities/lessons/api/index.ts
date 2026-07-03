import BaseAPI from "../../../shared/api/BaseApi"

export const LessonsAPI = {
    getAllLessons: async () => await BaseAPI.get('/lessons'),
    createLesson: async (data) => {
        console.log();
        
        await BaseAPI.post('/lessons', data)},
    patchLessons: async (status, id) => await BaseAPI.patch('/lessons/' + id, status)    
}