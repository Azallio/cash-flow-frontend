import { SharedUi, type SharedTypes } from '@shared'
import { formatMoney } from '@shared/lib/utils'
import { IncomeExpenseDynamicsChartService } from '@widgets/income-expense-dynamics-chart'
import clsx from 'clsx'
import { useMemo } from 'react'

import { OverviewCardService } from '..'
import { ChangePercent } from './overview-card-profit-text.component'

type Props = SharedTypes.Ui.PropsWithClassName<{
  from: string
  to: string
}>

type MetricKey = 'income' | 'expense' | 'savings' | 'balance'

const CARD_CONFIG: {
  key: MetricKey
  title: string
  color: string
  dynamicsKey?: 'income' | 'expense'
  invertedWhenPositive?: boolean
}[] = [
  { key: 'income', title: 'Доходы', color: '#22c55e', dynamicsKey: 'income' },
  { key: 'expense', title: 'Расходы', color: '#ef4444', dynamicsKey: 'expense', invertedWhenPositive: true },
  { key: 'savings', title: 'Сбережения', color: '#41b3ab' },
  { key: 'balance', title: 'Баланс', color: '#41b3ab' },
]

function normalizeDynamics(
  dynamicsData: { bucket: string; income?: number; expense?: number }[] | undefined,
  field: 'income' | 'expense',
) {
  return (
    dynamicsData?.map((item) => ({
      date: new Date(item.bucket).toISOString(),
      value: item[field] ?? 0,
    })) ?? []
  )
}

export function OverviewCard(props: Props) {
  const { className, from, to, ...restProps } = props

  const { data } = OverviewCardService.Queries.useOverviewSummaryQuery({ from, to })

  const { data: dynamicsData } = IncomeExpenseDynamicsChartService.Queries.useExpenseIncomeDynamicsQuery({
    from,
    to,
    granularity: 'month',
  })

  const dynamicsByKey = useMemo(
    () => ({
      income: normalizeDynamics(dynamicsData, 'income'),
      expense: normalizeDynamics(dynamicsData, 'expense'),
    }),
    [dynamicsData],
  )

  const analyticsCardData = useMemo(
    () =>
      CARD_CONFIG.map(({ key, title, color, dynamicsKey, invertedWhenPositive }) => {
        const metric = data?.[key]
        const changePercent = metric?.changePercent ?? 0

        return {
          title,
          color,
          value: metric?.current ? parseFloat(metric.current) : 0,
          changePercent,
          inverted: invertedWhenPositive ? changePercent > 0 : false,
          chart: dynamicsKey ? dynamicsByKey[dynamicsKey] : undefined,
        }
      }),
    [data, dynamicsByKey],
  )

  return (
    <div className={clsx('flex w-full flex-col gap-6 pb-4', className)} {...restProps}>
      <div className="flex w-full justify-between gap-4">
        {analyticsCardData.map((item) => (
          <SharedUi.ContentBlock key={item.title} className="w-1/3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4">
                <h2>{item.title}</h2>
                <ChangePercent value={item.changePercent} inverted={item.inverted} />
              </div>

              <p className="text-2xl">{item.value ? formatMoney(item.value) : '-'}</p>

              <SharedUi.Sparkline<number, 'single'>
                accentedValues={[{ name: 'value', color: item.color }]}
                data={item.chart ?? []}
                color={item.color}
              />
            </div>
          </SharedUi.ContentBlock>
        ))}
      </div>
    </div>
  )
}
