import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTransaction } from '@widgets/transactions/api/method'

export const useDeleteTransactionMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['delete-transaction'],
    mutationFn: (id: string) => deleteTransaction({ id }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['transactions'] }),
        queryClient.invalidateQueries({ queryKey: ['general-analytics'] }),
      ])
    },
  })
}
