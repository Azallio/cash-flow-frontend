import { useQuery } from '@tanstack/react-query'
import { OverviewCardApi } from '@widgets/overview-card'

export const useOverviewSummaryQuery = (payload: { from: string; to: string }) =>
  useQuery({
    queryKey: ['overview-summary', payload],
    queryFn: () => OverviewCardApi.Methods.getOverviewSummary(payload),
  })
