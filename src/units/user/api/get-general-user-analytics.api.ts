import { SharedApi, type SharedTypes } from '@shared'
import type { TransactionsResponse } from '@shared/types/http'

export type Params = {
  period?: 'day' | 'month' | 'year'
}

type GeneralAnalyticsResponse = {
  period: string
  totalIncome: number
  totalExpense: number
  netBalance: number
  totalIncomePercent: number
  totalExpensePercent: number
  netBalancePercent: number
  profitPercent: number
  transactions: TransactionsResponse[]
}

export async function getGeneralAnalytics(params: Params) {
  const res = await SharedApi.baseClient.get<SharedTypes.Http.BaseApiResponse<GeneralAnalyticsResponse>>(
    '/analytics',
    {
      params: {
        period: params.period,
      },
    },
  )
  return res.data.data
}
