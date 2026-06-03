import { api } from '@shared/api/client'
import type { transactionType } from '@shared/types/api/transaction.type'

export type YearlyAnalyticsResponse = {
  month: number
  totalIncome: number
  totalExpense: number
  netBalance: number
  transactions: [
    {
      id: number
      transactionType: transactionType
      amount: number
      description: string
      categoryId: number
      userId: number
      createdAt: string
      updatedAt: string
    },
  ]
  year: number
}

export type GetYearlyAnalyticsParams = {
  year: string // ISO date-time
}

type YearlyAnalyticsApiResponse = {
  status: number
  data: YearlyAnalyticsResponse
  error: string | null
}

export async function getYearlyAnalytics(params?: GetYearlyAnalyticsParams) {
  const { data } = await api.get<YearlyAnalyticsApiResponse>('/analytics/yearly', {
    params,
  })

  return data.data
}
