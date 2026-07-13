import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { SharedLib, SharedTypes } from '@shared'
import type { TransactionsApi } from '@widgets/transactions'

import { createCategorySchema, type CreateCategoryFormValues } from './create-category.schema'

type Params = {
  transactionType: SharedLib.Enums.TransactionTypeEnum
  onCreateCategory: (
    payload: TransactionsApi.Methods.CreateCategoryPayload,
  ) => Promise<SharedTypes.Http.CategoryResponse>

  onSuccess?: (category: SharedTypes.Http.CategoryResponse) => void
}

export const useCreateCategoryForm = ({ transactionType, onCreateCategory, onSuccess }: Params) => {
  const form = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategorySchema),

    defaultValues: {
      title: '',
      description: '',
    },
  })

  const submit = form.handleSubmit(async (values) => {
    const category = await onCreateCategory({
      ...values,
      transactionType,
    })

    onSuccess?.(category)

    form.reset()
  })

  return {
    form,
    submit,
  }
}
