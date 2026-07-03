import z from "zod";

export const registerSchema = z.object({
  email: z.email('Введена неккоректная почта'),
  name: z.string('Содержит запрещенные символы').min(5, 'Минимум 5 символов').max(15, 'Максимум 15 символов'),
  password: z.string('Содержит запрещенные символы').min(6, 'Минимум 6 символов').max(10, 'Максимум 10 символов'),
  role: z.string('Выберите свою роль').min(1, 'Выберите свою роль')
})

export const loginSchema = z.object({
  email: z.email('Введена неккоректная почта'),
  password: z.string('Содержит запрещенные символы').min(6, 'Минимум 6 символов').max(10, 'Максимум 10 символов'),
})