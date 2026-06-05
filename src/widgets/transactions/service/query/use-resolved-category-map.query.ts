import type { CategoryResponse, TransactionsResponse } from '@shared/types/http'
import { useQueries } from '@tanstack/react-query'
import { getCategoryById } from '@widgets/transactions/api/method'
import { useMemo } from 'react'

type Params = {
  transactions: TransactionsResponse[]
  categories: CategoryResponse[]
}

export const useResolvedCategoryMapQuery = (params: Params) => {
  const { transactions, categories } = params

  const getCategoryId = (categoryId: number) => (categoryId > 0 ? categoryId : undefined)

  const categoryMap = useMemo(
    () =>
      categories.reduce<Record<number, string>>((acc, item) => {
        acc[item.id] = item.title
        return acc
      }, {}),
    [categories],
  )

  const missingCategoryIds = useMemo(() => {
    const idsSet = new Set<number>()

    transactions.forEach((item) => {
      const categoryId = getCategoryId(item.categoryId)

      if (categoryId && !categoryMap[categoryId]) {
        idsSet.add(categoryId)
      }
    })

    return Array.from(idsSet)
  }, [transactions, categoryMap])

  const missingCategoryQueries = useQueries({
    queries: missingCategoryIds.map((id) => ({
      queryKey: ['category', id],
      queryFn: () => getCategoryById({ id }),
      enabled: !!id,
      staleTime: 1000 * 60 * 5,
      retry: false,
    })),
  })

  const missingCategoryMap = useMemo(
    () =>
      missingCategoryQueries.reduce<Record<number, string>>((acc, query, index) => {
        const category = query.data

        if (category) {
          const id = missingCategoryIds[index]
          acc[id] = category.title
        }

        return acc
      }, {}),
    [missingCategoryQueries, missingCategoryIds],
  )

  return {
    resolvedCategoryMap: {
      ...categoryMap,
      ...missingCategoryMap,
    },
    isMissingCategoriesLoading: missingCategoryQueries.some((query) => query.isLoading),
  }
}
