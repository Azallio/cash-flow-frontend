import { SharedApi, type SharedTypes } from '@shared'
import type { BudgetTypes } from '@widgets/budget'

export const getAllBudgets = async (): Promise<BudgetTypes.Http.Budget[]> => {
  const res =
    await SharedApi.baseClient.get<SharedTypes.Http.BaseApiResponse<BudgetTypes.Http.Budget[]>>('/budget')
  return res.data.data
}
