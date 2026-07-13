import { SharedLib } from '@shared'
import type { TransactionsTypes } from '@widgets/transactions'

type Params = {
  transactions: TransactionsTypes.Http.Transaction[]
}

export const calculateTransactionSummary = ({ transactions }: Params) => {
  return transactions.reduce(
    (acc, item) => {
      if (item.transactionType === SharedLib.Enums.TransactionTypeEnum.INCOME) {
        acc.income += item.amount
      } else if (item.transactionType === SharedLib.Enums.TransactionTypeEnum.EXPENSE) {
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
