import type { TransactionTypeEnum } from '@shared/lib/enums'

export type TransactionsResponse = {
  id: number
  transactionType: TransactionTypeEnum
  amount: number
  description: string
  categoryId: number
  userId: number
  createdAt: string
  updatedAt: string
}
