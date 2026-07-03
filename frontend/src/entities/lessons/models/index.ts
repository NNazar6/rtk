import z from "zod";

export const lessonSchema = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    time: z.string().min(5, 'Введите точное время'),
    comment: z.string().min(1, 'Минимум 1 символ').max(1000, 'Максимум 1000 символов')
})