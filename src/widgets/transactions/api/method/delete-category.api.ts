import { SharedApi, type SharedTypes } from '@shared'

export interface DeleteCategoryParams {
  id: number
}

interface DeleteCategoryResponse {
  status: number
  data: null
  error: null
}

export const deleteCategory = async (params: DeleteCategoryParams) => {
  const res = await SharedApi.baseClient.delete<SharedTypes.Http.BaseApiResponse<DeleteCategoryResponse>>(
    `/category/${params.id.toString()}`,
  )

  return res.data.data
}
