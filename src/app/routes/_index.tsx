import { SharedUi } from '@shared'
import { UserApiService } from '@units/user'
import { Layout } from '@widgets/layout/layout.component'
import clsx from 'clsx'

const formatMoney = (value: number) => `${value.toLocaleString('ru-RU')} ₽`

export default function IndexRoute() {
  const today = new Date()

  const startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString()
  const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999).toISOString()

	const { data: analyticsData } = UserApiService.queries.useGeneralAnalytics({ startDate, endDate })

  return (
    <Layout>
      <div className="flex w-full flex-col gap-6 pt-4">
        <div>
          <h1 className="text-3xl">Обзор</h1>
          <span className="text-md text-gray-400">Аналитика ваших финансов</span>
        </div>
        <div className="flex w-full justify-between gap-4 pr-4">
          {analyticsData?.map((item) => (
            <SharedUi.ContentBlock key={item.title} className="w-1/3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <span
                    className={clsx(
                      'text-sm font-medium',
                      change > 0 ? 'text-green-500' : change < 0 ? 'text-red-500' : 'text-gray-400',
                    )}
                  >
                    {change === 0 ? '0%' : `${change > 0 ? '+' : ''}${change}%`}
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
