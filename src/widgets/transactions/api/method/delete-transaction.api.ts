import { SharedApi, type SharedTypes } from '@shared'
import type { TransactionsResponse } from '@shared/types/http'

export type DeleteTransactionParams = {
  id: string
}

export const deleteTransaction = async (params: DeleteTransactionParams) => {
  const res = await SharedApi.baseClient.delete<SharedTypes.Http.BaseApiResponse<TransactionsResponse>>(
    `/transactions/${params.id}`,
  )

  return res.data.data
}
