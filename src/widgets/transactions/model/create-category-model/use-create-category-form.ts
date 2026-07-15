import { zodResolver } from '@hookform/resolvers/zod'
import type { SharedTypes } from '@shared'
import type { TransactionsApi, TransactionsLib } from '@widgets/transactions'
import { useForm } from 'react-hook-form'

import { createCategorySchema, type CreateCategoryFormValues } from './create-category.schema'

interface Params {
  transactionType: TransactionsLib.Enums.TransactionTypeEnum
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
