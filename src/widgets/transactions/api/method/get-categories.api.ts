import { SharedApi, type SharedTypes } from '@shared'

export type GetCategoriesParams = {
  take: number
  skip: number
}

export const getCategories = async (params: GetCategoriesParams) => {
  const res = await SharedApi.baseClient.get<
    SharedTypes.Http.PaginatedApiResponse<SharedTypes.Http.CategoryResponse>
  >('/category', {
    params: {
      take: params.take,
      skip: params.skip,
    },
  })

  return res.data.data
}
