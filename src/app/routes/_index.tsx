import { SharedUi } from '@shared'
import {
  getGeneralAnalytics,
  type GeneralAnalyticsResponse,
} from '@units/user/api/get-general-user-analytics.api'
import { Layout } from '@widgets/layout/layout.component'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

type FinanceOverviewItem = {
  title: string
  value: string
  change: number
  chart: number[]
}

const formatMoney = (value: number) => `${value.toLocaleString('ru-RU')} ₽`

const getChangeClass = (change: number) =>
  change > 0 ? 'text-green-500' : change < 0 ? 'text-red-500' : 'text-gray-400'

const getChangeLabel = (change: number) => (change === 0 ? '0%' : `${change > 0 ? '+' : ''}${change}%`)

const getFinanceOverview = (analytics: GeneralAnalyticsResponse | null): FinanceOverviewItem[] => [
  {
    title: 'Доходы',
    value: analytics ? formatMoney(analytics.totalIncome) : '—',
    change: 0,
    chart: [100, 120, 150, 130, 170, 160, 180],
  },
  {
    title: 'Расходы',
    value: analytics ? formatMoney(analytics.totalExpense) : '—',
    change: 0,
    chart: [180, 170, 160, 150, 140, 130, 120],
  },
  {
    title: 'Сбережения',
    value: analytics ? formatMoney(analytics.netBalance) : '—',
    change: 0,
    chart: [50, 60, 55, 70, 80, 75, 95],
  },
]

export default function IndexRoute() {
  const [analytics, setAnalytics] = useState<GeneralAnalyticsResponse | null>(null)

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const today = new Date()
        const startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString()
        const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999).toISOString()

        const data = await getGeneralAnalytics({ startDate, endDate })
        setAnalytics(data)
      } catch (error) {
        console.error('Failed to load analytics', error)
      }
    }

    loadAnalytics()
  }, [])

  return (
    <Layout>
      <div className="flex w-full flex-col gap-6 pt-4">
        <div>
          <h1 className="text-3xl">Обзор</h1>
          <span className="text-md text-gray-400">Аналитика ваших финансов</span>
        </div>
        <div className="flex w-full justify-between gap-4 pr-4">
          {getFinanceOverview(analytics).map((item) => (
            <SharedUi.ContentBlock key={item.title} className="w-1/3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <span className={clsx('text-sm font-medium', getChangeClass(item.change))}>
                    {getChangeLabel(item.change)}
                  </span>
                </div>

                <p className="text-2xl">{item.value}</p>

                <SharedUi.Sparkline data={item.chart} color={item.change >= 0 ? '#22c55e' : '#ef4444'} />
              </div>
            </SharedUi.ContentBlock>
          ))}
        </div>
      </div>
    </Layout>
  )
}
