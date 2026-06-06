import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { TransactionTypeEnum } from '@shared/lib/enums'
import type { CategoryResponse } from '@shared/types/http'

import type { CreateCategoryPayload } from '@widgets/transactions/api/method'

import { createCategorySchema, type CreateCategoryFormValues } from './create-category.schema'

type Params = {
  transactionType: TransactionTypeEnum
  onCreateCategory: (payload: CreateCategoryPayload) => Promise<CategoryResponse>

  onSuccess?: (category: CategoryResponse) => void
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
