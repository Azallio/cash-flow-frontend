import { TransactionsUi } from '.'

export const TransactionsWidget = () => {
  return (
    <div className="flex size-full flex-col gap-6 overflow-hidden p-4">
      <div className="flex min-h-0 flex-2 flex-col-reverse gap-4 lg:flex-row">
        <div className="flex-2.5 flex h-full max-w-2/3! min-w-0 flex-col gap-4">
          <TransactionsUi.TransactionsFilters className="not-md:hidden" />
          <TransactionsUi.TransactionsList />
        </div>

        <div className="flex h-full flex-1 flex-col gap-4 not-md:hidden">
          <TransactionsUi.TransactionCreateForm />
        </div>
      </div>
    </div>
  )
}
