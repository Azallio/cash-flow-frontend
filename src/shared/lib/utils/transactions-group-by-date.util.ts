import type { SharedTypes } from '@shared'
import { TransactionTypeEnum } from '../enums'

export function groupTransactionsByDate(
  transactions: Transaction[],
): Map<string, SharedTypes.Ui.SparklineDataPoint> {
  const grouped = transactions.reduce<Map<string, SharedTypes.Ui.SparklineDataPoint>>((map, t) => {
    const date = t.createdAt.slice(0, 10)

    const existing = map.get(date) ?? {
      income: 0,
      expense: 0,
    }

    if (t.transactionType === TransactionTypeEnum.INCOME) {
      existing.income += t.amount
    } else {
      existing.expense += t.amount
    }

    map.set(date, existing)

    return map
  }, new Map())

  if (grouped.size === 0) return grouped

  const result = new Map<string, SharedTypes.Ui.SparklineDataPoint>()

  const dates = [...grouped.keys()].sort()

  const start = new Date(dates[0])
  const end = new Date(dates[dates.length - 1])

  let currentIncome = 0
  let currentExpense = 0

  for (const current = new Date(start); current <= end; current.setDate(current.getDate() + 1)) {
    const key = current.toISOString().slice(0, 10)

    const day = grouped.get(key)

    if (day) {
      currentIncome += day.income
      currentExpense += day.expense
    }

    result.set(key, {
      income: currentIncome,
      expense: currentExpense,
    })
  }

  return result
}
