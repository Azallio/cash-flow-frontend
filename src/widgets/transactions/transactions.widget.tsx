import { TransactionsUi } from '.'
import { useTransactionsWidget } from './service/hooks/use-transactions-widget'

export const TransactionsWidget = () => {
  const { filters, transactionsQuery, categoriesQuery, resolved, filtered, summary, mutations, infinite } =
    useTransactionsWidget()

  const balance = summary.income - summary.expense

  return (
    <div className="flex w-full flex-col gap-6 p-4">
      <TransactionsUi.TransactionsSummary {...summary} balance={balance} />

      <div className="flex flex-col-reverse gap-4 xl:flex-row">
        <div className="flex-2.5 flex max-w-2/3! min-w-0 flex-col gap-4">
          <TransactionsUi.TransactionsFilters
            typeFilter={filters.typeFilter}
            filterValues={filters}
            onTypeFilterChange={filters.setTypeFilter}
            onFilterChange={filters.setField}
            onReset={filters.reset}
          />

          <TransactionsUi.TransactionsList
            onLoadMore={infinite.fetchNextPage}
            hasMore={infinite.hasNextPage}
            isLoadingMore={infinite.isFetchingNextPage}
            transactions={filtered}
            categoryMap={resolved.resolvedCategoryMap}
            isLoading={
              transactionsQuery.isLoading || categoriesQuery.isLoading || resolved.isMissingCategoriesLoading
            }
            onDeleteTransaction={(id) => mutations.deleteTransaction.mutateAsync(id)}
            isDeleteTransactionPending={mutations.deleteTransaction.isPending}
          />
        </div>

        <TransactionsUi.TransactionCreateForm
          categories={categoriesQuery.data?.items ?? []}
          onCreateCategory={(p) => mutations.createCategory.mutateAsync(p)}
          onCreateTransaction={(p) => mutations.createTransaction.mutateAsync(p)}
          isCreateCategoryPending={mutations.createCategory.isPending}
          isCreateTransactionPending={mutations.createTransaction.isPending}
        />
      </div>
    </div>
  )
}
