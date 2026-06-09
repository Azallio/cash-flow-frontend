import { TransactionTypeEnum } from '@shared/lib/enums'
import type { TransactionsResponse } from '@shared/types/http'

type Params = {
  transactions: TransactionsResponse[]
}

export const calculateTransactionSummary = ({ transactions }: Params) => {
  return transactions.reduce(
    (acc, item) => {
      if (item.transactionType === TransactionTypeEnum.INCOME) {
        acc.income += item.amount
      } else if (item.transactionType === TransactionTypeEnum.EXPENSE) {
        acc.expense += item.amount
      }

      return acc
    },
    {
      income: 0,
      expense: 0,
    },
  )
}
