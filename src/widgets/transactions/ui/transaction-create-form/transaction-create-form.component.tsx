import { SharedLib, SharedUi } from '@shared'
import { TransactionsLib, TransactionsService } from '@widgets/transactions'
import { useCreateCategoryForm, useCreateTransactionForm } from '@widgets/transactions/model'
import { useMemo, useState } from 'react'

import {
  CategoryCreateModal,
  CategorySettingsModal,
  TransactionCategorySelect,
  TransactionTypeToggleButton,
} from './ui'

const AddNewCategoryOptionValue = '__add-new-category__'

export const TransactionCreateForm = () => {
  const categoriesQuery = TransactionsService.Query.useCategoriesQuery({ take: 100, skip: 0 })
  const createCategory = TransactionsService.Mutation.useCreateCategoryMutation()
  const createTransaction = TransactionsService.Mutation.useCreateTransactionMutation()

  const categories = useMemo(
    () => categoriesQuery.data?.pages.flatMap((page) => page.items) ?? [],
    [categoriesQuery.data],
  )

  const [transactionType, setTransactionType] = useState<TransactionsLib.Enums.TransactionTypeEnum>(
    TransactionsLib.Enums.TransactionTypeEnum.INCOME,
  )

  const [isCategoryModalOpened, setIsCategoryModalOpened] = useState(false)
  const [isCategorySettingsModalOpened, setIsCategorySettingsModalOpened] = useState(false)

  const categoriesByTransactionType = useMemo(
    () => categories.filter((item) => item.transactionType === transactionType),
    [categories, transactionType],
  )

  const categoryForm = useCreateCategoryForm({
    transactionType,
    onCreateCategory: (p) => createCategory.mutateAsync(p),
    onSuccess: (category) => {
      transactionForm.form.setValue('categoryId', category.id)
      setIsCategoryModalOpened(false)
    },
  })

  const transactionForm = useCreateTransactionForm({
    transactionType,
    onCreateTransaction: (p) => createTransaction.mutateAsync(p),
  })

  return (
    <SharedUi.ContentBlock className="border-border h-full w-full flex-1 border">
      <h2 className="mb-4">Новая транзакция</h2>

      <form className="flex flex-col gap-3" onSubmit={() => void transactionForm.submit()}>
        <div className="border-border grid grid-cols-2 gap-2 rounded-xl border p-1">
          {SharedLib.Consts.TransactionTypeToggleOptions.map((item) => (
            <TransactionTypeToggleButton
              key={item.value}
              item={item}
              transactionType={transactionType}
              setTransactionType={setTransactionType}
              transactionForm={transactionForm}
            />
          ))}
        </div>

        <SharedUi.Input
          label="Сумма"
          type="number"
          placeholder="Введите сумму"
          {...transactionForm.form.register('amount', {
            valueAsNumber: true,
          })}
        />

        <SharedUi.Input
          label="Описание"
          placeholder="Введите описание"
          {...transactionForm.form.register('description')}
        />

        <SharedUi.Input label="Дата" type="date" {...transactionForm.form.register('createdAt')} />

        <div>
          <label className="text-sm font-semibold">Категория</label>
          <TransactionCategorySelect
            transactionForm={transactionForm}
            categoriesByTransactionType={categoriesByTransactionType}
            setIsCategoryModalOpened={setIsCategoryModalOpened}
            AddNewCategoryOptionValue={AddNewCategoryOptionValue}
          />
        </div>

        <SharedUi.Button
          type="button"
          variant="color:secondary size:md"
          onClick={() => {
            setIsCategorySettingsModalOpened(true)
          }}
        >
          Настройки категорий
        </SharedUi.Button>

        <SharedUi.Button type="submit" variant="color:primary size:md" disabled={createTransaction.isPending}>
          {createTransaction.isPending ? 'Сохранение...' : 'Добавить транзакцию'}
        </SharedUi.Button>
      </form>
      <CategoryCreateModal
        isCategoryModalOpened={isCategoryModalOpened}
        setIsCategoryModalOpened={setIsCategoryModalOpened}
        categoryForm={categoryForm}
        isCreateCategoryPending={createCategory.isPending}
      />

      <CategorySettingsModal
        opened={isCategorySettingsModalOpened}
        onClose={() => {
          setIsCategorySettingsModalOpened(false)
        }}
      />
    </SharedUi.ContentBlock>
  )
}
