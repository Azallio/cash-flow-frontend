import { useQuery } from '@tanstack/react-query'
import {
  IncomeExpenseDynamicsChartApi,
  IncomeExpenseDynamicsChartLib,
} from '@widgets/income-expense-dynamics-chart'

export const useExpenseIncomeDynamicsQuery = (
  p: IncomeExpenseDynamicsChartApi.Methods.GetIncomeExpenseDynamicsPayload,
) =>
  useQuery({
    queryKey: [
      IncomeExpenseDynamicsChartLib.Enums.Queries.GET_INCOME_EXPENSE_DYNAMICS,
      p.from,
      p.to,
      p.granularity,
    ],
    queryFn: () => IncomeExpenseDynamicsChartApi.Methods.getIncomeExpenseDynamics(p),
  })
