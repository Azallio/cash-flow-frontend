import { SharedApi, type SharedTypes } from '@shared'
import type { TransactionTypeEnum } from '@shared/lib/enums'
import type { CategoryResponse } from '@shared/types/http'

export type CreateCategoryPayload = {
  title: string
  description: string
  transactionType: TransactionTypeEnum.INCOME | TransactionTypeEnum.EXPENSE
}

export const postCategory = async (payload: CreateCategoryPayload) => {
  const res = await SharedApi.baseClient.post<SharedTypes.Http.BaseApiResponse<CategoryResponse>>(
    '/category',
    payload,
  )

  return res.data.data
}
