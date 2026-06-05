import { useQuery } from '@tanstack/react-query'
import { UserLib } from '@units/user'
import type { TransactionsParams } from '@units/user/api'
import { getTransactions } from '@units/user/api/get-transactions.api'

export const useTransactions = (params: TransactionsParams) =>
  useQuery({
    queryKey: [UserLib.Enums.QueryKeys.GENERAL_ANALYTICS, params],
    queryFn: () => getTransactions(params),
  })
