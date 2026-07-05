import { useQuery } from '@tanstack/react-query'
import { BudgetApi, BudgetLib } from '@widgets/budget'

export const useMonthlyBudget = () =>
  useQuery({
    queryKey: [BudgetLib.Enums.Queries.GET_MONTHLY_BUDGET],
    queryFn: BudgetApi.methods.getMonthlyBudget,
  })
