import { zodResolver } from '@hookform/resolvers/zod'
import type { TransactionTypeEnum } from '@shared/lib/enums'
import type { CreateTransactionPayload } from '@widgets/transactions/api/method'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { createTransactionSchema, type CreateTransactionFormValues } from './create-transaction.schema'

const toIsoStartOfDay = (date: string) => new Date(`${date}T00:00:00.000Z`).toISOString()

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
      createdAt: new Date().toISOString().slice(0, 10),
    },
  })

  const onSubmit: SubmitHandler<CreateTransactionFormValues> = async (values) => {
    console.log(values)
    await onCreateTransaction({
      ...values,
      description: values.description.trim() || 'Без описания',
      createdAt: toIsoStartOfDay(values.createdAt),
      transactionType,
    })
  }

  const submit = form.handleSubmit(onSubmit)

  return {
    form,
    submit,
  }
}
