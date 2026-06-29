import type { TransactionTypeEnum } from '@shared/lib/enums'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getTransactions } from '@widgets/transactions/api/method'

type Params = {
  transactionType?: TransactionTypeEnum
  startDate?: string
  endDate?: string
}

export const useTransactionsInfiniteQuery = (params: Params) => {
  return useInfiniteQuery({
    queryKey: ['transactions', params],

    initialPageParam: 0,

    queryFn: ({ pageParam = 0 }) =>
      getTransactions({
        take: 10,
        skip: pageParam,
        transactionType: params.transactionType,
        startDate: params.startDate,
        endDate: params.endDate,
      }),

    getNextPageParam: (lastPage, pages) => {
      const totalItems = lastPage.totalItems
      if (pages.length * 10 >= totalItems) return undefined
      return pages.length * 10
    },
  })
}
