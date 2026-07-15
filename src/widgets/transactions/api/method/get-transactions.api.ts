import { SharedApi, type SharedTypes } from '@shared'
import type { TransactionsLib, TransactionsTypes } from '@widgets/transactions'

type RawTransactionsResponse = Omit<TransactionsTypes.Http.Transaction, 'categoryId'> & {
  categoryId?: number | null
  categoryID?: number | null
  category_id?: number | null
  category?: {
    id?: number | null
  } | null
}

const resolveCategoryId = (item: RawTransactionsResponse) =>
  item.categoryId ?? item.categoryID ?? item.category_id ?? item.category?.id

export interface GetTransactionsParams {
  take: number
  skip: number
  transactionType?: TransactionsLib.Enums.TransactionTypeEnum
  startDate?: string
  endDate?: string
}

export const getTransactions = async (params: GetTransactionsParams) => {
  const res = await SharedApi.baseClient.get<SharedTypes.Http.PaginatedApiResponse<RawTransactionsResponse>>(
    '/transactions',
    {
      params: {
        take: params.take,
        skip: params.skip,
        transactionType: params.transactionType,
        startDate: params.startDate,
        endDate: params.endDate,
      },
    },
  )

  return {
    ...res.data.data,
    items: res.data.data.items.map((item) => ({
      ...item,
      categoryId: resolveCategoryId(item) ?? -1,
    })),
  }
}
