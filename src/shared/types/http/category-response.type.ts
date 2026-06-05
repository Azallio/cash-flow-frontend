import type { TransactionTypeEnum } from '@shared/lib/enums'

export type CategoryResponse = {
  id: number
  title: string
  description: string
  transactionType: TransactionTypeEnum.INCOME | TransactionTypeEnum.EXPENSE
  createdAt: string
  updatedAt: string
}
