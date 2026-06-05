import { SharedApi, type SharedTypes } from '@shared'
import type { TransactionTypeEnum } from '@shared/lib/enums'
import type { TransactionsResponse } from '@shared/types/http'

export type Params = {
  take: number
  skip: number
  transactionType?: TransactionTypeEnum
}

export async function getTransactions(params: Params) {
  return await SharedApi.baseClient.get<SharedTypes.Http.PaginatedApiResponse<TransactionsResponse>>(
    '/transactions',
    {
      params: {
        take: params.take,
        skip: params.skip,
        transactionType: params?.transactionType,
      },
    },
  )
}
