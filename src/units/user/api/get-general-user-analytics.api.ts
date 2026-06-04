import { SharedApi, type SharedTypes } from '@shared'

export type Params = {
  startDate: string
  endDate: string
}

type GeneralAnalyticsResponse = {
  totalIncome: number
  totalExpense: number
  netBalance: number
}

export async function getGeneralAnalytics(params: Params) {
  return await SharedApi.baseClient.get<SharedTypes.Http.BaseApiResponse<GeneralAnalyticsResponse>>(
    '/analytics/general',
    {
      params: {
        startDate: params.startDate,
        endDate: params.endDate,
      },
    },
  )
}
