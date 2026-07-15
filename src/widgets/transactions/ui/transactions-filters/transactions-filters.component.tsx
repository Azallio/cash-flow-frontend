import type { DatesRangeValue } from '@mantine/dates'
import { SharedLib, SharedService, SharedUi, type SharedTypes } from '@shared'
import { Consts } from '@shared/lib'
import {
  TransactionFilterInputFields,
  type TransactionFilterType,
} from '@shared/lib/consts/transactions-page.const'
import { useTransactionsFilterStore } from '@widgets/transactions/service/store'
import clsx from 'clsx'
import { useState } from 'react'

type Props = SharedTypes.Ui.PropsWithClassName

export const TransactionsFilters = (props: Props) => {
  const { className, ...restProps } = props
  const { typeFilter, search, setTypeFilter, setSearch, reset } = useTransactionsFilterStore()
  const { dateFrom, dateTo, setDate } = SharedService.Store.useDateStore()

  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false)
  const [tempDateRange, setTempDateRange] = useState<DatesRangeValue<string>>([
    dateFrom.toISOString().split('T')[0],
    dateTo.toISOString().split('T')[0],
  ])

  const handleDateChange = (newDateRange: DatesRangeValue<string>) => {
    const [newFrom, newTo] = newDateRange
    if (newFrom && newTo) {
      setDate(new Date(newFrom), new Date(newTo))
    }
    setIsDatePickerModalOpen(false)
  }

  const handleReset = () => {
    reset()
    setDate(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
    )
  }

  return (
    <SharedUi.ContentBlock className={clsx('border-border border', className)} {...restProps}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <SharedUi.Select
          value={typeFilter}
          data={Consts.TransactionFilterTypeOptions.map((item) => ({
            value: item.value,
            label: item.label,
          }))}
          onChange={(value) => {
            if (value) {
              setTypeFilter(value as TransactionFilterType)
            }
          }}
          allowDeselect={false}
        />

        <SharedUi.Input
          key={TransactionFilterInputFields[0].key}
          type={TransactionFilterInputFields[0].type}
          placeholder={TransactionFilterInputFields[0].placeholder}
          value={search}
          onChange={(event) => {
            setSearch(event.target.value)
          }}
        />

        <SharedUi.Button
          variant="color:secondary size:md"
          className="w-full"
          onClick={() => {
            setTempDateRange([dateFrom.toISOString().split('T')[0], dateTo.toISOString().split('T')[0]])
            setIsDatePickerModalOpen(true)
          }}
        >
          {`${SharedLib.Utils.formatDate(dateFrom.toDateString())} - ${SharedLib.Utils.formatDate(dateTo.toDateString())}`}
        </SharedUi.Button>

        <SharedUi.Button variant="color:secondary size:md" onClick={handleReset}>
          Сбросить
        </SharedUi.Button>
      </div>

      <SharedUi.Modal
        title="Выберите период"
        opened={isDatePickerModalOpen}
        onClose={() => {
          setIsDatePickerModalOpen(false)
        }}
      >
        <div className="flex flex-col gap-4">
          <SharedUi.DatePicker<'range'> value={tempDateRange} onChange={setTempDateRange} />
          <SharedUi.Button
            variant="color:primary size:md"
            onClick={() => {
              handleDateChange(tempDateRange)
            }}
          >
            Применить
          </SharedUi.Button>
        </div>
      </SharedUi.Modal>
    </SharedUi.ContentBlock>
  )
}
