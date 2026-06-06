import { SharedApi, type SharedTypes } from '@shared'
import type { TransactionTypeEnum } from '@shared/lib/enums'
import type { TransactionsResponse } from '@shared/types/http'

export type CreateTransactionPayload = {
  categoryId: number
  amount: number
  transactionType: TransactionTypeEnum
  description: string
  createdAt: string
}

export const postTransaction = async (payload: CreateTransactionPayload) => {
  const res = await SharedApi.baseClient.post<SharedTypes.Http.BaseApiResponse<TransactionsResponse>>(
    '/transactions',
    payload,
  )

  return res.data.data
}
