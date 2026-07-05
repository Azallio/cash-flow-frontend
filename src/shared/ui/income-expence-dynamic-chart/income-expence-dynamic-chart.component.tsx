import { SharedLib, type SharedTypes, SharedUi } from '@shared'
import type { UserApiService } from '@units/user'
import clsx from 'clsx'

type Props = SharedTypes.Ui.PropsWithClassName<{
  analyticsData: ReturnType<typeof UserApiService.queries.useGeneralAnalytics>['data']
  sortChartPeriod: 'day' | 'month' | 'year'
  setSortChartPeriod: React.Dispatch<React.SetStateAction<'day' | 'month' | 'year'>>
}>

export const IncomeExpenceDynamicChart = (props: Props) => {
  const { className, analyticsData, sortChartPeriod, setSortChartPeriod, ...restProps } = props

  const transactions = analyticsData?.transactions || []

  const groupedByDate = SharedLib.Utils.groupTransactionsByDate(transactions)

  const sparklineData = Array.from(groupedByDate.entries())
    .map(([date, value]) => ({ date, value }))
    .sort(SharedLib.Utils.sortByField('date'))

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
      <SharedUi.Sparkline<SharedTypes.Ui.SparklineDataPoint, 'multi'>
        className="h-80! w-full"
        data={sparklineData}
        dataTypeNames={['income', 'expense']}
        color={['#4caf50', '#f44336']}
      />
    </SharedUi.ContentBlock>
  )
}
