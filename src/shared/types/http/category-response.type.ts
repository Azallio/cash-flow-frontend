import type { TransactionsLib } from '@widgets/transactions'

export interface CategoryResponse {
  id: number
  title: string
  description: string
  transactionType:
    | TransactionsLib.Enums.TransactionTypeEnum.INCOME
    | TransactionsLib.Enums.TransactionTypeEnum.EXPENSE
  createdAt: string
  updatedAt: string
}
