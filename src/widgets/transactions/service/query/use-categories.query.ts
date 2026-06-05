import { useQuery } from '@tanstack/react-query'
import type { GetCategoriesParams } from '@widgets/transactions/api/method'
import { getCategories } from '@widgets/transactions/api/method'

export const useCategoriesQuery = (params: GetCategoriesParams) =>
  useQuery({
    queryKey: ['categories', params],
    queryFn: () => getCategories(params),
  })
