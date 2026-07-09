import { SharedApi, type SharedTypes } from '@shared'
import type { IncomeExpenseDynamicsChartTypes } from '@widgets/income-expense-dynamics-chart'

export type Payload = {
  from: string
  to: string
  granularity: 'day' | 'week' | 'month'
}

export const getIncomeExpenseDynamics = async (p: Payload) => {
  const res = await SharedApi.baseClient.get<
    SharedTypes.Http.BaseApiResponse<IncomeExpenseDynamicsChartTypes.Http.IncomeExpenseDynamicsResponse>
  >('/analytics/dynamics', { params: p })

  return res.data.data
}
