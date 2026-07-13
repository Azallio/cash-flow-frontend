import type { DatesRangeValue } from '@mantine/dates'
import { SharedLib, SharedService, SharedUi } from '@shared'
import { Consts } from '@shared/lib'
import {
  TransactionFilterInputFields,
  type TransactionFilterType,
} from '@shared/lib/consts/transactions-page.const'
import { useState } from 'react'

type FilterValues = {
  search: string
  startDate: string
  endDate: string
}

type Props = {
  typeFilter: TransactionFilterType
  filterValues: FilterValues
  onTypeFilterChange: (value: TransactionFilterType) => void
  onFilterChange: (key: keyof FilterValues, value: string) => void
  onDateRangeChange: (start: string, end: string) => void
  onReset: () => void
}

export const TransactionsFilters = (props: Props) => {
  const { typeFilter, filterValues, onTypeFilterChange, onFilterChange, onDateRangeChange, onReset } = props

  const { dateFrom, dateTo } = SharedService.Store.useDateStore()

  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false)
  const [tempDateRange, setTempDateRange] = useState<DatesRangeValue<string> | string[] | string | null>([
    dateFrom.toISOString().split('T')[0],
    dateTo.toISOString().split('T')[0],
  ])

  return (
    <SharedUi.ContentBlock className="border-border border">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <SharedUi.Select
          value={typeFilter}
          data={Consts.TransactionFilterTypeOptions.map((item) => ({
            value: item.value,
            label: item.label,
          }))}
          onChange={(value) => {
            if (value) {
              onTypeFilterChange(value as TransactionFilterType)
            }
          }}
          allowDeselect={false}
        />

        <SharedUi.Input
          key={TransactionFilterInputFields[0].key}
          type={TransactionFilterInputFields[0].type}
          placeholder={TransactionFilterInputFields[0].placeholder}
          value={filterValues[TransactionFilterInputFields[0].key]}
          onChange={(event) => onFilterChange(TransactionFilterInputFields[0].key, event.target.value)}
        />

        <SharedUi.Button
          variant="color:secondary size:md"
          className="w-full"
          onClick={() => {
            setTempDateRange([dateFrom.toISOString().split('T')[0], dateTo.toISOString().split('T')[0]])
            setIsDatePickerModalOpen(true)
          }}
        >
          {dateFrom !== null && dateTo !== null
            ? `${SharedLib.Utils.formatDate(dateFrom.toDateString())} - ${SharedLib.Utils.formatDate(dateTo.toDateString())}`
            : 'Выбрать период'}
        </SharedUi.Button>

        <SharedUi.Button variant="color:secondary size:md" onClick={onReset}>
          Сбросить
        </SharedUi.Button>
      </div>

      <SharedUi.Modal
        title="Выберите период"
        opened={isDatePickerModalOpen}
        onClose={() => setIsDatePickerModalOpen(false)}
      >
        <div className="flex flex-col gap-4">
          <SharedUi.DatePicker type="range" size="xl" value={tempDateRange} onChange={setTempDateRange} />
          <SharedUi.Button
            variant="color:primary size:md"
            onClick={() => {
              const start = tempDateRange![0] !== null ? tempDateRange![0] : ''
              const end = tempDateRange![1] !== null ? tempDateRange![1] : ''
              onDateRangeChange(start, end)
              setIsDatePickerModalOpen(false)
            }}
          >
            Применить
          </SharedUi.Button>
        </div>
      </SharedUi.Modal>
    </SharedUi.ContentBlock>
  )
}
