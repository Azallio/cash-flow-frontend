import { SharedUi } from '@shared'
import type { Consts } from '@shared/lib'
import type { TransactionsLib } from '@widgets/transactions'
import { TransactionTypeEnum } from '@widgets/transactions/lib/enums'
import type { useCreateTransactionForm } from '@widgets/transactions/model/create-transaction-model/use-create-transaction-form'
import clsx from 'clsx'

interface Props {
  item: (typeof Consts.TransactionTypeToggleOptions)[number]
  transactionType: TransactionsLib.Enums.TransactionTypeEnum
  setTransactionType: (type: TransactionsLib.Enums.TransactionTypeEnum) => void
  transactionForm: ReturnType<typeof useCreateTransactionForm>
}

export function TransactionTypeToggleButton(props: Props) {
  const { item, transactionType, setTransactionType, transactionForm } = props

  return (
    <SharedUi.Button
      key={item.value}
      type="button"
      onClick={() => {
        setTransactionType(item.value)

        transactionForm.form.setValue('categoryId', 0)
      }}
      className={clsx(
        'h-10 rounded-lg text-sm font-semibold transition-colors',
        transactionType === item.value
          ? item.value === TransactionTypeEnum.INCOME
            ? 'bg-success/20 text-success'
            : 'bg-primary/20 text-primary'
          : 'text-text-muted hover:bg-bg',
      )}
    >
      {item.label}
    </SharedUi.Button>
  )
}
