import { Consts } from '@shared/lib'
import { ContentBlock } from '@shared/ui/content-block'
import clsx from 'clsx'

type Props = {
  income: number
  expense: number
  balance: number
}

const formatMoney = (value: number) => `${value.toLocaleString('ru-RU')} ₽`

export const TransactionsSummary = (props: Props) => {
  const { income, expense, balance } = props

  const amountByKey = {
    income,
    expense,
    balance,
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row xl:flex-row">
      {Consts.TransactionSummaryCards.map((item) => (
        <ContentBlock key={item.key} className="border-border border w-full flex-1 text-nowrap p-3.75!">
          <p className="text-text-muted text-sm">{item.title}</p>
          <p
            className={clsx('text-2xl font-semibold', {
              'text-success': item.key === 'income',
              'text-primary': item.key === 'expense' || (item.key === 'balance' && balance < 0),
              'text-info': item.key === 'balance' && balance >= 0,
            })}
          >
            {formatMoney(amountByKey[item.key])}
          </p>
        </ContentBlock>
      ))}
    </div>
  )
}
