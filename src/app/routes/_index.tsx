import { SharedUi } from '@shared'
import { UserApiService } from '@units/user'
import { Layout } from '@widgets/layout/layout.component'
import clsx from 'clsx'

const formatMoney = (value: number) => `${value.toLocaleString('ru-RU')} ₽`

export default function IndexRoute() {
  const today = new Date()

  const startDate = new Date(2020, today.getMonth(), 1).toISOString()
  const endDate = new Date(today.getFullYear(), today.getMonth() + 10, 0, 23, 59, 59, 999).toISOString()

  const { data: analyticsData } = UserApiService.queries.useGeneralAnalytics({ startDate, endDate })
  const { data: transactionsData } = UserApiService.queries.useTransactions({
    take: 50,
    skip: 0,
  })

  console.log('analyticsData', analyticsData)
  console.log('transactionsData', transactionsData)

  const analytics = analyticsData?.data.data
  const transactions = transactionsData?.data.data.items || []

  const mapTransactionToPoint = (transaction: (typeof transactions)[number]) => ({
    value: transaction.amount,
    date: new Date(transaction.createdAt).toLocaleDateString('ru-RU'),
  })

  const analyticsCardData = [
    {
      title: 'Доход',
      value: analytics?.totalIncome,
      change: 0,
      chart: transactions.filter((t) => t.transactionType === 'income').map(mapTransactionToPoint),
    },
    {
      title: 'Расход',
      value: analytics?.totalExpense,
      change: -15,
      chart: transactions.filter((t) => t.transactionType === 'expense').map(mapTransactionToPoint),
    },
    {
      title: 'Баланс',
      value: analytics?.netBalance,
      change: -1,
      chart: transactions.map((t) => ({
        value: t.transactionType === 'income' ? t.amount : -t.amount,
        date: new Date(t.createdAt).toLocaleDateString('ru-RU'),
      })),
    },
  ]

  return (
    <Layout>
      <div className="flex w-full flex-col gap-6 pt-4">
        <div>
          <h1 className="text-3xl">Обзор</h1>
          <span className="text-md text-gray-400">Аналитика ваших финансов</span>
        </div>
        <div className="flex w-full justify-between gap-4 pr-4">
          {analyticsCardData.map((item, index) => (
            <SharedUi.ContentBlock key={item.title} className="w-1/3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <span
                    className={clsx(
                      'text-sm font-medium',
                      item.change > 0 ? 'text-green-500' : item.change < 0 ? 'text-red-500' : 'text-gray-400',
                    )}
                  >
                    {item.change === 0 ? '0%' : `${item.change > 0 ? '+' : ''}${item.change}%`}
                  </span>
                </div>

                <p className={'text-2xl'}>{item.value !== undefined ? formatMoney(item.value) : '-'}</p>

                <SharedUi.Sparkline
                  data={item.chart}
                  color={index === 0 ? '#22c55e' : index === 1 ? '#ef4444' : '#41b3ab'}
                />
              </div>
            </SharedUi.ContentBlock>
          ))}
        </div>
      </div>
    </Layout>
  )
}
