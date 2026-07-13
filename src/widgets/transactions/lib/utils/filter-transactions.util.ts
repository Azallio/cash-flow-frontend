import type { TransactionsTypes } from '@widgets/transactions'

type Params = {
  transactions: TransactionsTypes.Http.Transaction[]
  search: string
  categoryMap: Record<number, string>
}

export const filterTransactions = ({ transactions, search, categoryMap }: Params) => {
  const normalizedSearch = search.trim().toLowerCase()

  if (!normalizedSearch) return transactions

  return transactions.filter((item) => {
    const categoryTitle = item.categoryId > 0 ? (categoryMap[item.categoryId] ?? '') : ''

    return (
      item.description.toLowerCase().includes(normalizedSearch) ||
      categoryTitle.toLowerCase().includes(normalizedSearch) ||
      String(item.amount).includes(normalizedSearch)
    )
  })
}
