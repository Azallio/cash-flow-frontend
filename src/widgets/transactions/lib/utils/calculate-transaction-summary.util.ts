import { TransactionsLib, type TransactionsTypes } from '@widgets/transactions'

interface Params {
  transactions: TransactionsTypes.Http.Transaction[]
}

export const calculateTransactionSummary = ({ transactions }: Params) => {
  return transactions.reduce(
    (acc, item) => {
      if (item.transactionType === TransactionsLib.Enums.TransactionTypeEnum.INCOME) {
        acc.income += item.amount
      } else {
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
