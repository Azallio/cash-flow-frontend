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
      <div className="flex h-max gap-4">
        <SharedUi.IncomeExpenceDynamicChart
          analyticsData={analyticsData}
          sortChartPeriod={sortChartPeriod}
          setSortChartPeriod={setSortChartPeriod}
        />
        <div className="flex w-1/3 flex-col gap-4">
          <SharedUi.MonthlyBudget budget={12000} expenses={analyticsData?.totalExpense ?? 0} />
          <SharedUi.TopExpenseCategories />
        </div>
      </div>
    </Layout>
  )
}
