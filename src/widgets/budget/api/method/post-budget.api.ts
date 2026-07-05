import { SharedApi } from '@shared'
import { type BudgetTypes } from '@widgets/budget'

export const postBudget = async (budget: BudgetTypes.Http.Budget) => {
  const res = await SharedApi.baseClient.post<BudgetTypes.Http.Budget>('/budget', budget)
  return res.data
}
