import { SharedUi } from '@shared'
import { UserApiService } from '@units/user'
import { Layout } from '@widgets/layout/layout.component'
import { useState } from 'react'

export default function IndexRoute() {
  const [sortChartPeriod, setSortChartPeriod] = useState<'day' | 'month' | 'year'>('month')
  const { data: analyticsData } = UserApiService.queries.useGeneralAnalytics({ period: sortChartPeriod })

  return (
    <Layout>
      <SharedUi.OverviewCard analyticsData={analyticsData} />
      <SharedUi.IncomeExpenceDynamicChart
        analyticsData={analyticsData}
        sortChartPeriod={sortChartPeriod}
        setSortChartPeriod={setSortChartPeriod}
      />
    </Layout>
  )
}
