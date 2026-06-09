import { SharedUi } from '@shared'
import { TransactionTypeEnum } from '@shared/lib/enums'
import useInfinityScroll from '@shared/service/hook/use-infinity-scroll.hook'
import type { TransactionsResponse } from '@shared/types/http'
import { Button } from '@shared/ui/button'
import { ContentBlock } from '@shared/ui/content-block'
import { Modal } from '@shared/ui/modal'
import { pluralize } from '@widgets/transactions/lib/utils'
import clsx from 'clsx'
import { useCallback, useState } from 'react'

type Props = {
  transactions: TransactionsResponse[]
  categoryMap: Record<number, string>
  isLoading: boolean
  onDeleteTransaction: (id: string) => Promise<unknown>
  isDeleteTransactionPending: boolean
  onLoadMore: () => void
  hasMore: boolean
  isLoadingMore: boolean
}

const formatMoney = (value: number) => `${value.toLocaleString('ru-RU')} ₽`

const formatTime = (value: string): string => {
  return new Date(value).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
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
        {isLoading && <div className="text-text-muted py-6 text-center">Загрузка...</div>}

        {!isLoading && !transactions.length && (
          <div className="text-text-muted py-6 text-center">Транзакции не найдены</div>
        )}

        {transactions.map((item, index) => {
          const isLast = index === transactions.length - 1
          return (
            <div
              key={item.id}
              ref={isLast ? lastElementRef : undefined}
              className="border-border flex flex-col gap-2 rounded-xl border px-4 py-3 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-medium">{item.description}</p>
                <p className="text-text-muted text-sm">
                  {item.categoryId > 0
                    ? (categoryMap[item.categoryId] ?? `Категория #${item.categoryId}`)
                    : 'Без категории'}
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <span
                  className={clsx(
                    'font-semibold',
                    item.transactionType === TransactionTypeEnum.INCOME ? 'text-success' : 'text-primary',
                  )}
                >
                  {item.transactionType === TransactionTypeEnum.INCOME ? '+' : '-'}
                  {formatMoney(item.amount)}
                </span>
                <span className="text-text-muted">{formatTime(item.createdAt)}</span>
                <SharedUi.Button
                  aria-label="Удалить транзакцию"
                  variant="color:secondary size:sm"
                  onClick={() => setDeleteTransactionId(item.id)}
                >
                  <SharedUi.Icon name="trash" className="h-4 w-4" />
                </SharedUi.Button>
              </div>
            </div>
          )
        })}
      </div>

      <Modal
        opened={deleteTransactionId !== null}
        onClose={() => setDeleteTransactionId(null)}
        title="Удалить транзакцию"
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm">Вы уверены, что хотите удалить эту транзакцию?</p>

          <div className="flex items-center justify-end gap-2">
            <Button
              variant="color:secondary size:md"
              type="button"
              onClick={() => setDeleteTransactionId(null)}
              disabled={isDeleteTransactionPending}
            >
              Отмена
            </Button>
            <Button
              variant="color:primary size:md"
              type="button"
              onClick={handleDeleteTransaction}
              disabled={isDeleteTransactionPending}
            >
              {isDeleteTransactionPending ? 'Удаление...' : 'Удалить'}
            </Button>
          </div>
        </div>
      </Modal>
    </ContentBlock>
  )
}
