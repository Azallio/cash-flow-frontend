import { SharedLib, SharedUi } from '@shared'
import { TransactionTypeEnum } from '@shared/lib/enums'
import clsx from 'clsx'

type TransactionListItemProps = {
  item: {
    id: number
    description: string
    categoryId: number
    transactionType: TransactionTypeEnum
    amount: number
    createdAt: string
  }
  index: number
  isLast: boolean
  lastElementRef?: React.Ref<HTMLDivElement>
  categoryMap: Record<number, string>
  setDeleteTransactionId: (id: number | null) => void
}

export function TransactionListItem(props: TransactionListItemProps) {
  const { item, index, isLast, lastElementRef, categoryMap, setDeleteTransactionId } = props
  return (
    <div
      key={item.id + item.createdAt + index}
      ref={isLast ? lastElementRef : undefined}
      className="border-border group flex flex-col gap-2 rounded-xl border px-4 py-3 md:flex-row md:items-center md:justify-between"
    >
      {' '}
      <div>
        <p className="font-medium">{item.description}</p>
        <p className="text-text-muted text-sm">
          {item.categoryId > 0
            ? (categoryMap[item.categoryId] ?? `Категория #${item.categoryId}`)
            : 'Без категории'}
        </p>
      </div>
      <div className="flex w-40 items-center justify-between gap-4 text-sm">
        <SharedUi.Button
          aria-label="Удалить транзакцию"
          className="invisible transition-all duration-200 group-hover:visible"
          variant="color:secondary size:sm"
          onClick={() => setDeleteTransactionId(item.id)}
        >
          <SharedUi.Icon name="trash" className="h-4 w-4" />
        </SharedUi.Button>

        <div className="flex flex-col items-end">
          <span
            className={clsx(
              'font-semibold',
              item.transactionType === TransactionTypeEnum.INCOME ? 'text-success' : 'text-primary',
            )}
          >
            {item.transactionType === TransactionTypeEnum.INCOME ? '+' : '-'}
            {SharedLib.Utils.formatMoney(item.amount)}
          </span>
          <span className="text-text-muted">{SharedLib.Utils.formatDate(item.createdAt)}</span>
        </div>
      </div>
    </div>
  )
}
