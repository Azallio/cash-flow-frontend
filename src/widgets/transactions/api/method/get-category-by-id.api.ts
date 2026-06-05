import { SharedApi, type SharedTypes } from '@shared'
import type { CategoryResponse } from '@shared/types/http'

export type GetCategoryByIdParams = {
  id: number
}

export const getCategoryById = async (params: GetCategoryByIdParams) => {
  const res = await SharedApi.baseClient.get<SharedTypes.Http.BaseApiResponse<CategoryResponse>>(
    `/category/${params.id}`,
  )

  return res.data.data
}
