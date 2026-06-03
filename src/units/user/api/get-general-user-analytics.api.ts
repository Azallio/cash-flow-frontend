import { api } from '@shared/api/client'

export type GeneralAnalyticsResponse = {
  totalIncome: number
  totalExpense: number
  netBalance: number
}

export type GetGeneralAnalyticsParams = {
  startDate: string // ISO date-time
  endDate: string // ISO date-time
}

type GeneralAnalyticsApiResponse = {
  status: number
  data: GeneralAnalyticsResponse
  error: string | null
}

export async function getGeneralAnalytics(params?: GetGeneralAnalyticsParams) {
  const { data } = await api.get<GeneralAnalyticsApiResponse>('/analytics/general', {
    params,
  })

  return data.data
}
