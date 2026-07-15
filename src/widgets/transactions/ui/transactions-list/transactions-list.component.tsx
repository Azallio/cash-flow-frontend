import { SharedService, SharedUi } from '@shared'
import { TransactionsService, TransactionsUtils } from '@widgets/transactions'
import { filterTransactions } from '@widgets/transactions/lib/utils'
import { useTransactionsFilterStore } from '@widgets/transactions/service/store'
import { useCallback, useMemo, useState } from 'react'

import { TransactionListItem, TransactionLoader, TransactionRemoveModal } from './ui'

export const TransactionsList = () => {
  const { typeFilter, search } = useTransactionsFilterStore()
  const { dateFrom, dateTo } = SharedService.Store.useDateStore()

  const queryType = typeFilter === 'ALL' ? undefined : typeFilter

  const transactionsQuery = TransactionsService.Query.useTransactionsInfiniteQuery({
    transactionType: queryType,
    startDate: dateFrom.toISOString(),
    endDate: dateTo.toISOString(),
  })

  const categoriesQuery = TransactionsService.Query.useCategoriesQuery({ take: 100, skip: 0 })

  const deleteTransaction = TransactionsService.Mutation.useDeleteTransactionMutation()

  const transactions = useMemo(
    () => transactionsQuery.data?.pages.flatMap((p) => p.items) ?? [],
    [transactionsQuery.data],
  )

  const categories = useMemo(
    () => categoriesQuery.data?.pages.flatMap((p) => p.items) ?? [],
    [categoriesQuery.data],
  )

  const resolved = TransactionsService.Query.useResolvedCategoryMapQuery({ transactions, categories })

  const filtered = useMemo(
    () => filterTransactions({ transactions, search, categoryMap: resolved.resolvedCategoryMap }),
    [transactions, search, resolved.resolvedCategoryMap],
  )

  const isLoading =
    transactionsQuery.isLoading || categoriesQuery.isLoading || resolved.isMissingCategoriesLoading

  const [deleteTransactionId, setDeleteTransactionId] = useState<number | null>(null)

  const handleDeleteTransaction = async () => {
    if (!deleteTransactionId) return
    await deleteTransaction.mutateAsync(String(deleteTransactionId))
    setDeleteTransactionId(null)
  }

  const handleLoadMore = useCallback(() => {
    if (!transactionsQuery.isFetchingNextPage && transactionsQuery.hasNextPage) {
      void transactionsQuery.fetchNextPage()
    }
  }, [transactionsQuery])

  const lastElementRef = SharedService.Hooks.useInfinityScroll(handleLoadMore)

  return (
    <SharedUi.ContentBlock className="border-border h-full overflow-scroll border">
      <div className="mb-3 flex items-center justify-between">
        <h2>Последние транзакции </h2>
        <span className="text-text-muted text-sm">
          {filtered.length} {TransactionsUtils.pluralize(filtered.length, 'запись ', 'записи ', 'записей  ')}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {isLoading && [1, 2, 3].map((index) => <TransactionLoader key={index} />)}

        {!isLoading && !filtered.length && <SharedUi.NotFoundMessage title="Транзакции не найдены" />}

        {filtered.map((item, index) => {
          const isLast = index === filtered.length - 1
          return (
            <TransactionListItem
              key={item.id.toString() + item.createdAt + index.toString()}
              item={item}
              index={index}
              isLast={isLast}
              lastElementRef={isLast ? lastElementRef : undefined}
              categoryMap={resolved.resolvedCategoryMap}
              setDeleteTransactionId={setDeleteTransactionId}
            />
          )
        })}
      </div>

      <TransactionRemoveModal
        isOpen={deleteTransactionId !== null}
        onClose={() => {
          setDeleteTransactionId(null)
        }}
        isDeleteTransactionPending={deleteTransaction.isPending}
        handleDeleteTransaction={() => void handleDeleteTransaction()}
        setDeleteTransactionId={setDeleteTransactionId}
      />
    </SharedUi.ContentBlock>
  )
}
