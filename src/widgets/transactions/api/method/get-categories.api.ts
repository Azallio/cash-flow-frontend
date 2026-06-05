import { SharedApi, type SharedTypes } from '@shared'
import type { CategoryResponse } from '@shared/types/http'

export type GetCategoriesParams = {
  take: number
  skip: number
}

export const getCategories = async (params: GetCategoriesParams) => {
  const res = await SharedApi.baseClient.get<SharedTypes.Http.PaginatedApiResponse<CategoryResponse>>(
    '/category',
    {
      params: {
        take: params.take,
        skip: params.skip,
      },
    },
  )

  return res.data.data
}
