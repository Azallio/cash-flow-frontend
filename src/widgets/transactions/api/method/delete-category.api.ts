import { SharedApi, type SharedTypes } from '@shared'

export type DeleteCategoryParams = {
  id: number
}

type DeleteCategoryResponse = {
  status: number
  data: null
  error: null
}

export const deleteCategory = async (params: DeleteCategoryParams) => {
  const res = await SharedApi.baseClient.delete<SharedTypes.Http.BaseApiResponse<DeleteCategoryResponse>>(
    `/category/${params.id}`,
  )

  return res.data.data
}
