import { TransactionsUi } from '.'
import { useTransactionsWidget } from './service/hooks/use-transactions-widget'

export const TransactionsWidget = () => {
  const { filters, transactionsQuery, categoriesQuery, resolved, filtered, mutations, infinite } =
    useTransactionsWidget()

  return (
    <div className="flex size-full flex-col gap-6 overflow-hidden p-4">
      <div className="flex min-h-0 flex-2 flex-col-reverse gap-4 lg:flex-row">
        <div className="flex-2.5 flex h-full max-w-2/3! min-w-0 flex-col gap-4">
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

        <div className="flex h-full flex-1 flex-col gap-4">
          <TransactionsUi.TransactionCreateForm
            categories={categoriesQuery.data?.pages.flatMap((page) => page.items) || []}
            onCreateCategory={(p) => mutations.createCategory.mutateAsync(p)}
            onCreateTransaction={(p) => mutations.createTransaction.mutateAsync(p)}
            isCreateCategoryPending={mutations.createCategory.isPending}
            isCreateTransactionPending={mutations.createTransaction.isPending}
          />
        </div>
      </div>
    </div>
  )
}
