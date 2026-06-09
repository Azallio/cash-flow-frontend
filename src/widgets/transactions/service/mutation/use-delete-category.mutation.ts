import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCategory } from '@widgets/transactions/api/method'

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['delete-category'],
    mutationFn: (id: number) => deleteCategory({ id }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['categories'] }),
        queryClient.invalidateQueries({ queryKey: ['general-analytics'] }),
      ])
    },
  })
}
