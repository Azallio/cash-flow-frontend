import { useQuery } from '@tanstack/react-query'
import { BudgetApi, BudgetLib } from '@widgets/budget'

export const useAllBudgets = () =>
  useQuery({
    queryKey: [BudgetLib.Enums.Queries.GET_ALL_BUDGETS],
    queryFn: BudgetApi.methods.getAllBudgets,
  })
