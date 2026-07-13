import { SharedUi } from '@shared'
import useInfinityScroll from '@shared/service/hook/use-infinity-scroll.hook'
import type { Transaction } from '@shared/types/http'
import { ContentBlock } from '@shared/ui/content-block'
import { pluralize } from '@widgets/transactions/lib/utils'
import { useCallback, useState } from 'react'
import { TransactionListItem } from './ui/transaction-list-item.component'
import { TransactionLoader } from './ui/transaction-loader.component'
import { TransactionRemoveModal } from './ui/transaction-remove-modal.component'

type Props = {
  transactions: Transaction[]
  categoryMap: Record<number, string>
  isLoading: boolean
  onDeleteTransaction: (id: string) => Promise<unknown>
  isDeleteTransactionPending: boolean
  onLoadMore: () => void
  hasMore: boolean
  isLoadingMore: boolean
}

export const TransactionsList = (props: Props) => {
  const {
    transactions,
    categoryMap,
    isLoading,
    onDeleteTransaction,
    isDeleteTransactionPending,
    onLoadMore,
    hasMore,
    isLoadingMore,
  } = props
  const [deleteTransactionId, setDeleteTransactionId] = useState<number | null>(null)

  console.table(transactions)

  const handleDeleteTransaction = async () => {
    if (!deleteTransactionId) {
      return
    }

    await onDeleteTransaction(String(deleteTransactionId))
    setDeleteTransactionId(null)
  }

  const handleLoadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      onLoadMore()
    }
  }, [onLoadMore, hasMore, isLoadingMore])

  const lastElementRef = useInfinityScroll(handleLoadMore)

  return (
    <ContentBlock className="border-border h-full overflow-scroll border">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Последние транзакции </h2>
        <span className="text-text-muted text-sm">
          {transactions.length} {pluralize(transactions.length, 'запись ', 'записи ', 'записей  ')}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {isLoading && [1, 2, 3].map((index) => <TransactionLoader key={index} />)}

        {!isLoading && !transactions.length && <SharedUi.NotFoundMessage title="Транзакции не найдены" />}

        {transactions.map((item, index) => {
          const isLast = index === transactions.length - 1
          return (
            <TransactionListItem
              key={item.id + item.createdAt + index}
              item={item}
              index={index}
              isLast={isLast}
              lastElementRef={isLast ? lastElementRef : undefined}
              categoryMap={categoryMap}
              setDeleteTransactionId={setDeleteTransactionId}
            />
          )
        })}
      </div>

      <TransactionRemoveModal
        isOpen={deleteTransactionId !== null}
        onClose={() => setDeleteTransactionId(null)}
        isDeleteTransactionPending={isDeleteTransactionPending}
        handleDeleteTransaction={handleDeleteTransaction}
        setDeleteTransactionId={setDeleteTransactionId}
      />
    </ContentBlock>
  )
}
