import { SharedUi } from '@shared'
import type { CategoryResponse } from '@shared/types/http'
import type { useCreateTransactionForm } from '@widgets/transactions/model/create-transaction-model/use-create-transaction-form'
import { Controller } from 'react-hook-form'

type Props = {
  transactionForm: ReturnType<typeof useCreateTransactionForm>
  categoriesByTransactionType: CategoryResponse[]
  setIsCategoryModalOpened: (value: boolean) => void
  AddNewCategoryOptionValue: string
}

export function TransactionCategorySelect({
  transactionForm,
  categoriesByTransactionType,
  setIsCategoryModalOpened,
  AddNewCategoryOptionValue,
}: Props) {
  return (
    <Controller
      control={transactionForm.form.control}
      name="categoryId"
      render={({ field }) => (
        <SharedUi.Select
          value={field.value ? String(field.value) : null}
          onChange={(value) => {
            if (!value) {
              field.onChange(0)
              return
            }

            if (value === AddNewCategoryOptionValue) {
              setIsCategoryModalOpened(true)
              return
            }

            field.onChange(Number(value))
          }}
          placeholder="Выберите категорию"
          data={[
            ...categoriesByTransactionType.map((item) => ({
              value: String(item.id),
              label: item.title,
            })),
            {
              value: AddNewCategoryOptionValue,
              label: 'Добавить новую',
            },
          ]}
        />
      )}
    />
  )
}
