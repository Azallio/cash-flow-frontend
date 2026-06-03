import { api } from '@shared/api/client'
import type { transactionType } from '@shared/types/api'

export type TransactionsResponse = {
  id: number
  transactionType: transactionType
  amount: number
  description: string
  categoryId: number
  userId: number
  createdAt: string
  updatedAt: string
}

export type GetTransactionsParams = {
  take: number
  skip: number
  transactionType?: transactionType
  
}

export async function getTransactions(params?: GetTransactionsParams) {
  const { data } = await api.get<TransactionsResponse>('/transactions', {
    params,
  })

  return data
}
