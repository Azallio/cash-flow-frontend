import { SharedApi, type SharedTypes } from '@shared'
import type { TransactionsTypes } from '@widgets/transactions'

export type DeleteTransactionParams = {
  id: string
}

export const deleteTransaction = async (params: DeleteTransactionParams) => {
  const res = await SharedApi.baseClient.delete<
    SharedTypes.Http.BaseApiResponse<TransactionsTypes.Http.Transaction>
  >(`/transactions/${params.id}`)

  return res.data.data
}
