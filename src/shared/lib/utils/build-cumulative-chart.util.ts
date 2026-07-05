import { TransactionTypeEnum } from '../enums'

type ChartPoint = {
  date: string
  value: number
}

export function buildCumulativeChart(transactions: Transaction[], type?: TransactionTypeEnum): ChartPoint[] {
  const grouped = new Map<string, number>()

  for (const t of transactions) {
    if (type && t.transactionType !== type) continue

    const date = t.createdAt.slice(0, 10)

    const value =
      type === undefined
        ? t.transactionType === TransactionTypeEnum.INCOME
          ? t.amount
          : -t.amount
        : t.amount

    grouped.set(date, (grouped.get(date) ?? 0) + value)
  }

  if (grouped.size === 0) return []

  const dates = [...grouped.keys()].sort()

  const start = new Date(dates[0])
  const end = new Date(dates[dates.length - 1])

  const result: ChartPoint[] = []

  let current = 0

  for (const day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
    const key = day.toISOString().slice(0, 10)

    current += grouped.get(key) ?? 0

    result.push({
      date: key,
      value: current,
    })
  }

  return result
}
