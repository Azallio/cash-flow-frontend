import { SharedApi, type SharedTypes } from '@shared'
import type { TransactionTypeEnum } from '@shared/lib/enums'

export type CreateCategoryPayload = {
  title: string
  description?: string
  transactionType: TransactionTypeEnum
}

export const postCategory = async (payload: CreateCategoryPayload) => {
  const res = await SharedApi.baseClient.post<
    SharedTypes.Http.BaseApiResponse<SharedTypes.Http.CategoryResponse>
  >('/category', payload)

  return res.data.data
}
