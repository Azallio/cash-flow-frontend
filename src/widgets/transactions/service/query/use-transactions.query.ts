import { useQuery } from '@tanstack/react-query'
import type { GetTransactionsParams } from '@widgets/transactions/api/method'
import { getTransactions } from '@widgets/transactions/api/method'

export const useTransactionsQuery = (params: GetTransactionsParams) =>
  useQuery({
    queryKey: ['transactions', params],
    queryFn: () => getTransactions(params),
  })
