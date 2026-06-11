import { type SharedTypes, SharedUi } from '@shared'
import clsx from 'clsx'

type Props = SharedTypes.Ui.PropsWithClassName<{
  budget: number
  expenses: number
  expensesPercent: number
}>

const currentMonth = new Date().toLocaleString('ru-RU', {
  month: 'long',
})

export const MonthlyBudget = (props: Props) => {
  const { className, expenses, budget, ...restProps } = props

  const expensesPercent = Math.round((expenses / budget) * 100)

  const progressBarWidth = `${Math.min(expensesPercent, 100)}%`

  return (
    <SharedUi.ContentBlock className={clsx(className, 'flex h-max w-full flex-col gap-4')} {...restProps}>
      <article className="flex justify-between">
        <h3 className="text-lg">Бюджет на {currentMonth}</h3>
        <SharedUi.Button disabled className="text-primary">Настроить</SharedUi.Button>
      </article>

      <article className="flex flex-col">
        <div className="flex flex-col">
          <span>Общие расходы</span>
          <div className="flex justify-between">
            <span className="text-gray-500">
              {expenses} ₽ из {budget} ₽
            </span>
            <span>{expensesPercent} %</span>
          </div>
          <div className="relative mt-2">
            <div className="z-0 h-2 w-full rounded-full bg-gray-700" />
            <div
              style={{ width: progressBarWidth }}
              className="bg-primary absolute top-0 z-20 h-2 rounded-full"
            />
          </div>
        </div>
      </article>
    </SharedUi.ContentBlock>
  )
}
