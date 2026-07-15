import { SharedUi, type SharedTypes } from '@shared'
import { TransactionsUi } from '@widgets/transactions'
import clsx from 'clsx'
import { useState } from 'react'

type Props = SharedTypes.Ui.PropsWithClassName<{
  children?: React.ReactNode
}>

export function Header(props: Props) {
  const { className, ...restProps } = props

  const [isOpenTransactionForm, setIsOpenTransactionForm] = useState(false)
  const [isOpenNavBar, setIsOpenNavBar] = useState(false)
  return (
    <header className={clsx('fixed z-10 md:hidden', className)} {...restProps}>
      <SharedUi.ContentBlock className="bg-surface flex w-full items-center justify-between gap-4 px-4 py-4">
        <SharedUi.Icon
          name="favicon"
          className="size-8"
          onClick={() => {
            setIsOpenTransactionForm(true)
          }}
        />
        <SharedUi.Icon name="favicon" className="size-8" />
        <SharedUi.Icon name="favicon" className="size-8" />
      </SharedUi.ContentBlock>

      <SharedUi.Modal
        opened={isOpenTransactionForm}
        onClose={() => {
          setIsOpenTransactionForm(false)
        }}
      >
        <TransactionsUi.TransactionCreateForm />
      </SharedUi.Modal>
    </header>
  )
}
