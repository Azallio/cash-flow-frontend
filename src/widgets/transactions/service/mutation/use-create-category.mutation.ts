import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateCategoryPayload } from '@widgets/transactions/api/method'
import { postCategory } from '@widgets/transactions/api/method'

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['create-category'],
    mutationFn: (payload: CreateCategoryPayload) => postCategory(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}
