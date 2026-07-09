import { zodResolver } from '@hookform/resolvers/zod'
import type { TransactionTypeEnum } from '@shared/lib/enums'
import type { CreateTransactionPayload } from '@widgets/transactions/api/method'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { createTransactionSchema, type CreateTransactionFormValues } from './create-transaction.schema'

type Params = {
  transactionType: TransactionTypeEnum

  onCreateTransaction: (payload: CreateTransactionPayload) => Promise<unknown>
}

export const useCreateTransactionForm = ({ transactionType, onCreateTransaction }: Params) => {
  const form = useForm<CreateTransactionFormValues>({
    resolver: zodResolver(createTransactionSchema),

    defaultValues: {
      description: '',
      categoryId: 0,
      createdAt: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16),
    },
  })

  const onSubmit: SubmitHandler<CreateTransactionFormValues> = async (values) => {
    await onCreateTransaction({
      ...values,
      description: values.description.trim() || 'Без описания',
      createdAt: new Date(
        new Date(values.createdAt).getTime() - new Date(values.createdAt).getTimezoneOffset() * 60000,
      ).toISOString(),
      transactionType,
    })
  }

  const submit = form.handleSubmit(onSubmit)

  return {
    form,
    submit,
  }
}
