import { SharedApi, type SharedTypes } from '@shared'
import type { OverviewCardTypes } from '@widgets/overview-card'

export interface Payload {
  from: string
  to: string
}

export const getOverviewSummary = async (payload: Payload) => {
  const res = await SharedApi.baseClient.get<
    SharedTypes.Http.BaseApiResponse<OverviewCardTypes.Http.OverviewSummaryResponse>
  >('/analytics/overview', { params: payload })
  return res.data.data
}
