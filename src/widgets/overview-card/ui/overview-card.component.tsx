import { SharedUi, type SharedTypes } from '@shared'
import { formatMoney } from '@shared/lib/utils'
import { IncomeExpenseDynamicsChartService } from '@widgets/income-expense-dynamics-chart'
import clsx from 'clsx'
import { OverviewCardService } from '..'

type Props = SharedTypes.Ui.PropsWithClassName<{
  from: string
  to: string
}>

export function OverviewCard(props: Props) {
  const { className, from, to, ...restProps } = props

  const { data } = OverviewCardService.Queries.useOverviewSummaryQuery({
    from,
    to,
  })

  const { data: dynamicsData } = IncomeExpenseDynamicsChartService.Queries.useExpenseIncomeDynamicsQuery({
    from,
    to,
    granularity: 'month',
  })

  const NormalizedDynamicsIncomeData =
    dynamicsData?.map((item) => ({
      date: new Date(item.bucket).toISOString(),
      value: item.income || 0,
    })) ?? []

  const NormalizedDynamicsExpenseData =
    dynamicsData?.map((item) => ({
      date: new Date(item.bucket).toISOString(),
      value: item.expense || 0,
    })) ?? []

  const analyticsCardData = [
    {
      title: 'Доходы',
      value: data?.income.current ? parseFloat(data.income.current) : 0,
      changePercent: data?.income.changePercent ?? 0,
      chart: NormalizedDynamicsIncomeData,
    },
    {
      title: 'Расходы',
      value: data?.expense.current ? parseFloat(data.expense.current) : 0,
      changePercent: data?.expense.changePercent ?? 0,
      chart: NormalizedDynamicsExpenseData,
    },
    {
      title: 'Сбережения',
      value: data?.savings.current ? parseFloat(data.savings.current) : 0,
      changePercent: data?.savings.changePercent ?? 0,
    },
    {
      title: 'Баланс',
      value: data?.balance.current ? parseFloat(data.balance.current) : 0,
      changePercent: data?.balance.changePercent ?? 0,
    },
  ]

  return (
    <div className={clsx('flex w-full flex-col gap-6 pb-4', className)} {...restProps}>
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
                data={item.chart ?? []}
                color={index === 0 ? '#22c55e' : index === 1 ? '#ef4444' : '#41b3ab'}
              />
            </div>
          </SharedUi.ContentBlock>
        ))}
      </div>
    </div>
  )
}
