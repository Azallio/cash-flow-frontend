import { SharedUi, type SharedTypes } from '@shared'
import clsx from 'clsx'
import { useState } from 'react'
import { IncomeExpenseDynamicsChartService } from '..'

type Props = SharedTypes.Ui.PropsWithClassName<{
  from: string
  to: string
}>

export function IncomeExpenseDynamicsSparkline(props: Props) {
  const { className, from, to, ...restProps } = props
  const sortOptions = [
    { value: 'day', label: 'День' },
    { value: 'week', label: 'Неделя' },
    { value: 'month', label: 'Месяц' },
  ]

  const [sortChartPeriod, setSortChartPeriod] = useState<'day' | 'week' | 'month'>('day')

  const { data } = IncomeExpenseDynamicsChartService.Queries.useExpenseIncomeDynamicsQuery({
    from: new Date(from).toISOString(),
    to: new Date(to).toISOString(),
    granularity: sortChartPeriod,
  })

  const SparkLineNormalizedData =
    data?.map((item) => ({
      date: new Date(item.bucket).toISOString(),
      value: {
        income: item.income || 0,
        expense: item.expense || 0,
      },
    })) ?? []

  return (
    <SharedUi.ContentBlock
      className={clsx('relative flex w-2/3 flex-col justify-between gap-4', className)}
      {...restProps}
    >
      <div className="flex w-full items-center justify-between">
        <h2 className="text-2xl">Динамика доходов и расходов</h2>
        <SharedUi.Select
          data={sortOptions}
          value={sortChartPeriod}
          onChange={(value) => setSortChartPeriod(value as 'day' | 'week' | 'month')}
          classNames={{
            root: 'w-30!',
            input: 'border-none outline-none!',
            dropdown: 'border-none outline-none!',
          }}
        />
      </div>
      <SharedUi.Sparkline<SharedTypes.Ui.SparklineDataPoint, 'multi'>
        className="h-80! w-full"
        data={SparkLineNormalizedData}
        dataTypeNames={['income', 'expense']}
        color={['#4caf50', '#f44336']}
      />
    </SharedUi.ContentBlock>
  )
}
