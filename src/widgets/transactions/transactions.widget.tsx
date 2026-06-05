import type { TransactionFilterType } from '@shared/lib/consts/transactions-page.const'
import { TransactionTypeEnum } from '@shared/lib/enums'
import { TransactionsService, TransactionsUi } from '@widgets/transactions'
import { useMemo, useState } from 'react'

const toIso = (date: string, isEnd = false) =>
  new Date(`${date}T${isEnd ? '23:59:59.999' : '00:00:00.000'}Z`).toISOString()

type FilterFieldKey = 'search' | 'startDate' | 'endDate'

export const TransactionsWidget = () => {
  const [typeFilter, setTypeFilter] = useState<TransactionFilterType>(TransactionTypeEnum.ALL)
  const [search, setSearch] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const queryStartDate = startDate ? toIso(startDate) : undefined
  const queryEndDate = endDate ? toIso(endDate, true) : undefined
  const queryType = typeFilter || undefined

  const { data: transactionsData, isLoading: isTransactionsLoading } =
    TransactionsService.Query.useTransactionsQuery({
      take: 100,
      skip: 0,
      transactionType: queryType,
      startDate: queryStartDate,
      endDate: queryEndDate,
    })

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    TransactionsService.Query.useCategoriesQuery({
      take: 100,
      skip: 0,
    })

  const createCategoryMutation = TransactionsService.Mutation.useCreateCategoryMutation()
  const createTransactionMutation = TransactionsService.Mutation.useCreateTransactionMutation()
  const deleteTransactionMutation = TransactionsService.Mutation.useDeleteTransactionMutation()

  const transactions = useMemo(() => transactionsData?.items ?? [], [transactionsData?.items])
  const categories = useMemo(() => categoriesData?.items ?? [], [categoriesData?.items])

  const { resolvedCategoryMap, isMissingCategoriesLoading } =
    TransactionsService.Query.useResolvedCategoryMapQuery({
      transactions,
      categories,
    })

  const filteredTransactions = useMemo(() => {
    if (!search.trim()) return transactions

    const normalizedSearch = search.trim().toLowerCase()

    return transactions.filter((item) => {
      const categoryTitle = item.categoryId > 0 ? (resolvedCategoryMap[item.categoryId] ?? '') : ''

      return (
        item.description.toLowerCase().includes(normalizedSearch) ||
        categoryTitle.toLowerCase().includes(normalizedSearch) ||
        String(item.amount).includes(normalizedSearch)
      )
    })
  }, [transactions, search, resolvedCategoryMap])

  const { income, expense } = filteredTransactions.reduce(
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

  const balance = income - expense

  return (
    <div className="flex w-full flex-col gap-6 p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Транзакции</h1>
        <p className="text-text-muted">Управляйте своими доходами и расходами</p>
      </div>

      <TransactionsUi.TransactionsSummary income={income} expense={expense} balance={balance} />

      <div className="flex flex-col-reverse gap-4 xl:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <TransactionsUi.TransactionsFilters
            typeFilter={typeFilter}
            filterValues={{
              search,
              startDate,
              endDate,
            }}
            onTypeFilterChange={setTypeFilter}
            onFilterChange={(key, value) => {
              const setters: Record<FilterFieldKey, (fieldValue: string) => void> = {
                search: setSearch,
                startDate: setStartDate,
                endDate: setEndDate,
              }

              setters[key]?.(value)
            }}
            onReset={() => {
              setTypeFilter(TransactionTypeEnum.ALL)
              setSearch('')
              setStartDate('')
              setEndDate('')
            }}
          />

          <TransactionsUi.TransactionsList
            transactions={filteredTransactions}
            categoryMap={resolvedCategoryMap}
            isLoading={isTransactionsLoading || isCategoriesLoading || isMissingCategoriesLoading}
            onDeleteTransaction={(id) => deleteTransactionMutation.mutateAsync(id)}
            isDeleteTransactionPending={deleteTransactionMutation.isPending}
          />
        </div>

        <TransactionsUi.TransactionCreateForm
          categories={categories}
          onCreateCategory={(payload) => createCategoryMutation.mutateAsync(payload)}
          onCreateTransaction={(payload) => createTransactionMutation.mutateAsync(payload)}
          isCreateCategoryPending={createCategoryMutation.isPending}
          isCreateTransactionPending={createTransactionMutation.isPending}
        />
      </div>
    </div>
  )
}
