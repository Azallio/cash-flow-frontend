import { SharedApi, type SharedTypes } from '@shared'

export interface GetCategoryByIdParams {
  id: number
}

export const getCategoryById = async (params: GetCategoryByIdParams) => {
  const res = await SharedApi.baseClient.get<
    SharedTypes.Http.BaseApiResponse<SharedTypes.Http.CategoryResponse>
  >(`/category/${params.id.toString()}`)

  return res.data.data
}
