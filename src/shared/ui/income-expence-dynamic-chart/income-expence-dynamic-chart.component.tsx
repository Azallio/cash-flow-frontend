import { type SharedTypes, SharedUi } from '@shared'
import { TransactionTypeEnum } from '@shared/lib/enums'
import type { UserApiService } from '@units/user'
import clsx from 'clsx'

type Props = SharedTypes.Ui.PropsWithClassName<{
  analyticsData: ReturnType<typeof UserApiService.queries.useGeneralAnalytics>['data']
  sortChartPeriod: 'day' | 'month' | 'year'
  setSortChartPeriod: React.Dispatch<React.SetStateAction<'day' | 'month' | 'year'>>
}>

export const IncomeExpenceDynamicChart = (props: Props) => {
  const { className, analyticsData, sortChartPeriod, setSortChartPeriod, ...restProps } = props

  const analyticsForDoubleSparkLine =
    analyticsData?.transactions.map((t) => ({
      income: t.transactionType === TransactionTypeEnum.INCOME ? t.amount : 0,
      expense: t.transactionType === TransactionTypeEnum.EXPENSE ? t.amount : 0,
      date: new Date(t.createdAt).toLocaleDateString('ru-RU'),
    })) || []

  const sortedAnalyticsForDoubleSparkLine = analyticsForDoubleSparkLine.sort((a, b) => {
    const dateA = new Date(a.date.split('.').reverse().join('-')).getTime()
    const dateB = new Date(b.date.split('.').reverse().join('-')).getTime()
    return dateA - dateB
  })

  const sortOptions = [
    { value: 'day', label: 'День' },
    { value: 'month', label: 'Месяц' },
    { value: 'year', label: 'Год' },
  ]

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
          onChange={(value) => setSortChartPeriod(value as 'day' | 'month' | 'year')}
          classNames={{
            root: 'w-30!',
            input: 'border-none outline-none!',
            dropdown: 'border-none outline-none!',
          }}
        />
      </div>
      <SharedUi.DoubleSparkLine className="h-80! w-full" data={sortedAnalyticsForDoubleSparkLine} />
    </SharedUi.ContentBlock>
  )
}
