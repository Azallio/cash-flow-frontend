import { SharedApi, type SharedTypes } from '@shared'
import type { BudgetTypes } from '@widgets/budget'

export const getMonthlyBudget = async () => {
  const res =
    await SharedApi.baseClient.get<SharedTypes.Http.BaseApiResponse<BudgetTypes.Http.Budget>>(
      '/budget/monthly',
    )
  return res.data.data
}
