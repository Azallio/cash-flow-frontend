import type { SharedLib } from '@shared'

export type Transaction = {
  id: number
  transactionType: SharedLib.Enums.TransactionTypeEnum
  amount: number
  description: string
  categoryId: number
  userId: number
  createdAt: string
  updatedAt: string
}
