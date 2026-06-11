import { z } from 'zod'

export const createCategorySchema = z.object({
  title: z.string().trim().min(1, 'Введите название категории'),

  description: z.string().trim().min(1, 'Введите описание категории').optional(),
})

export type CreateCategoryFormValues = z.input<typeof createCategorySchema>
