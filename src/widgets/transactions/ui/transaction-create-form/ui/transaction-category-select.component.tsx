import { SharedUi } from '@shared'
import type { CategoryResponse } from '@shared/types/http'
import type { useCreateTransactionForm } from '@widgets/transactions/model/create-transaction-model/use-create-transaction-form'
import { Controller, type ControllerRenderProps } from 'react-hook-form'

interface Props {
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
  const changeValue = (
    value: string | null,
    field: ControllerRenderProps<
      {
        amount: number
        description: string
        createdAt: string
        categoryId: number
      },
      'categoryId'
    >,
  ) => {
    if (!value) {
      field.onChange(0)
      return
    }

    if (value === AddNewCategoryOptionValue) {
      setIsCategoryModalOpened(true)
      return
    }

    field.onChange(Number(value))
  }

  return (
    <Controller
      control={transactionForm.form.control}
      name="categoryId"
      render={({ field }) => (
        <SharedUi.Select
					searchable
					clearable
          value={field.value ? String(field.value) : null}
          onChange={(value) => { changeValue(value, field); }}
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
