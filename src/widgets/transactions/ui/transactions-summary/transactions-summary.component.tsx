import { SharedLib } from '@shared'
import { Consts } from '@shared/lib'
import { ContentBlock } from '@shared/ui/content-block'
import clsx from 'clsx'

interface Props {
  income: number
  expense: number
  balance: number
}

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
        <ContentBlock key={item.key} className="border-border w-full flex-1 border p-3.75! text-nowrap">
          <p className="text-text-muted text-sm">{item.title}</p>
          <p
            className={clsx('text-2xl font-semibold', {
              'text-success': item.key === 'income',
              'text-primary': item.key === 'expense' || (item.key === 'balance' && balance < 0),
              'text-info': item.key === 'balance' && balance >= 0,
            })}
          >
            {SharedLib.Utils.formatMoney(amountByKey[item.key])}
          </p>
        </ContentBlock>
      ))}
    </div>
  )
}
