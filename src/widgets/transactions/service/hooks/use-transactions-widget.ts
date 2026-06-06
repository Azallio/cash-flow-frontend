import { TransactionsService } from '@widgets/transactions'
import { calculateTransactionSummary, filterTransactions } from '@widgets/transactions/utils'
import { useMemo } from 'react'

const toIso = (date: string, isEnd = false) =>
  new Date(`${date}T${isEnd ? '23:59:59.999' : '00:00:00.000'}Z`).toISOString()

export const useTransactionsWidget = () => {
  const filters = TransactionsService.Hooks.useTransactionsFilters()

  const queryType = filters.typeFilter === 'ALL' ? undefined : filters.typeFilter
  const queryStartDate = filters.startDate ? toIso(filters.startDate) : undefined
  const queryEndDate = filters.endDate ? toIso(filters.endDate, true) : undefined

  const transactionsQuery = TransactionsService.Query.useTransactionsInfiniteQuery({
    transactionType: queryType,
    startDate: queryStartDate,
    endDate: queryEndDate,
  })

  const { fetchNextPage, hasNextPage, isFetchingNextPage } = transactionsQuery

  const categoriesQuery = TransactionsService.Query.useCategoriesQuery({
    take: 100,
    skip: 0,
  })

  const createCategory = TransactionsService.Mutation.useCreateCategoryMutation()
  const createTransaction = TransactionsService.Mutation.useCreateTransactionMutation()
  const deleteTransaction = TransactionsService.Mutation.useDeleteTransactionMutation()

  const transactions = useMemo(
    () => transactionsQuery.data?.pages.flatMap((p) => p.items) ?? [],
    [transactionsQuery.data],
  )

  const categories = useMemo(() => categoriesQuery.data?.items ?? [], [categoriesQuery.data])

  const resolved = TransactionsService.Query.useResolvedCategoryMapQuery({
    transactions,
    categories,
  })

  const filtered = useMemo(
    () =>
      filterTransactions({
        transactions,
        search: filters.search,
        categoryMap: resolved.resolvedCategoryMap,
      }),
    [transactions, filters.search, resolved.resolvedCategoryMap],
  )

  const summary = useMemo(() => calculateTransactionSummary({ transactions: filtered }), [filtered])

  return {
    filters,

    transactionsQuery,
    categoriesQuery,
    resolved,

    transactions,
    filtered,
    summary,

    infinite: {
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    },

    mutations: {
      createCategory,
      createTransaction,
      deleteTransaction,
    },
  }
}
