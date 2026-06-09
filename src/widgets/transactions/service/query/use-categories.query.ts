import { useInfiniteQuery } from '@tanstack/react-query'
import type { GetCategoriesParams } from '@widgets/transactions/api/method'
import { getCategories } from '@widgets/transactions/api/method'

export const useCategoriesQuery = (params: GetCategoriesParams) =>
  useInfiniteQuery({
    initialPageParam: 0,

    queryKey: ['categories', params],
    queryFn: ({ pageParam = 0 }) => getCategories({ ...params, skip: pageParam }),

    getNextPageParam: (lastPage, pages) => {
      if (lastPage.items.length < 10) return undefined
      return pages.length * 10
    },
  })
