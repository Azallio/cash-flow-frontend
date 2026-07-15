import type { DatesRangeValue } from '@mantine/dates'
import { SharedLib, SharedService, SharedUi } from '@shared'
import { BudgetUi } from '@widgets/budget'
import { IncomeExpenseDynamicsChartUi } from '@widgets/income-expense-dynamics-chart'
import { Layout } from '@widgets/layout/layout.component'
import { OverviewCardUi } from '@widgets/overview-card'
import { useState } from 'react'

export default function IndexRoute() {
  const { dateFrom, dateTo, setDate } = SharedService.Store.useDateStore()

  const IsoDateFrom = dateFrom.toISOString()
  const IsoDateTo = dateTo.toISOString()

  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false)

  const [tempDateRange, setTempDateRange] = useState<DatesRangeValue<string>>([IsoDateFrom, IsoDateTo])

  const handleDateChange = (newDateRange: DatesRangeValue<string>) => {
    const [newFrom, newTo] = newDateRange
    if (newFrom && newTo) {
      setDate(new Date(newFrom), new Date(newTo))
    }
    setIsDatePickerModalOpen(false)
  }

  return (
    <Layout>
      <div className="mb-4 flex w-full items-center justify-between">
        <div>
          <h1>Обзор</h1>
          <span className="text-md text-gray-400">
            Аналитика ваших финансов в сравнении с прошлым периодом
          </span>
        </div>

        <SharedUi.Button
          variant="color:secondary size:md"
          onClick={() => {
            setTempDateRange([IsoDateFrom, IsoDateTo])
            setIsDatePickerModalOpen(true)
          }}
        >
          {IsoDateFrom && IsoDateTo
            ? `${SharedLib.Utils.formatDate(IsoDateFrom)} - ${SharedLib.Utils.formatDate(IsoDateTo)}`
            : 'Выбрать период'}
        </SharedUi.Button>
      </div>
      <OverviewCardUi.OverviewCard from={IsoDateFrom} to={IsoDateTo} />
      <div className="flex h-max gap-4">
        <IncomeExpenseDynamicsChartUi.IncomeExpenseDynamicsSparkline from={IsoDateFrom} to={IsoDateTo} />
        <div className="flex w-1/3 flex-col gap-4">
          <BudgetUi.MonthlyBudget />
          <SharedUi.TopExpenseCategories />
        </div>
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
    </Layout>
  )
}
