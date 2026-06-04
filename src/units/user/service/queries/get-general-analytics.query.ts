import { useQuery } from '@tanstack/react-query'
import { UserLib } from '@units/user'
import type { GeneralAnalyticsParams } from '@units/user/api'
import { getGeneralAnalytics } from '@units/user/api/get-general-user-analytics.api'

export const useGeneralAnalytics = (params: GeneralAnalyticsParams) =>
  useQuery({
    queryKey: [UserLib.Enums.QueryKeys.GENERAL_ANALYTICS, params],
    queryFn: () => getGeneralAnalytics(params),
  })
