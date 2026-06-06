import { z } from 'zod'

export const createTransactionSchema = z.object({
  amount: z.number().positive('Сумма должна быть больше 0'),

  description: z.string(),

  createdAt: z.string().min(1, 'Выберите дату'),

  categoryId: z.number().positive('Выберите категорию'),
})

export type CreateTransactionFormValues = z.input<typeof createTransactionSchema>
