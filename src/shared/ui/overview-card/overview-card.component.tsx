import { SharedLib, type SharedTypes, SharedUi } from '@shared'
import { TransactionTypeEnum } from '@shared/lib/enums'
import { buildCumulativeChart } from '@shared/lib/utils'
import { UserApiService } from '@units/user'
import clsx from 'clsx'

type Props = SharedTypes.Ui.PropsWithClassName<{
  analyticsData?: ReturnType<typeof UserApiService.queries.useGeneralAnalytics>['data']
}>

const formatMoney = (value: number) => `${value.toLocaleString('ru-RU')} ₽`

export const OverviewCard = (props: Props) => {
  const { className, analyticsData, ...restProps } = props

  const analytics = analyticsData
  const transactions = analyticsData?.transactions || []

  transactions.sort(SharedLib.Utils.sortByField('createdAt'))

  const analyticsCardData = [
    {
      title: 'Доходы',
      value: analytics?.totalIncome,
      changePercent: analytics?.totalIncomePercent || 0,
      chart: buildCumulativeChart(transactions, TransactionTypeEnum.INCOME),
    },
    {
      title: 'Расходы',
      value: analytics?.totalExpense,
      changePercent: analytics?.totalExpensePercent || 0,
      chart: buildCumulativeChart(transactions, TransactionTypeEnum.EXPENSE),
    },
    {
      title: 'Баланс',
      value: analytics?.netBalance,
      changePercent: analytics?.netBalancePercent || 0,
      chart: buildCumulativeChart(transactions),
    },
  ]

  return (
    <div className={clsx('flex w-full flex-col gap-6 pb-4', className)} {...restProps}>
      <div>
        <h1 className="text-3xl">Обзор</h1>
        <span className="text-md text-gray-400">Аналитика ваших финансов в сравнении с прошлым периодом</span>
      </div>
      <div className="flex w-full justify-between gap-4">
        {analyticsCardData.map((item, index) => (
          <SharedUi.ContentBlock key={item.title} className="w-1/3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <span
                  className={clsx(
                    'text-sm font-medium',
                    item.changePercent > 0
                      ? 'text-green-500'
                      : item.changePercent < 0
                        ? 'text-red-500'
                        : 'text-gray-400',
                    item.title === 'Расходы' && item.changePercent > 0 ? 'text-red-500!' : 'text-green-500',
                  )}
                >
                  {item.changePercent === 0
                    ? '0%'
                    : `${item.changePercent > 0 ? '+' : ''}${item.changePercent}%`}
                </span>
              </div>

              <p className={'text-2xl'}>{item.value !== undefined ? formatMoney(item.value) : '-'}</p>

              <SharedUi.Sparkline<number, 'single'>
                dataTypeNames={['value']}
                data={item.chart}
                color={index === 0 ? '#22c55e' : index === 1 ? '#ef4444' : '#41b3ab'}
              />
            </div>
          </SharedUi.ContentBlock>
        ))}
      </div>
    </div>
  )
}
