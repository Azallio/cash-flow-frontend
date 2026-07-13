import { SharedApi, SharedLib, type SharedTypes } from '@shared'
import type { TransactionsTypes } from '@widgets/transactions'

export type CreateTransactionPayload = {
  categoryId: number
  amount: number
  transactionType: SharedLib.Enums.TransactionTypeEnum
  description: string
  createdAt: string
}

export const postTransaction = async (payload: CreateTransactionPayload) => {
  const res = await SharedApi.baseClient.post<
    SharedTypes.Http.BaseApiResponse<TransactionsTypes.Http.Transaction>
  >('/transactions', payload)

  return res.data.data
}
