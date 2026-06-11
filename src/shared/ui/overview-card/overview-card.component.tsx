import { type SharedTypes, SharedUi } from '@shared'
import { TransactionTypeEnum } from '@shared/lib/enums'
import { UserApiService } from '@units/user'
import clsx from 'clsx'

type Props = SharedTypes.Ui.PropsWithClassName<{
  analyticsData?: ReturnType<typeof UserApiService.queries.useGeneralAnalytics>['data']
}>

const formatMoney = (value: number) => `${value.toLocaleString('ru-RU')} ₽`

export const OverviewCard = (props: Props) => {
  const { className, ...restProps } = props

  const analyticsData = props.analyticsData
  const analytics = analyticsData
  const transactions = analyticsData?.transactions || []

  const mapTransactionToPoint = (transaction: (typeof transactions)[number]) => ({
    value: transaction.amount,
    date: new Date(transaction.createdAt).toLocaleDateString('ru-RU'),
  })

  const analyticsCardData = [
    {
      title: 'Доходы',
      value: analytics?.totalIncome,
      change: analytics?.totalIncomePercent || 0,
      chart: transactions
        .filter((t) => t.transactionType === TransactionTypeEnum.INCOME)
        .map(mapTransactionToPoint),
    },
    {
      title: 'Расходы',
      value: analytics?.totalExpense,
      change: analytics?.totalExpensePercent || 0,
      chart: transactions
        .filter((t) => t.transactionType === TransactionTypeEnum.EXPENSE)
        .map(mapTransactionToPoint),
    },
    {
      title: 'Баланс',
      value: analytics?.netBalance,
      change: analytics?.netBalancePercent || 0,
      chart: transactions.map((t) => ({
        value: t.transactionType === TransactionTypeEnum.INCOME ? t.amount : -t.amount,
        date: new Date(t.createdAt).toLocaleDateString('ru-RU'),
      })),
    },
  ]

  return (
    <div className={clsx('flex w-full flex-col gap-6 pb-4', className)} {...restProps}>
      <div>
        <h1 className="text-3xl">Обзор</h1>
        <span className="text-md text-gray-400">Аналитика ваших финансов</span>
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
                    item.change > 0 ? 'text-green-500' : item.change < 0 ? 'text-red-500' : 'text-gray-400',
                  )}
                >
                  {item.change === 0 ? '0%' : `${item.change > 0 ? '+' : ''}${item.change}%`}
                </span>
              </div>

              <p className={'text-2xl'}>{item.value !== undefined ? formatMoney(item.value) : '-'}</p>

              <SharedUi.SparkLine
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
