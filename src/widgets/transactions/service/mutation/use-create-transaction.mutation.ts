import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateTransactionPayload } from '@widgets/transactions/api/method'
import { postTransaction } from '@widgets/transactions/api/method'

export const useCreateTransactionMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['create-transaction'],
    mutationFn: (payload: CreateTransactionPayload) => postTransaction(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['transactions'] }),
        queryClient.invalidateQueries({ queryKey: ['general-analytics'] }),
      ])
    },
  })
}
